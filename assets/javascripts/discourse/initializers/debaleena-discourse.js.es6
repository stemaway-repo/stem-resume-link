import { withPluginApi } from "discourse/lib/plugin-api";
import User from "discourse/models/user";
function initializePlugin(api) {
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
