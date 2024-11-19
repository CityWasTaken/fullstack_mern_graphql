import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
mutation RegisterUser($username: String, $email: String, $password: String) {
  registerUser(username: $username, email: $email, password: $password) {
    errors
    user {
      _id
      username
    }
  }
}
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
        errors
          user {
          _id
          username
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser {
        user {
        _id
      }
    }
  }
`;

export const CREATE_PET = gql`
  mutation CreatePet($name: String, $type: String, $age: Int) {
    createPet(name: $name, type: $type, age: $age) {
      errors
      message
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($title: String, $body: String, $pet: ID) {
    createPost(title: $title, body: $body, pet: $pet) {
      errors
      message
    }
  }
`;