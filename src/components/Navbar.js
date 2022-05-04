import React from 'react';
import { useState } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import LogoName from '../Logo.svg'

const NavbarLink = (props) => {
    let isAuthenticate;
    //  TODO : Getting the  data from indexDB based on that search and other navbar show.
    const [search, setSearch] = useState("")

    const setSearchInput = (e) => {
        setSearch(e.target.value)
    }
    return (<>
        <Navbar className="fixed-top" bg={props.mode} variant={props.mode}>
            <Navbar.Brand href="/">
                <img src={LogoName} alt="logo" width="60" height="40" />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link to="/login" className="nav-link"> {props.login}</Link>
                    <Link to="/signup" className="nav-link"> {props.signup}</Link>
                    <Link to="/todolist" className="nav-link">{props.todolist}</Link>
                    <Link to="/analytics" className="nav-link">{props.analytics}</Link>
                </Nav>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%"
                }}>
                    <Form className="d-flex">
                        <input
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={search}
                            onChange={setSearchInput}
                        />
                        <Button
                            onClick={() => props.onSearch(search)}
                            variant="outline-success">Search</Button>
                    </Form>
                </div>
            </Navbar.Collapse>
        </Navbar>
    </>);
}

NavbarLink.defaultProps = {
    title: "TODO List",
    login: "Login",
    signup: "Signup",
    logout: "Logout",
    todolist: "TodoList",
    analytics: "Analytics"

}

export default NavbarLink;