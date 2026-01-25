const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginUserUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    // 1. Kullanıcıyı bul
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // 2. Şifreyi doğrula
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // 3. JWT Token oluştur
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'restart-secret-key',
      { expiresIn: '7d' }
    );

    return { user, token };
  }
}

module.exports = LoginUserUseCase;
