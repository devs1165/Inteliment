import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, IndexRoute, IndexRedirect } from 'react-router';
import {Provider} from 'react-redux';
import store from './store';
import { syncHistoryWithStore } from 'react-router-redux';

import Layout from './components/master/Layout';
import Index from './components/master/Index';
import Login from './components/Login';

// components
// invoices
import Invoice from './components/Invoice/Invoice';
import OpenInvoice from './components/Invoice/OpenInvoice';
import Team from './components/Invoice/Team';
import Contact from './components/Invoice/Contact';
import Profile from './components/Invoice/Profile';


const history = syncHistoryWithStore(hashHistory, store);

var app = document.getElementById('react-app');

ReactDOM.render(<Provider store = {store}>
    <div>
        <Router history = {history}>
            <Route path="/" component={Layout}>
                <IndexRoute component={Login} />
                <Route path = "dashboard" component={Index}>
                    <IndexRedirect to = "invoice" />
                    <Route path="invoice" component={Invoice}>
                        <IndexRoute component={OpenInvoice} />
                            <Route path="team" component={Team} />
                            <Route path="contact" component={Contact} />
                            <Route path="profile" component={Profile} />
                    </Route>
                </Route>
    		</Route>
	   </Router>
	</div>
	</Provider>, app);
