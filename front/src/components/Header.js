import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Navbar, Nav, NavItem, MenuItem, Dropdown, Glyphicon} from "react-bootstrap";
import { slide as Menu } from 'react-burger-menu';
import LoginScreen from "../containers/LoginScreen";

// The Header creates links that can be used to navigate
// between routes.

class Account extends React.Component{
  render() {
    return (
      <ul className="configAccount">
      <Dropdown id="drop">
      <Dropdown.Toggle>
      <Glyphicon glyph="user" />

      </Dropdown.Toggle>
      <Dropdown.Menu>
      <MenuItem>
      <div className="navbar-login">
      <div className="row">
      <div className="col-lg-4">
      <p className="text-center">
      <span className="glyphicon glyphicon-user icon-size" />
      </p>
      </div>
      <div className="col-lg-8">
      <p className="text-left"><strong>Nombre Apellido</strong></p>
      <p className="text-left small">correoElectronico@email.com</p>
      <p className="text-left">
      </p>
      </div>
      </div>
      </div>
      </MenuItem>
      <MenuItem divider />
      <MenuItem>
      <div className="navbar-login navbar-login-session">
      <div className="row">
      <div className="col-lg-12">
      <p>
      <a href="#" className="btn btn-danger btn-block">Cerrar Sesion</a>
      </p>
      </div>
      </div>
      </div>
      </MenuItem>
      </Dropdown.Menu>
      </Dropdown>
      </ul>
      );
  }
};
class NavbarInstance extends React.Component {
	render() {
		return (
			<Navbar>
			<Navbar.Header>
			<Navbar.Brand>

			<Menu>
			<a id="home" className="menu-item" href="/">Home</a>
			<a id="clubs" className="menu-item" href="/clubs">Mis clubes de lectura</a>
			<a id="contact" className="menu-item" href="/contact">Contact</a>
			<a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
			</Menu>
			<Link to="/">Club Virtual</Link>
			</Navbar.Brand>
			</Navbar.Header>
			<Nav className="account">
      <NavItem onClick={(event) => this.handleClick(event)}>Login/SignUp</NavItem>
      <MenuItem divider />
      </Nav>
      <Account></Account>
      </Navbar>
      );

	}
   handleClick(event){
    var login=[];
    login.push(<LoginScreen appContext ={this.props.appContext}/>);
    this.props.appContext.setState({mainPage:[],loginPage:login});
   }

}

class Header extends React.Component {
	render() {
		return (
			<NavbarInstance appContext ={this.props.appContext}></NavbarInstance>

			);
	}
}

export default Header
