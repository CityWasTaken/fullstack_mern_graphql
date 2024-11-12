import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import connection from './config/connection.js';
import typeDefs from './schema/typeDefs.js';
import resolvers from './schema/resolvers.js';
const app = express();
const PORT = process.env.PORT || 3333;
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
connection.once('open', async () => {
    // Note you must call `start()` on the `ApolloServer`
    // instance before passing the instance to `expressMiddleware`
    await server.start();
    // Middleware
    app.use('/graphql', express.json(), expressMiddleware(server));
    app.listen(PORT, () => {
        console.log('Express server has started on', PORT);
    });
});
