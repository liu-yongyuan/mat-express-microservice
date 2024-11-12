export default {
    transform: {},
    forceExit: true,
    setupFilesAfterEnv: ["./setupTests.js"],
    testPathIgnorePatterns: ["/node_modules/", "dekko", "node", "image.test.js", "image.test.ts"],
    testRegex: 'test\\.(j|t)s$',
};
