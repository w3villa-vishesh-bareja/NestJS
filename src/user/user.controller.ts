import { Controller, Post, Body , Response } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/register')
    async register(@Body() body , @Response() res) {
        return this.userService.register(body,res);
    }

    @Post('/login')
    async login(@Body() body , @Response() res) {
        return this.userService.login(body,res);
    }
}
