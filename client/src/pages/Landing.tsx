import { Row, Col, Container } from "react-bootstrap";
import { useQuery } from "@apollo/client";

import { GET_ALL_POSTS } from "../graphql/queries";
import { Post } from "../interfaces";


function Landing() {
    const { data: postData } = useQuery(GET_ALL_POSTS);

    return (
        <Container fluid={true}>
            <Row>
                <Col className="landing-hero-image"></Col>
                <Col className="d-flex flex-column justify-content-center hero-text" xs="12" md="6">
                    <h1 data-hero-header className="text-center">Petstagram</h1>
                    <h2 className="text-center fx-light">The fun starts when the owners are out</h2>
                </Col>
            </Row>
            <Container>
                <h2 className="fw-light mt-5">What's the word on the street?!</h2>
                <hr />

                {postData && !postData.getAllPosts.length && (
                    <p>No posts have been added yet. Sign up and be the first to add one!</p>
                )}
                <Row className="my-4">
                    {postData && postData.getAllPosts.map((post: Post) => (
                        <Col lg="2" key={post._id} className="landing-post border my-1 mx-2">
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                            <p>Added by: {post.pet?.name}</p>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    )
}

export default Landing;