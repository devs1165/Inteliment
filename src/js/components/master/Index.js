import React from 'react';
import { connect } from 'react-redux';
import { hashHistory, Link } from 'react-router';
import { push } from 'react-router-redux';
import cookie from 'react-cookie';
import { UserLogout } from './../../actions/userAction';
import { setUser } from './../../actions/userAction';

// component
import SideNav from './SideNav';

// processes
import SortBy from './../../res/Processes/SortBy';

@connect((store) => {
   return {
      user : store.user.user,
      login : store.user.login,
      logout : store.user.logout,
      currentLocation : store.routing.locationBeforeTransitions,
   }
})

class Index extends React.Component {
	constructor(props){
		super(props);
      this.state = {
         currentLocation:this.props.currentLocation.pathname,
         confirmation:false,
         permissions : [],
         user:(this.props.user !== undefined) ? this.props.user : "User",
         sidenav : false,
      }

      this.openMenu = this.openMenu.bind(this);
      this.closeMenu = this.closeMenu.bind(this);
   }

   // when component has been mounted do the following
   componentDidMount(){
      // matching store and cookie
      if(Object.keys(this.props.user).length == 0 && Object.keys(cookie.load('reckouser')).length !== 0){
         // this.props.dispatch(setUser(cookie.load('reckouser')));
      }
      else if(Object.keys(this.props.user).length == 0 && Object.keys(cookie.load('reckouser')).length == 0){
         this.redirect('/');
      }
   }

   // check for if user is logged in or not
   componentWillMount(){
      if((cookie.load('reckouser') == undefined && this.props.login == false) || cookie.load('reckouser') == undefined){
         this.redirect('/');
      }
   }

   // user login validation
   componentWillReceiveProps(nextProps){
      if(this.props.logout !== nextProps.logout && nextProps.login == null && nextProps.logout == true){
         cookie.remove('reckouser', { path: '/' });
         this.redirect('/');
      }

      // calendar status
      if(this.props.calendar_status !== nextProps.calendar_status){
         this.setState({
            calendar_status : nextProps.calendar_status
         })
      }

      if(this.props.currentLocation.pathname !== nextProps.currentLocation.pathname){
         this.setState({
            currentLocation : nextProps.currentLocation.pathname
         })
      }

      // user
      if(this.props.user !== nextProps.user){
         this.setState({
            user : nextProps.user
         })
      }

      // user_permissions
      if(this.props.user_permissions !== nextProps.user_permissions){
         var hubs = JSON.parse(nextProps.user_permissions.objects[0].allowed_hubs);
         var sorted_arr = SortBy.StringValue('inc', hubs, 1);
         this.setState({
            permissions : sorted_arr
         })
      }
   }

   // redirecting routes
   redirect(path){
      if(hashHistory.getCurrentLocation().pathname !== path){
         hashHistory.push(path);
      }
   }

   // logout
   logout(){
      this.props.dispatch(UserLogout());
   }

   // hide and show logout confirmation dialog
   confirmation(type){
      if(type == "show"){
         this.setState({
            confirmation:true
         })
      }
      else{
         this.setState({
            confirmation:false
         })
      }
   }

   Menu(){
      if(this.state.sidenav == false){
         this.openMenu()
      }
      else{
         this.closeMenu();

      }
   }

   openMenu(){
      this.refs.sidenav_menu.openMenu();
      this.setState({
         sidenav : true
      })
      
      document.addEventListener('click', this.closeMenu)
   }

   closeMenu(event){
      this.refs.sidenav_menu.closeMenu(event);
      this.setState({
         sidenav : false
      })
      
      document.removeEventListener('click', this.closeMenu);
   }

	render() {
      let confirmation_dialog;
      if(this.state.confirmation == true){
         confirmation_dialog = (
            <LogoutConfirmation onConfirm={this.logout.bind(this)} cancel={this.confirmation.bind(this)} logoff={this.logout.bind(this)}/>
         )
      }
      else{
         confirmation_dialog = null;
      }

   	return (
      	<div className="container-fluid dashboard-container">
            {confirmation_dialog}
            <SideNav ref="sidenav_menu" display={this.state.sidenav}/>
            <Navbar 
               onlogout={this.confirmation.bind(this)}
               currentRoute = {this.state.currentLocation}
               user = {this.state.user}
               openMenu = {this.Menu.bind(this)}
            />
            <Body>{this.props.children}</Body>
      	</div>
   	);
   }
}

// Logout Confirmation Component
class LogoutConfirmation extends React.Component{
   constructor(props){
      super(props);

      this.state = {
         showLoader:false,
      }
   }

   hide(){
      this.props.cancel("hide")
   }

   logoff(){
      this.refs['logout_confirmation_popup'].style.display = "none";
      this.setState({
         showLoader:true
      })
      this.props.onConfirm();
   }

