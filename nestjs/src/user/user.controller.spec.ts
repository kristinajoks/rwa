import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import exp from 'constants';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
      imports: []
    })
    .compile();

    controller = module.get<UserController>(UserController);
  });


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('should create a user', () => {
    expect(controller.createUser({
      name: "test",
      surname: "test",
      username: "test",
      email: "",
      password: "test"})).toEqual({
        id: expect.any(Number),
        name: "test",
        surname: "test",
        username: "test",
        email: "",
        password: expect.any(String),
        closet: null,
        role: "User"
      })
    });

  });