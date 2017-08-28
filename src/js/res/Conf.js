import React from 'react';
import { hashHistory, Link } from 'react-router';
import { push } from 'react-router-redux';
import cookie from 'react-cookie';
// import Enviroments from './../../../Enviroments';

export default class Conf extends React.Component{
	
	static localhost = "http://ec2-54-69-219-242.us-west-2.compute.amazonaws.com:8000";
	// static localhost = "http://demo5507550.mockable.io";
	// functions
	// redirect to a route
	// pass route
	static redirect(path){
		if(hashHistory.getCurrentLocation().pathname !== path){
	        hashHistory.push(path);
	    }
	}

	
}	
	

