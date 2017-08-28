import React from 'react';
import Conf from './../../res/Conf';

export default class SideNav extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			submenu_item : null
		}

		this.openMenu = this.openMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
	}

	openMenu(id){
		this.refs.sidenav_container.style.left = "0px";
	}

	closeMenu(event){
		if (event!=undefined) {
			if(event.target.id !== "side_menu_item"){
				this.refs.sidenav_container.style.left = "-200px";
			}		
		}
	}

	expand(menu){
		if(menu == "menu1"){
			if(this.state.submenu_item !== "menu1"){
				// expand
				this.setState({
					submenu_item:menu
				})

				this.refs['menu_sub_item1'].style.display = "block";
				this.refs['menu_sub_item2'].style.display = "none";
				this.refs['menu_sub_item3'].style.display = "none";
			}
			else {
				// collapse
				this.setState({
					submenu_item: null
				})

				this.refs['menu_sub_item1'].style.display = "none";
			}
		}
		else if(menu == "menu2"){
			if(this.state.submenu_item !== "menu2"){
				// expand
				this.setState({
					submenu_item:menu
				})

				this.refs['menu_sub_item2'].style.display = "block";
				this.refs['menu_sub_item1'].style.display = "none";
				this.refs['menu_sub_item3'].style.display = "none";
			}
			else {
				// collapse
				this.setState({
					submenu_item: null
				})

				this.refs['menu_sub_item2'].style.display = "none";
			}
		}
		else if(menu == "menu3"){
			if(this.state.submenu_item !== "menu3"){
				// expand
				this.setState({
					submenu_item:menu
				})

				this.refs['menu_sub_item3'].style.display = "block";
				this.refs['menu_sub_item1'].style.display = "none";
				this.refs['menu_sub_item2'].style.display = "none";
			}
			else {
				// collapse
				this.setState({
					submenu_item: null
				})

				this.refs['menu_sub_item3'].style.display = "none";
			}
		}
	}

	route(route){
		if(route == "team"){
			Conf.redirect('dashboard/invoice/team');
		}else if(route == "profile"){
			Conf.redirect('dashboard/invoice/profile');
		}else if(route == 'contact'){
			Conf.redirect('dashboard/invoice/contact');
		}
	}

	render(){
		return(
			<div id="side_menu_item" ref="sidenav_container" className="sidenav-container">
				<div>
					<div id="side_menu_item" className="sidemenu-row-container" onClick={this.expand.bind(this, "menu1")}>
						<div id="side_menu_item" className="sidemenu-row">
							Menu1
						</div>
					</div>
					<div ref="menu_sub_item1" className="side-menu-sub-menu">
						<ul type = "none">
							<li onClick={this.route.bind(this, "team")}>Team</li>
							<li onClick={this.route.bind(this, "profile")}>Profile</li>
							<li onClick={this.route.bind(this, "contact")}>Contact</li>
						</ul>
					</div>
				</div>
				<div>
					<div id="side_menu_item" className="sidemenu-row-container" onClick={this.expand.bind(this, "menu2")}>
						<div id="side_menu_item" className="sidemenu-row">
							Menu2
						</div>
					</div>
					<div ref="menu_sub_item2" className="side-menu-sub-menu">
						<ul type = "none">
							<li>Menu</li>
							<li>Menu</li>
							<li>Menu</li>
						</ul>
					</div>
				</div>
				<div>
					<div id="side_menu_item" className="sidemenu-row-container" onClick={this.expand.bind(this, "menu3")}>
						<div id="side_menu_item" className="sidemenu-row">
							Menu3
						</div>
					</div>
					<div ref="menu_sub_item3" className="side-menu-sub-menu">
						<ul type = "none">
							<li>Menu</li>
							<li>Menu</li>
							<li>Menu</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}