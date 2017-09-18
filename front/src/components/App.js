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
			welcomePage:[],
			loginPage:[],
			homePage:[]
		}
	}
	componentWillMount(){
    var welcomePage =[];
    welcomePage.push(<Welcome appContext={this}/>);
    this.setState({
                  welcomePage:welcomePage
                    })
  }

	render() {
			return (<div>
			<Main/>
				<Header appContext={this} />
				{this.state.welcomePage}
				{this.state.loginPage}
				{this.state.homePage}
				</div>
				)
		}
}
export default App;
