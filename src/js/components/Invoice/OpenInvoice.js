import React from 'react';
import Load from './../../res/Processes/Load';
import { connect } from 'react-redux';

import store from './../../store';

@connect((store) => {
	return {
		user : store.user.user,
	}
	console.log(store.user.user)
})

export default class OpenInvoice extends React.Component{
	constructor(props){
		super(props);
		this.state={
			user: (this.props.user.data !== undefined) ? this.props.user.data : null
		}
	}
	
	render(){
		return(
			<div>
				<div className='profile-main-container'>
					<div className='background-pic-container'></div>
					<div className='prof-pic-container'>
						{/*<img src={this.state.user.pic} className='profile-pic'/>*/}
					</div>
					<div className='bottom-page-container'>
						<div className='bottom-page-wrapper'>click On menu button to go forwrad<br/>
						on left top corner
						</div>
					</div>
				</div>
			</div>
		)
	}
}