import React from 'react';
import { connect } from 'react-redux';

import store from './../../store';

@connect((store) => {
	return {
		date_filter : store.master.date_filter,
	}
})

export default class Load extends React.Component{
	static Invoice(){
		var open = function(data){
			// store.dispatch(openInvoice(data));
		}

		return {
			open : open
		}
	}
}