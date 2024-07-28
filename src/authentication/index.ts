import { userRepository } from '../user/index.js';
import AuthenticationController from './adapter/controller/AuthenticationController.js';
import LoginUseCase from './usecases/login/LoginUseCase.js';

const loginUseCase = new LoginUseCase(userRepository);
const authenticationController = new AuthenticationController(loginUseCase);

export { authenticationController };
