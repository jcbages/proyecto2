import React from 'react';
import './HomePage.css';
import Header from "./Header";
import Main from "./Main";

class HomePage extends React.Component {
	constructor(props){
		super(props);
		this.state={
			mainPage:[],
			clubPage:[]
		}
	}

	render() {
		return(<div>Bienvenido!
    </div>	
    )	
		}
}
export default HomePage;
