import React from 'react';
import ReactDOM from 'react-dom';
import './css/side-menu.css';
import App from './App';
import People from './components/People';
import { Router, Route, browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { people } from './reducers/people';

const store = createStore(people, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    (
        <Router history={browserHistory} >
            <Route path="/" component={App} >
                <Route path="/people" component={People} store={store} />
            </Route>
        </Router>
    ), document.getElementById('root'));