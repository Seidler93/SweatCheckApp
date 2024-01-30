const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('friends');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
  },

  Mutation: {
    addUser: async (parent, { input }) => {
      const user = await User.create(input);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      console.log('clicked');
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      console.log({ token, user });

      return { token, user };
    },
  }, 
}

module.exports = resolvers;