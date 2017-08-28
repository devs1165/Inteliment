import React from "react";
import Conf from './../Conf';

export default class SortBy extends React.Component{
	
	// sort by time
	// type : "asc/dsc", data : "data to sort", key : "key of the value in data"
	// returns time sorted data
	static DateTime(type, data, key){
		var sort_data = data;
		sort_data.sort(function(a,b){
			var a_arr = a[key].date.split("/");
			var a_datestring = a_arr[2]+"-"+a_arr[1]+"-"+a_arr[0]+"T"+a[key].time+":00";
			var a_date = new Date(b_datestring);
			
			var b_arr = b[key].date.split("/");
			var b_datestring = b_arr[2]+"-"+b_arr[1]+"-"+b_arr[0]+"T"+b[key].time+":00";
			var b_date = new Date(b_datestring);

			
			if(a_date == "Invalid Date"){
				var d_arr = a[key].date.split("/");
				var date_string = "20"+d_arr[2]+"-"+d_arr[1]+"-"+d_arr[0]+"T"+a[key].time+":00";
				a_date = new Date(date_string);
			}

			if(b_date == "Invalid Date"){
				var d_arr = b[key].date.split("/");
				var date_string = "20"+d_arr[2]+"-"+d_arr[1]+"-"+d_arr[0]+"T"+b[key].time+":00";
				b_date = new Date(date_string);
			}

			if(type == 'dsc'){
				return b_date.getTime() - a_date.getTime();
			} 
			else{
				return a_date.getTime() - b_date.getTime()
			}
		})
		
		return sort_data;
	}

	// sort by Integer
	// type : "asc/dsc", data : "data to sort", key : "key of the value in data"
	// returns Integer value sorted data
	static IntegerValue(type, data, key){
		var sort_data = data;
		var key_arr = [];
		
		if(key.indexOf('.') !== -1){
			key_arr = key.split(".");
		}

		sort_data.sort(function(a,b){
			var a_int = a;
			var b_int = b;
			if(key_arr.length !== 0){
				key_arr.map(function(value, index){
					a_int = a_int[value];
					b_int = b_int[value];
				})

				if(a_int.indexOf(":") !== -1){
					a_int = Conf.getMinutes(a_int);
				}
				if(b_int.indexOf(":") !== -1){
					b_int = Conf.getMinutes(b_int);
				}
			}
			else{
				a_int = a_int[key];
				b_int = b_int[key];
			}

			if(type == 'dsc'){
				return b_int - a_int;
			} 
			else{
				return a_int - b_int;
			}
		})
		
		return sort_data;
	}

	// sort by String Character
	// type : "asc/dsc", data : "data to sort", key : "key of the value in data"
	// returns Character value sorted data
	static StringValue(type, data, key){
		var sort_data = data;
		sort_data.sort((a, b) => {
			if (type == 'desc') {
				return (b[key] > a[key]) ? 1 : -1;
			} else {
				return (b[key] < a[key]) ? 1 : -1;
			}
			return 0;
		})
		
		return sort_data;
	}
}