import { Button, Modal } from "react-bootstrap";
import { useQuery } from "@apollo/client";

import { GET_PET_POSTS } from "../../../graphql/queries";
import { Pet, Post } from "../../../interfaces";


interface ModalProps {
    showPostsModal: boolean;
    setShowPostsModal: React.Dispatch<React.SetStateAction<boolean>>;
    selectedPet: Pet | null;
}

function ViewPostModal({
    showPostsModal,
    setShowPostsModal,
    selectedPet
} : ModalProps) {
    

    const {data: postData} = useQuery(GET_PET_POSTS, {
        variables: {
            petId: selectedPet?._id
        }
    });

    const handleModalClose = () => setShowPostsModal(false);


    return (
        <Modal show={showPostsModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedPet?.name}'s Posts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {postData && !postData.getPostForPet.length && (
                        <p>Uh oh! You dont have any powsts right meow</p>
                    )}

                    {postData && postData.getPostForPet.map((post: Post) => (
                        <article key={post._id} className="mb-2 border-bottom">
                            <h5>{post.title}</h5>
                            <p>{post.body}</p>
                        </article>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>                
                </Modal.Footer>
            </Modal>
    )
}

export default ViewPostModal;