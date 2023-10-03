import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './user.dto';
import { Role } from '../auth/roles';

@Controller('user')
export class UserController {
    constructor(private service: UserService) {}
    @Get()
    getUsers(){
        try{
            return this.service.getUsers();
        }
        catch(err){
            return err;
        }
    }

    @Post('create')
    createUser(@Body() createUser: CreateUserDTO){
        try{
            return this.service.createUser(createUser);
        }
        catch(err){
            return err;
        }
    }

    @Get('findbyid')
    findUserById(@Query("id") id: number) {
        try{
            return this.service.findUserById(id);
        }
        catch(err){
            return err;
        }
    }

    @Get('findbyusername')
    findUserByUsername(@Query("username") username: string) {
        try{
            return this.service.findUserByUsername(username);
        }
        catch(err){
            return err;
        }
    }

    @Post('delete')
    deleteUser(@Body() id: number){
        try{
            return this.service.deleteUser(id);
        }
        catch(err){
            return err;
        }
    }

    @Put(':id/updateRole')
    updateUserRole(@Param('id') id: number, @Body() role: Role){ //pitanje kako ce da se posalje Role kroz body
        try{
            return this.service.updateUserRole(id, role);
        }
        catch(err){
            return err;
        }
    }
}