import React from 'react';
import './App.css';
import Header from "./Header";
import Main from "./Main";
import LoginScreen from '../containers/LoginScreen';
import HomePage from "./HomePage";
import Welcome from "./Welcome";


class App extends React.Component {
	constructor(props){
		super(props);
		this.state={
			loginPage:[],
			homePage:HomePage
		}
	}
	componentWillMount(){
		var loginPage =[];
		loginPage.push(<LoginScreen appContext={this}/>);
		this.setState({
			loginPage:loginPage
		})
	}

	render() {

		if(this.state.homePage.length === 0){
			return (<div>
				<style dangerouslySetInnerHTML={{__html: `
						.configAccount { display: none; }
						.account{display:block}
						.bm-burger-button{display:none;}
					`}}></style>
				<Header />
				<Main parentContext={this} homePage={Welcome}/>
				</div>
				)
		}
		else{
			return(
				<div>
				<style dangerouslySetInnerHTML={{__html: `
						.configAccount{display:block}
					`}}></style>
					<Header />
					<Main homePage={HomePage}/>
					</div>
					);
		}
	}
}
export default App;
