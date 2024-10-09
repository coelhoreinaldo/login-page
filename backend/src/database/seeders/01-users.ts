import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        email: 'user1@email.teste',
        password: '$2b$10$ZkncXPwWP1B50KS3ZS4C8u427UBCvB3PesdOBkYwEsvWVJCmp4ZPq', // user11
        name: 'User 1',
      },
      {
        email: 'user2@email.teste',
        password: '$2b$10$zvLtghznOSvQ3FRtMiWNaOVGlWOc0q/PRYCw83cOwF51Xapt54BBa', //user22
        name: 'User 2',
      },
    ], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('users', {});
  }
};