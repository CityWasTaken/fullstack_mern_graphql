import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { useStore } from "../store";
import { LOGOUT_USER } from "../graphql/mutations";
import { client } from "../main";


function Header() {
    const { state, setState } = useStore()!;
    /*
    const store = useStore();
    if (!store) {
        throw new Error("Store is not available")
    }
    const {state} = store;
    */

    const [logoutUser] = useMutation(LOGOUT_USER, {
        onCompleted() {
            client.clearStore();
        }
    });
    const navigate = useNavigate();

    const handleLogout = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.preventDefault();

        setState((oldState) => ({
            ...oldState,
            user: null
        }));

        await logoutUser();

        navigate('/');
    }


    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container fluid={true}>
                <Navbar.Brand as={NavLink} to="/">Petstagram</Navbar.Brand>
                <Nav className="ms-auto">
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>

                    {state.user ? (
                        <>
                            <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link as={NavLink} to="/pet/add">Add a Pet</Nav.Link>
                            <NavDropdown title="Profile Menu">
                                <NavDropdown.ItemText className="border-bottom mb-2">{state.user.username}</NavDropdown.ItemText>
                                <NavDropdown.Item onClick={handleLogout} href="/logout">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                        </>
                    )}


                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header;