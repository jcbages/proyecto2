import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from "./components/App.js";
import Base from './components/Base.js';
import SignUp from './components/SignUpForm.js';
import LoginForm from './components/LoginForm.js';
import createMemoryHistory from 'history/createMemoryHistory';


import { BrowserRouter, Switch, Route, Router} from 'react-router-dom';

const history = createMemoryHistory();

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();


ReactDOM.render((
	<MuiThemeProvider muiTheme={getMuiTheme()}>
	<BrowserRouter>
	<Base />
	</BrowserRouter>	
	</MuiThemeProvider>), document.getElementById('root'));
registerServiceWorker();
