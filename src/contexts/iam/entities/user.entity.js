class UserEntity {
  constructor({ id, email, passwordHash, fullName, role, avatarUrl, createdAt }) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.fullName = fullName;
    this.role = role || 'user';
    this.avatarUrl = avatarUrl;
    this.createdAt = createdAt || new Date();
  }

  // Domain logic examples
  validate() {
    if (!this.email) throw new Error('Email is required');
    if (!this.email.includes('@')) throw new Error('Invalid email format');
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      fullName: this.fullName,
      role: this.role,
      avatarUrl: this.avatarUrl,
      createdAt: this.createdAt
    };
  }
}

module.exports = UserEntity;
