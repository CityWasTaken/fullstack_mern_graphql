import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
import User from '../models/User.js';
const { sign } = jwt;
function createToken(user_id) {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return sign({ user_id: user_id }, process.env.JWT_SECRET);
}
const resolvers = {
    Query: {
        test() {
            return 'test string';
        }
    },
    Mutation: {
        // Register a user
        async registerUser(_, args, context) {
            try {
                const user = await User.create(args);
                const token = createToken(user._id);
                context.res.cookie('pet_token', token, {
                    // Purpose: This setting ensures that the cookie is only accessible through HTTP(S) requests and not via client-side JavaScript.
                    // Security Benefit: It helps mitigate the risk of cross-site scripting (XSS) attacks by preventing malicious scripts from accessing the cookie's value.
                    httpOnly: true,
                    // Purpose: This setting ensures that the cookie is only sent over secure HTTPS connections.
                    // Security Benefit: It prevents the cookie from being transmitted over unencrypted HTTP connections, reducing the risk of man-in-the-middle attacks. The condition process.env.PORT ? true : false checks if the PORT environment variable is set, which might indicate a production environment where HTTPS is used.
                    secure: process.env.PORT ? true : false,
                    // Purpose: This setting controls whether the cookie is sent with cross-site requests.
                    // Security Benefit: It helps prevent cross-site request forgery (CSRF) attacks by ensuring that the cookie is only sent with requests originating from the same site. Setting sameSite: true is equivalent to sameSite: 'strict', which means the cookie will not be sent with any cross-site browsing context.
                    sameSite: true
                });
                return {
                    user: user
                };
            }
            catch (error) {
                const errors = [];
                console.log(error.message);
                if (error.code === 11000) {
                    errors.push('That email is already in use');
                }
                else {
                    for (const prop in error.errors) {
                        errors.push(error.errors[prop].message);
                    }
                }
                return {
                    errors: errors
                };
            }
        },
        // Log a user in
        loginUser() {
            return 'some string';
        }
    }
};
export default resolvers;
