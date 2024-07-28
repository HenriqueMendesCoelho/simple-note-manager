import { mongoClient } from '../app/mongoClient/MongoClient.js';
import UserController from './adapter/controller/UserController.js';
import UserRepository from './adapter/repository/UserRepository.js';
import CreateUserUseCase from './usecases/CreateUserUseCase.js';
import FindUserUseCase from './usecases/FindUserUseCase.js';

const userRepository = new UserRepository(mongoClient);
const createUserUseCase = new CreateUserUseCase(userRepository);
const findUserUseCase = new FindUserUseCase(userRepository);
const userController = new UserController(createUserUseCase, findUserUseCase);

export { userRepository, createUserUseCase, userController };
