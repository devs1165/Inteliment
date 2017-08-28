import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import cookie from 'react-cookie';
import { push } from 'react-router-redux';
import { UserLogin, LoginError } from './../../actions/userAction';

// store
@connect((store) => {
	return {
		login : store.user.login,
		logout : store.user.logout,
		user : store.user.user,
		error:store.user.error,
	}
})

export default class LoginComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			user_log : (cookie.load('reckouser') == undefined || cookie.load('reckouser').length == 0) ? "" : cookie.load('reckouser'),
		}
		console.log(this.state.user_log)
		this.redirect = this.redirect.bind(this);
	}
	/*componentWillMount(){
		this.props.dispatch(LoginError());
	}*/
	componentDidMount(){
		if(this.state.user_log !== ""){
			this.redirect('/dashboard');
		}
	}
	componentWillReceiveProps(nextProps){
		if(this.props.error != nextProps.error && nextProps.error !== null){
			this.refs.login_error_message.innerHTML = "*"+nextProps.error;
		}
		if(this.props.login != nextProps.login && nextProps.login == true){
			var today = new Date();
			var nextDay = new Date();
			nextDay.setTime(today.getTime()+24*60*60*1000);
			cookie.save('reckouser', nextProps.user, { path: '/' , expires : nextDay});
			this.redirect('/dashboard');
		}
	}
	login(){
		var username = this.refs.username.value;
		var password = this.refs.password.value;
		if(username.length == 0 || password.length == 0){
			this.refs.login_error_message.innerHTML = "*Mandatory field empty";
		}
		else{
			this.props.dispatch(UserLogin(username,password));
		}
	}
	redirect(path){
		hashHistory.push(path);
	}
	onEnter(evt){
		if(evt.keyCode == 13){
			this.login();
		}
	}

	render(){
		return(
			<div>
				<div className='cub-login-main-container'></div>
				<div className='cub-login-form-main-container'>
					<div className='cub-login-form-main-wrapper'>
						<div className='cub-login-logo-container'></div>
						<div className='cub-login-user-name-password-container'>
							<div className='cub-login-user-name-container'>
								<input ref="username" onKeyDown={this.onEnter.bind(this)} className='cub-login-user-name-password-input' placeholder='Username' type='text' autoFocus/>
							</div>
							<div className='cub-login-password-container'>
								<input ref="password" onKeyDown={this.onEnter.bind(this)} className='cub-login-user-name-password-input' placeholder='Password' type='password'/>
							</div>
						</div>
						<div ref="login_error_message" className='cub-login-message-error-container'></div>
						<div className='cub-login-rememberme-button-container'>
							<div className='cub-login-button-container'>
								<input onClick={this.login.bind(this)} className='cub-login-button' type='button' value='Login'/>
							</div>
						</div>
						<div className='cub-login-footer-container'>Powered by AbC Technology Solutions Pvt Ltd</div>
					</div>	
				</div>
			</div>
		)
	}
}