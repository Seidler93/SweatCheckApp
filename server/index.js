const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
const { typeDefs, resolvers } = require('./schema');

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost:27017/sweatcheck', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
});
