import { useState } from "react";
import { Button, Container} from "react-bootstrap";
import { useQuery } from "@apollo/client";

import { Pet } from "../../interfaces";

import { GET_USER_PETS } from "../../graphql/queries";

import CreatePostModal from "./components/CreatePostModal";
import ViewPostModal from "./components/ViewModalPosts";


function Dashboard() {
    const { data: petData } = useQuery(GET_USER_PETS);
    const [selectedPet, setSelectedPet] = useState<null | Pet>(null);
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
    const [showPostsModal, setShowPostsModal] = useState(false);


    const handleShowCreatePostModal = (pet: Pet) => {
        setSelectedPet(pet);

        setShowCreatePostModal(true);
    };

    const handleShowPostsModal = (pet: Pet) => {
        setSelectedPet(pet);

        setShowPostsModal(true);
    };


    return (
        <Container>
            <h3 className="mt-4 fw-light">Your Lineup</h3>
            <hr />

            <section className="d-grid gap-3 pet-output">
            {petData && !petData.getUserPets.length && <p>No pets have been added yet</p>}
                {petData && petData.getUserPets.map((pet: Pet) => (
                    <article key={pet._id} className="border p-2">
                        <h4>{pet.name}</h4>
                        <p>Type: {pet.type}</p>
                        <p>Age: {pet.age}</p>
                        <Button variant="primary" className="me-2" onClick={() => handleShowCreatePostModal(pet)}>New Post</Button>
                        <Button variant="secondary" className="me-2" onClick={() => handleShowPostsModal(pet)} >View Posts</Button>                        
                    </article>
                ))}
            </section>

            <CreatePostModal
            selectedPet={selectedPet}
            showCreatePostModal={showCreatePostModal}
            setShowCreatePostModal={setShowCreatePostModal}
            />

            <ViewPostModal
            showPostsModal={showPostsModal}
            setShowPostsModal={setShowPostsModal}
            selectedPet={selectedPet}
            />

        </Container>
    )
}

export default Dashboard;