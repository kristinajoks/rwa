import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private service: UserService) {}
    @Get()
    getUsers(){
        return this.service.getUsers();
    }

    @Post('create')
    createUser(@Body() createUser: CreateUserDTO){
        return this.service.createUser(createUser);
    }

    @Get('findbyid')
    findUserById(@Query("id") id: number) {
        return this.service.findUserById(id);
    }
}