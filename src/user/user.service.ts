import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { DatabaseService } from '../databse/databse.service';

@Injectable()
export class UserService {
    constructor(
        private readonly authService: AuthService,
        private readonly databaseService: DatabaseService
    ) {}

    async register(body,res) {
        const { name, email, password } = body;

        if (!name || !email || !password) {
            throw new BadRequestException("Incomplete Details");
        }

        try {
            const hashedPassword = await this.authService.hashPassword(password);
            const pool = await this.databaseService.getPool();
            
            await pool.query(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
                [name, email, hashedPassword]
            );

            return { message: "User registered successfully" };
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    async login(body,res) {
        const { email, password } = body;

        if (!email || !password) {
            throw new BadRequestException("Incomplete Details");
        }

        try {
            const pool = await this.databaseService.getPool();
            const [users]: any = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

            if (users.length === 0) {
                throw new UnauthorizedException("Invalid user credentials");
            }

            const user = users[0];

            const isPasswordValid = await this.authService.comparePasswords(password, user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedException("Invalid user credentials");
            }

            const token = this.authService.generateToken(user.id, user.email);
            return { token };
        } catch (err) {
            throw new UnauthorizedException(err.message);
        }
    }
}
