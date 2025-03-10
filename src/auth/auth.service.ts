import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    generateToken(userId: number, email: string) {
        const payload = { sub: userId, email };
        return this.jwtService.sign(payload);
    }

    verifyToken(token: string) {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}

