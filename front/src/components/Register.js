import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Login from './Login';
import axios from 'axios';
import HomePage from "./HomePage";



class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:''
    }
  }
  render() {
    return (
      <div>
      <MuiThemeProvider>
      <div>
      <TextField
      hintText="Enter your First Name"
      floatingLabelText="First Name"
      onChange = {(event,newValue) => this.setState({first_name:newValue})}
      />
      <br/>
      <TextField
      hintText="Enter your Last Name"
      floatingLabelText="Last Name"
      onChange = {(event,newValue) => this.setState({last_name:newValue})}
      />
      <br/>
      <TextField
      hintText="Enter your Email"
      type="email"
      floatingLabelText="Email"
      onChange = {(event,newValue) => this.setState({email:newValue})}
      />
      <br/>
      <TextField
      type = "password"
      hintText="Enter your Password"
      floatingLabelText="Password"
      onChange = {(event,newValue) => this.setState({password:newValue})}
      />
      <br/>
      <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
      </div>
      </MuiThemeProvider>
      </div>
      );
  }
  handleClick(event){
    var apiBaseUrl = "/users/";
    var self = this;
    var payload={
      "first_name": this.state.first_name,
      "last_name":this.state.last_name,
      "email":this.state.email,
      "password":this.state.password
    }
    axios.post(apiBaseUrl+'/register', payload)
    .then(function (response) {
     console.log(response);
     if(response.status == 200){
       window.alert("Signup successfull");
       var homePage=[];
       homePage.push(<HomePage/>);
       self.props.appContext.setState({loginPage:[],mainPage:homePage,userId:response.data.data._id});
     }
     else{
      window.alert("Error signing up");
     }
   })
    .catch(function (error) {
     console.log(error);
   });
  }
  handleClick(event){
    console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password);
    //To be done:check for empty values before hitting submit
    var self = this;
    var payload={
      "first_name": this.state.first_name,
      "last_name":this.state.last_name,
      "email":this.state.email,
      "password":this.state.password
    }
  }
}
const style = {
  margin: 15,
};
export default Register;