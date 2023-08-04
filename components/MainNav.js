import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { addToHistory } from "../lib/userData";
import { useEffect, useState } from "react";
import { getToken, readToken, removeToken } from "../lib/authenticate";
import { searchHistoryAtom, isAuthenticatedAtom } from "@/store";
import { useAtom } from "jotai";
import { token as tokenAtom } from "@/store";

function MainNav() {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const { register, handleSubmit } = useForm();
  const [isExpanded, setIsExpanded] = useState(false);

  const [authToken, setAuthToken] = useAtom(tokenAtom);

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  // logout
  const logout = () => {
    setIsExpanded(false);
    setIsAuthenticated(false);
    removeToken();
    router.push("/login");
  };
  const router = useRouter();

  const submitForm = async (data) => {
    let path = data.q ? `title=true&q=${data.q}` : "title=true";
    setIsExpanded(false);
    // setSearchHistory((current) => [...current, path]);

    setSearchHistory(await addToHistory(path));

    await router.push(`/artwork?${path}`);
  };

  return (
    <>
      <Navbar
        expanded={isExpanded}
        expand="lg"
        className="fixed-top navbar navbar-dark bg-dark"
      >
        <Container>
          <Navbar.Brand>Yuvraj Singh</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link onClick={() => setIsExpanded(false)}>Home</Nav.Link>
              </Link>
              {isAuthenticated && (
                <>
                  <Link href="/search" passHref legacyBehavior>
                    <Nav.Link onClick={() => setIsExpanded(false)}>
                      Advanced Search
                    </Nav.Link>
                  </Link>
                  <Form onSubmit={handleSubmit(submitForm)} className="d-flex">
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      className="me-2"
                      aria-label="Title"
                      name="q"
                      {...register("q", { required: true })}
                    />
                    <Button variant="outline-success" type="submit">
                      Search
                    </Button>
                  </Form>
                </>
              )}
              &nbsp;
              {isAuthenticated && (
                <NavDropdown
                  title={authToken?.userName} // Assuming "userName" is a property in your token
                  id="basic-nav-dropdown"
                  className="text-light"
                >
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item
                      active={router.pathname === "/favourites"}
                      onClick={() => setIsExpanded(false)}
                    >
                      Favourites
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item
                      active={router.pathname === "/history"}
                      onClick={() => setIsExpanded(false)}
                    >
                      Search History
                    </NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              )}
              {!isAuthenticated && (
                <Nav>
                  <Link href="/register" passHref legacyBehavior>
                    <Nav.Link
                      active={router.pathname === "/register"}
                      onClick={() => setIsExpanded(false)}
                    >
                      Register
                    </Nav.Link>
                  </Link>
                  <Link href="/login" passHref legacyBehavior>
                    <Nav.Link
                      active={router.pathname === "/login"}
                      onClick={() => setIsExpanded(false)}
                    >
                      Login
                    </Nav.Link>
                  </Link>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
export default MainNav;
