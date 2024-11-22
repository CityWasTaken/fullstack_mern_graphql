import { useState } from "react";
import { Button, Form, Modal, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../../../graphql/mutations";

import { Pet } from "../../../interfaces";
import { GET_ALL_POSTS, GET_PET_POSTS } from "../../../graphql/queries";

const initialFormData = {
    title: '',
    body: '',
    errorMessage: ''
}

interface ModalProps {
    selectedPet: Pet | null;
    showCreatePostModal: boolean;
    setShowCreatePostModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreatePostModal({
    selectedPet,
    showCreatePostModal,
    setShowCreatePostModal
}: ModalProps) {
    const [formData, setFormData] = useState(initialFormData);
    const [createPost] = useMutation(CREATE_POST, {
        refetchQueries: [{
            query: GET_PET_POSTS,
            variables: {
                petId: selectedPet?._id
            }
        }, {query: GET_ALL_POSTS}]
    });

    const handleModalClose = () => {
        setFormData({...initialFormData});
        setShowCreatePostModal(false);}

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })

    }

    const handleSubmit = async () => {

        try {
            await createPost({
                variables: {
                    ...formData,
                    pet: selectedPet?._id
                }
            });

            setFormData({ ...initialFormData });

            handleModalClose();
        } catch (error: any) {
            setFormData({
                ...formData,
                errorMessage: error.message
            })
        }
    }

    return (
        <Modal show={showCreatePostModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Post for {selectedPet?.name}</Modal.Title>
            </Modal.Header>


            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        {formData.errorMessage && <Alert variant="info">{formData.errorMessage}</Alert>}
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            name="title"
                            value={formData.title}
                            type="text"
                            placeholder="Enter a title"
                            autoFocus
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Post Text</Form.Label>
                        <Form.Control name="body"
                            value={formData.body}
                            onChange={handleInputChange} as="textarea"
                            placeholder="Whats on your mind?"
                            rows={3} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Add Post
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreatePostModal;