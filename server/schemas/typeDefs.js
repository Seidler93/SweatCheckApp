const typeDefs = `
  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    password: String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
