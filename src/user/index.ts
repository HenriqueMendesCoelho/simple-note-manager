import { mongoClient } from '../app/mongoClient/MongoClient';
import UserController from './adapter/controller/UserController';
import UserRepository from './adapter/repository/UserRepository';
import CreateUserUseCase from './usecases/create-user/CreateUserUseCase';
import FindUserUseCase from './usecases/find-user/FindUserUseCase';

const userRepository = new UserRepository(mongoClient);
const createUserUseCase = new CreateUserUseCase(userRepository);
const findUserUseCase = new FindUserUseCase(userRepository);
const userController = new UserController(createUserUseCase, findUserUseCase);

export { userController };
