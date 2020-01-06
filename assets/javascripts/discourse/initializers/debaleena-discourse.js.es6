import { withPluginApi } from "discourse/lib/plugin-api";
import User from "discourse/models/user";
function initializePlugin(api) {
	api.modifyClass('component:user-card-contents', {
		_showCallback(username, $target) {
			if(this.siteSettings.redirect_on_profile_picture){
				var redirectUrl  =  this.siteSettings.redirect_avataar_external_website;
				window.location.assign(redirectUrl.replace("{username}", username ))
				return false;	
			}else{
				return this._super(username, $target);
			}
		}
	});
	api.modifyClass('controller:user-card', {
		actions: {
			showUser(user) {
				if(this.siteSettings.redirect_on_profile_picture){
					var redirectUrl  =  this.siteSettings.redirect_avataar_external_website;
					window.location.assign(redirectUrl.replace("{username}", user.username ))	
				}else{
					this._super(user);	
				}
				
			}
		}
	});
	api.modifyClass('route:about', {
		model() {
			if(this.currentUser && this.currentUser.admin){
				this._super();
			}else{
				this.replaceWith("discovery.latest")
			}
		}
	});
	api.modifyClass('route:users', {
		beforeModel() {
			if(this.currentUser && this.currentUser.admin){
				this._super();
			}else{
				this.replaceWith("discovery.latest")
			}
		}
	});
}
export default {
	name: "debaleena-discourse.js",
	initialize() {
		withPluginApi("0.1", initializePlugin);
	}
};