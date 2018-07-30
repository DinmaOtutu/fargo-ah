module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [{
    email: 'JakeJone@register.com',
    hashedPassword: '$2b$10$vBox3ssr3T9b2YHsMbg64eciZWkWId/VvddxSEG3Be63x.MvzBUgO',
    username: 'JakeJone',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    email: 'JakeJoneII@register.com',
    hashedPassword: '$2b$10$vBox3ssr3T9b2YHsMbg64eciZWkWId/VvddxSEG3Be63x.MvzBUgO',
    username: 'JakeJoneII',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    email: 'JakeJoneIII@register.com',
    hashedPassword: '$2b$10$vBox3ssr3T9b2YHsMbg64eciZWkWId/VvddxSEG3Be63x.MvzBUgO',
    username: 'JakeJoneIII',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
