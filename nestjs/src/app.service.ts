import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './typeorm/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {

  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async getHello() {
    return await this.userRepo.find();
  }


}
