import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
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

    @Get('findbyusername')
    findUserByUsername(@Query("username") username: string) {
        return this.service.findUserByUsername(username);
    }

    @Post('delete')
    deleteUser(@Body() id: number){
        return this.service.deleteUser(id);
    }

    
}