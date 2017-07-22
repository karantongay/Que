var MyController = Marionette.Object.extend({
	viewFeed: function() {
  	console.log("Hi");
  },
})
var AppRouter = Marionette.AppRouter.extend({
	appRoutes: {
		
		"app/qfeed": "viewFeed",
	}
})
var App = Mn.Application.extend({
	onStart: function(app,options) {
		myController = new MyController();
    router = new AppRouter({controller: myController});
    Backbone.history.start({pushState: true});
	}
})
$(document).ready(function(){
	var app = new App();
	app.start();
});