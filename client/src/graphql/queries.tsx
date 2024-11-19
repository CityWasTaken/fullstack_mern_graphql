import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser {
    getUser {
      user {
        _id
        username
      }
    }
  }
  `;

export const GET_USER_PETS = gql`
  query GetUserPets {
    getUserPets {
      _id
      age
      name
      type
      posts {
        _id
      }
    }
  }
`;

export const GET_PET_POSTS = gql`
  query GetPostForPet($petId: ID) {
    getPostForPet(pet_id: $petId) {
      _id
      body
      title
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      _id
      title
      body
      pet {
        name
      }
    }
  }
`;