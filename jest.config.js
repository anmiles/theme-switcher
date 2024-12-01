module.exports = {
	preset    : 'ts-jest',
	transform : {
		'^.+\\.tsx?$' : 'ts-jest',
	},

	clearMocks      : true,
	testEnvironment : 'jsdom',

	roots     : [ '<rootDir>/src' ],
	testMatch : [ '<rootDir>/src/**/__tests__/*.test.{ts,tsx}' ],

	collectCoverageFrom : [
		'<rootDir>/src/**/*.{ts,tsx}',
		'!<rootDir>/src/**/__tests__/**',
	],

	moduleNameMapper : {
		'\\.(css|less)$' : '<rootDir>/src/__mocks__/css.ts',
	},
};
