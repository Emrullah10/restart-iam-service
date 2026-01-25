class UsersController {
  constructor({ registerUserUseCase, loginUserUseCase, getUserProfileUseCase }) {
    this.registerUserUseCase = registerUserUseCase;
    this.loginUserUseCase = loginUserUseCase;
    this.getUserProfileUseCase = getUserProfileUseCase;
  }

  async register(req, res) {
    try {
      const { email, password, fullName } = req.body;
      const user = await this.registerUserUseCase.execute({ email, password, fullName });

      res.status(201).json({
        message: 'User registered successfully',
        user: user.toJSON()
      });
    } catch (error) {
      console.error('Controller Register Error:', error.message);
      if (error.message === 'Email already registered') {
        return res.status(409).json({ error: error.message });
      }
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await this.loginUserUseCase.execute({ email, password });

      res.status(200).json({
        message: 'Login successful',
        token,
        user: user.toJSON()
      });
    } catch (error) {
      console.error('Controller Login Error:', error.message);
      if (error.message === 'Invalid credentials') {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getProfile(req, res) {
    try {
      const { userId } = req.params;
      const { user, stats } = await this.getUserProfileUseCase.execute({ userId });

      res.status(200).json({
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
        role: user.role,
        createdAt: user.createdAt,
        stats: {
          totalPoints: stats.totalPoints,
          totalEarnings: stats.totalEarnings,
          repairedCount: stats.repairedCount,
          preventedWasteKg: stats.preventedWasteKg,
          co2Saved: stats.co2Saved.toFixed(2)
        }
      });
    } catch (error) {
      console.error('Controller GetProfile Error:', error.message);
      if (error.message === 'User not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = UsersController;
