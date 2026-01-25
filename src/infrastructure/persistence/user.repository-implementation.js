const IUserRepository = require('../../contexts/iam/repositories/user.repository');
const UserEntity = require('../../contexts/iam/entities/user.entity');
const db = require('../../../packages/modules/datasource');

class UserRepositoryImplementation extends IUserRepository {
  async findByEmail(email) {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return new UserEntity({
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      fullName: row.full_name,
      role: row.role,
      avatarUrl: row.avatar_url,
      createdAt: row.created_at
    });
  }

  async findById(userId) {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return new UserEntity({
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      fullName: row.full_name,
      role: row.role,
      avatarUrl: row.avatar_url,
      createdAt: row.created_at
    });
  }

  async getUserStats(userId) {
    const result = await db.query('SELECT * FROM user_stats WHERE user_id = $1', [userId]);
    if (result.rows.length === 0) {
      // Create default stats if not exists
      await db.query(
        'INSERT INTO user_stats (user_id, total_points, total_earnings, repaired_count, prevented_waste_kg) VALUES ($1, 0, 0, 0, 0)',
        [userId]
      );
      return { totalPoints: 0, totalEarnings: 0, repairedCount: 0, preventedWasteKg: 0, co2Saved: 0 };
    }
    const row = result.rows[0];
    return {
      totalPoints: row.total_points || 0,
      totalEarnings: parseFloat(row.total_earnings) || 0,
      repairedCount: row.repaired_count || 0,
      preventedWasteKg: parseFloat(row.prevented_waste_kg) || 0,
      co2Saved: parseFloat(row.prevented_waste_kg) * 2.5 || 0 // Approximate CO2 calculation
    };
  }

  async create(userEntity) {
    const { email, passwordHash, fullName } = userEntity;
    const result = await db.query(
      'INSERT INTO users (email, password_hash, full_name) VALUES ($1, $2, $3) RETURNING *',
      [email, passwordHash, fullName]
    );

    const row = result.rows[0];

    // Also create user_stats entry
    await db.query(
      'INSERT INTO user_stats (user_id, total_points) VALUES ($1, 0)',
      [row.id]
    );

    return new UserEntity({
        id: row.id,
        email: row.email,
        passwordHash: row.password_hash,
        fullName: row.full_name,
        role: row.role,
        avatarUrl: row.avatar_url,
        createdAt: row.created_at
    });
  }
}

module.exports = UserRepositoryImplementation;
