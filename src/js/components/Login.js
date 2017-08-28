import React from 'react';
import LoginComponent from './master/LoginComponent';

// login class
export default class Login extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className="container-fluid login-container">
				<div className="row-fluid login-empty-row">
					
				</div>
				<div className="row-fluid login-container-element-row">
					<div className="col-md-4 col-sm-4"></div>
					<div className="col-md-4 col-sm-4 login-container-element">
						<LoginComponent />
					</div>
					<div className="col-md-4 col-sm-4"></div>
				</div>
				<div className="row-fluid login-empty-row">
				</div>
			</div>
		)
	}
}