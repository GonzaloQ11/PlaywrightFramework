const testdata = {
  user: {
    username: process.env.APP_USERNAME,
    password: process.env.APP_PASSWORD,
    invalidPassword: '123456',
  },
  errorMessages: {
    invalidCredentials: 'Invalid credentials',
  },
};

export default testdata;