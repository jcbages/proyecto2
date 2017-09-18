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
			mainPage:[],
			loginPage:[],
		}
	}
	componentWillMount(){
    var welcomePage =[];
    welcomePage.push(<Welcome appContext={this}/>);
    this.setState({
                  mainPage:welcomePage
                    })
  }

	render() {
			return (<div>
			<Main/>
				<Header appContext={this} />
				{this.state.mainPage}
				{this.state.loginPage}
				</div>
				)
		}
}
export default App;
