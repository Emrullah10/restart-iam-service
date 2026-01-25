const UserEntity = require('../../contexts/iam/entities/user.entity');
const bcrypt = require('bcrypt'); // Note: packages/modules should ideally handle this but keeping it simple for now

class RegisterUserUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute({ email, password, fullName }) {
    // 1. Business Rule: Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // 2. Hash Password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 3. Create Entity
    const user = new UserEntity({
      email,
      passwordHash,
      fullName
    });

    user.validate();

    // 4. Persistence
    return await this.userRepository.create(user);
  }
}

module.exports = RegisterUserUseCase;
