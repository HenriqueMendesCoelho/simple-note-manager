import { userRepository } from '../user/index.js';
import AuthenticationController from './adapter/controller/AuthenticationController.js';
import LoginUseCase from './usecases/login/LoginUseCase.js';

let loginUsecase: LoginUseCase;
let authenticationController: AuthenticationController;

function initializeLoginDependencies() {
  loginUsecase = new LoginUseCase(userRepository);
  authenticationController = new AuthenticationController(loginUsecase);
}

export { authenticationController, initializeLoginDependencies };
