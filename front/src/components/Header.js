import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from "react-bootstrap";
import { slide as Menu } from 'react-burger-menu'

// The Header creates links that can be used to navigate
// between routes.


class NavbarInstance extends React.Component {
	render() {
		return (
			<Navbar>
			<Navbar.Header>
			<Navbar.Brand>
			<Menu>
			<a id="home" className="menu-item" href="/">Home</a>
			<a id="about" className="menu-item" href="/about">About</a>
			<a id="contact" className="menu-item" href="/contact">Contact</a>
			<a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
			</Menu>
			<Link to="/">Club Virtual</Link>
			</Navbar.Brand>
			</Navbar.Header>
			<Nav className="account">
			<NavItem><Link to="/signup">Sign Up</Link></NavItem>
			<NavItem><Link to="/login">Login</Link></NavItem>
			<MenuItem divider />
			</Nav>
			</Navbar>

			);

	}
}

class Header extends React.Component {
	render() {
		return (
			<NavbarInstance></NavbarInstance>

			);
	}
}

export default Header
