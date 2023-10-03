import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.guard';
import { CreateUserDTO } from 'src/user/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async logIn(@Request() req) {
        return await this.authService.login(req.user);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    async signup(@Body() newUser: CreateUserDTO) {
        return await this.authService.signup(newUser);
    }
}
