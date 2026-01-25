class GetUserProfileUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute({ userId }) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const stats = await this.userRepository.getUserStats(userId);

    return {
      user,
      stats
    };
  }
}

module.exports = GetUserProfileUseCase;
