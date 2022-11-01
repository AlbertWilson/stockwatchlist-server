module.exports = {
  transform: {'^.+\\.ts?$': 'ts-jest'},
  testEnvironment: 'node',
  testRegex: '/test/.*\\.(test|spec)?\\.(ts|tsx)$', // used to set test directory
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};