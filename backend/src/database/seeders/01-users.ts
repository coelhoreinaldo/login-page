import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        email: 'user1@email.com',
        password: 'password1',
        name: 'User 1',
      },
      {
        email: 'user2@email.com',
        password: 'password2',
        name: 'User 2',
      },
    ], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('users', {});
  }
};