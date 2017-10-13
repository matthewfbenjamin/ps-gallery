import React from 'react'
import ReactDOM from 'react-dom'
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'
import { Provider } from 'react-redux'
import reduxStore from './reduxStore'
import {HomePage} from './Home'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

ReactDOM.render((
	<MuiThemeProvider>
		<Provider store={reduxStore}>
			<Router basename='/'>
			<div>
				<Route path='/' component={HomePage} />
			</div>
			</Router>
		</Provider>
	</MuiThemeProvider>
), document.getElementById('root'))
