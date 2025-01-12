import { mongoClient } from '../app/mongoClient/index.js';
import UserController from './adapter/controller/UserController.js';
import UserRepository from './adapter/repository/UserRepository.js';
import CreateUserUseCase from './usecases/CreateUserUseCase.js';
import FindUserUseCase from './usecases/FindUserUseCase.js';

let userRepository: UserRepository;
let createUserUseCase: CreateUserUseCase;
let findUserUseCase: FindUserUseCase;
let userController: UserController;

function initializeUserDependencies() {
  userRepository = new UserRepository(mongoClient);
  createUserUseCase = new CreateUserUseCase(userRepository);
  findUserUseCase = new FindUserUseCase(userRepository);
  userController = new UserController(createUserUseCase, findUserUseCase);
}

export { userRepository, createUserUseCase, userController, initializeUserDependencies };