   render(){
      let center_body;
      if(this.state.showLoader == true){
         center_body = (
            <div ref="logoff_loader" className="logoff-loader">

            </div>
         )
      }
      else{
         center_body = null;
      }

      return(
         <div className="logout-confirmation-container">
             <div ref="logout_confirmation_popup" className="logout-confirmation-popup">
               <div className="logout-confirmation-popup-icon">
                  <div className="logout-confirmation-popup-icon-image center-block">
                  </div>
               </div>
               <div className="logout-confirmation-popup-text">Are your sure you want to log off?</div>
               <div className="logout-confirmation-popup-controls">
                  <div className="logout-confirmation-popup-controls-cancel" onClick={this.hide.bind(this)}>Cancel</div>
                  <div className="logout-confirmation-popup-controls-logoff" onClick={this.logoff.bind(this)}>Log off</div>
               </div>
            </div>
            {center_body}
         </div>
      )
   }
}

// navbar component
class Navbar extends React.Component{
   constructor(props){
      super(props);

      this.state = {
         items : [
            
         ],
         currentRoute : this.props.currentRoute,
         hubs : [],
         active_hub : this.props.activeHub,
         user: (this.props.user !== undefined) ? this.props.user : null,
      }
   }

   componentWillReceiveProps(nextProps){
      if(this.props.currentRoute !== nextProps.currentRoute){
         this.setState({
            currentRoute : nextProps.currentRoute
         })
      }

      // hubs
      if(this.props.hubs !== nextProps.hubs){
         this.setState({
            hubs : nextProps.hubs
         })
      }

      // user
      if(this.props.user !== nextProps.user){
         this.setState({
            user : nextProps.user
         })
      }

      // active hub
      if(this.props.activeHub !== nextProps.activeHub){
         this.setState({
            active_hub : nextProps.activeHub
         })
      }
   }

   logout(){
      this.props.onlogout("show");
   }

   openMenu(){
      this.props.openMenu();
   }

   render(){

      var arr = [];
      this.state.items.map(function(value, index){
         var item_obj = Object.assign({}, value);

         if(value.route == this.state.currentRoute || value.route == this.state.currentRoute+"/" || this.state.currentRoute.includes(value.route)){
            item_obj.status = "active";
         }
         else{
            item_obj.status = "inactive";
         }
         arr.push(item_obj);
      }.bind(this));

      var hubs = this.state.hubs;
      var user = (this.state.user !== null && Object.keys(this.state.user).length !== 0) ? this.state.user.role : "User";

      return(
         <div className='row-fluid navbar-container'>
            <div className='col-md-2 col-sm-2 col-xs-2  navbar-logo'>
               <Logo openMenu={this.openMenu.bind(this)}/>
            </div>
            <div className='col-md-5 col-sm-5 col-xs-5 navbar-menu-container'>
               <Menu items={arr}/>
            </div>
            <div className="col-md-3 col-sm-3 col-xs-3 navbar-calendar">
               
            </div>
            <div className="col-md-2 col-sm-2 col-xs-2 navbar-logout-button">
               <Logout onClick={this.logout.bind(this)} />
            </div>
         </div>
      )
   }
}

// Body Component
class Body extends React.Component{
   constructor(props){
      super(props);
   }
   render(){
      return(
         <div className='row-fluid body-container'>
            {this.props.children}
         </div>
      )
   }
}

// Logo
class Logo extends React.Component{
   constructor(props){
      super(props);
   }

   openMenu(){
      this.props.openMenu();
   }

   render(){
      return(
         <div onClick={this.openMenu.bind(this)} className="logo-container">
         </div>
      )
   }
}

// Logout Button
class Logout extends React.Component{
   constructor(props){
      super(props);
   }
   logout(){
      this.props.onClick();
   }
   render(){
      var icon = ("./../../../img/cubito-master/logout.svg");
      return(
         <div className="logout-button-container">
            <div className="logout-button-text-container" onClick={this.logout.bind(this)}>
               <div className="logout-button-elements">
                  <img src={icon} className="logo-button-icon" width="22"/>
               </div>
            </div>
         </div>
      )
   }
}

// Menu Items
class Menu extends React.Component{
   constructor(props){
      super(props);

      this.state = {
         items : (this.props.items !== undefined) ? this.props.items : [],
      }
   }

   componentWillReceiveProps(nextProps){
      if(this.props.items !== nextProps.items){
         this.setState({
            items : nextProps.items
         })
      }
   }

   active(item){
      this.refs[item].className = "menubar-item-active";
      this.state.items.map(function(value,index){
         var name="menuitem"+index;
         if(name != item){
            this.refs[name].className = "menubar-items";
         }
      }.bind(this))
   }

   render(){
      return(
         <div className="container-fluid menubar-container">
         {
            this.state.items.map(function(value, index){
               var name = "menuitem"+index;

               if(value.status == "active"){
                  return(
                     <Link key={index} to={value.route}>
                        <div key = {index} ref={name} className="menubar-item-active" onClick={this.active.bind(this, name)}>
                           {value.title}
                        </div>
                     </Link>
                  )
               }
               else{
                  return(
                     <Link key = {index} to={value.route}>
                        <div key = {index} ref={name} className="menubar-items" onClick={this.active.bind(this, name)}>
                           {value.title}
                        </div>
                     </Link>
                  )
               }
            }.bind(this))
         }
         </div>
      )
   }
}

export default Index;