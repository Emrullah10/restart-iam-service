const UserRepositoryImplementation = require('../../infrastructure/persistence/user.repository-implementation');
const RegisterUserUseCase = require('../../application/use-cases/register-user.use-case');
const LoginUserUseCase = require('../../application/use-cases/login-user.use-case');
const GetUserProfileUseCase = require('../../application/use-cases/get-user-profile.use-case');
const UsersController = require('../../interfaces/controllers/users.controller');
const { createAuthRoutes, createUserRoutes } = require('../../../routes/auth.routes');

function bootstrap() {
  // 1. Singletons / Dependencies
  const userRepository = new UserRepositoryImplementation();

  // 2. Use Cases
  const registerUserUseCase = new RegisterUserUseCase({ userRepository });
  const loginUserUseCase = new LoginUserUseCase({ userRepository });
  const getUserProfileUseCase = new GetUserProfileUseCase({ userRepository });

  // 3. Controllers
  const usersController = new UsersController({
    registerUserUseCase,
    loginUserUseCase,
    getUserProfileUseCase
  });

  // 4. Routes
  const authRoutes = createAuthRoutes({ usersController });
  const userRoutes = createUserRoutes({ usersController });

  return {
    authRoutes,
    userRoutes,
  };
}

module.exports = bootstrap;
