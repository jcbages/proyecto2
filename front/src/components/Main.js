import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LoginScreen from '../containers/LoginScreen';
import Clubs from "./Clubs";


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
class Main extends React.Component {
constructor(props){
		super(props);
		}
		componentWillMount(){
		this.setState({
		})
	}
		render() {
			return (
 			<main>
    <Switch>
      <Route exact path='/' component={this.props.homePage}/>
      <Route path='/logscreen' component={LoginScreen} parentContext={this.props.parentContext}/>
      <Route path='/clubs' component={Clubs}/>
    </Switch>
  </main>
)
}
}
export default Main