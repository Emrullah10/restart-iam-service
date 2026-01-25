/**
 * User Repository Interface
 * Note: Since JavaScript doesn't have native interfaces, we define the expected contract.
 */
class IUserRepository {
  async findByEmail(email) {
    throw new Error('Method findByEmail not implemented');
  }

  async create(userEntity) {
    throw new Error('Method create not implemented');
  }

  async findById(id) {
    throw new Error('Method findById not implemented');
  }
}

module.exports = IUserRepository;
