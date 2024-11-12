const gql = String.raw;

const typeDefs = gql `

type Post {
    _id: ID
    title: String
    body: String
    pet: Pet
}

type Pet {
    _id: ID
    name: String
    type: String
    age: Int
    owner: User
    posts: [Post]
}

type User {
    _id: ID
    username: String
    email: String
    pets: [Pet]
}

type Response {
    user: User
    errors: [String]
}

type Query {
    test: String
},


type Mutation {
    registerUser(username: String, email: String, password: String): Response
    loginUser(email: String, password: String): Response
}

`;

export default typeDefs;