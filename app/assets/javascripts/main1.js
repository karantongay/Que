
// Create a modal view class
var Modal = Backbone.Modal.extend({
  template: '#modal-template',
  cancelEl: '.bbm-button',
});
function modalOpen(){
  // Render an instance of your modal
  var modalView = new Modal();
  $('.app').html(modalView.render().el);
}


// Globals //

var loginemail = "";

function onFollow(ele){
	console.log(ele.id);
}

var Question = Backbone.Model.extend({

	idAttribute: "reg",

	urlRoot: "/api/questions",

	validate: function(attrs){
		if (!attrs.title)
			return "Question is not valid.";
	},

	start: function(){
		console.log("Question started.");
	}
});

var Questions = Backbone.Collection.extend({
	//Model: Question
});

var QuesDesc = Backbone.Model.extend({

idAttribute: "id",

urlRoot: '/questions'

});


var AnsModel = Backbone.Model.extend({

	//urlRoot: '/api/app/answers',
	defaults: {
	poster: "this is Title",
	contents: "contents go here",
	answeredby: "test@test.com",
	}

});


var newQuesModel = Backbone.Model.extend({

	urlRoot: '/api/questions/',
	defaults: {
	title: "this is Title",
	contents: "contents go here",
	askedby: "test@test.com",
	}

});


var QuesCollection = Backbone.Collection.extend({
    id: '',
    model: QuesDesc,  
    url: function () {
        return '/app/#qview/' + this.id;
    }
});


var Car = Question.extend({
	start: function(){
		
	}
});

/* Creating View */

var QuestionView = Marionette.CollectionView.extend({
	tagName: "tr",

	className: "question", //->

	events: {
		"click .delete": "onDelete",
		"click .view" : "onView"
	},
	initialize: function(){
		this.template = _.template($('#questionTemplate').html());
		this.$el.html(this.template(this.model.toJSON()));
		this.$el.attr("data-color", this.model.get("color"));

	},

	render: function() {
		
		this.$el.append("<td>" + this.model.get("title") +"</td>");
		this.$el.append("<td>" + this.model.get("askedby") +"</td>");
		this.$el.append("<td><button class='view btn btn-success' id=" + this.model.get("id") + ">View</button></td>");

		return this;
	},

	onDelete: function(){
		this.remove();
	},

	onView: function(){
		//routing.router.flash({id: this.model.get("id")}).navigate('qview', {trigger: true});
		router.navigate("/qview/" + this.model.get("id"),true);
		//window.location = "/app/#qview/" + this.model.get("id");
	},
	
});

var quesid = 0;
var QuesDescView = Marionette.CollectionView.extend({

// Contents for displaying the question description goes here

events: {
"click #delete_question" : "deleteQues",
"click #submitanswer" : "submitAns",
"click .deleteAns" : "deleteAnswer"
},

submitAns: function(){

	if ($("#anscontents").val().length < 5)
	{
		modalOpen();
		$(".bbm-modal__title").html("Information!");
		$(".bbm-modal__section").html("Answer Should be Minimum of 5 Characters");
		return;
	}
	nqm = new AnsModel({poster: $("#email").val(), contents: $("#anscontents").val(), answeredby: "" + $("#email").val()});
		console.log(nqm);	
		console.log("Attempting to save");
		nqm.save({},
			{
			url: "/questions/" + quesid + "/answers"
			},
			{
				dataType: 'text'
			},
			{
				success: function()
				{
					console.log("Model Saved");
				},
				error: function(model,xhr,options)
				{
					console.log("Somthing Went Wrong");
				}
			});
		//router.viewQuesDesc(new QuesDescView({id: quesid}));
		//router.navigate("#qview/" + quesid,true);
		//router.viewQuesDesc(quesid);
		//router.navigate(new QuesDescView({quesid}));
		myController.loadView(new QuesDescView(quesid));
		//console.log("refreshed");
		
        	// this.QuesDescView().remove();
        
		
		//$("#cont").html(viewQuesDesc().show().$el);
		//this.show();

},

deleteAnswer: function(e){

	console.log("Deleting");
	var ele = $(e.currentTarget);
	//console.log(ele.attr('id'));
	ques = new AnsModel({id: ele.attr('id')});
	$(".bbm-modal__title").html("Alert");
	ques.destroy({
		url: "/questions/" + quesid + "/answers" + "/" + ele.attr('id'),
		success: function () {
		    console.log("success");
		    modalOpen();
		  	$(".bbm-modal__title").html("Success!");

		  	$(".bbm-modal__section").html("Your answer deleted successfully!");

		  },
		  error: function(e){
		  	//alert("You cannot delete someone else's answer!");

		  	modalOpen();
		  	$(".bbm-modal__title").html("Information");

		  	$(".bbm-modal__section").html("You cannot delete the answer submitted by another User!");

		  	//$('.open').click();
		  }});

	if (this._currentView) {
			this._currentView.remove();
		}
	//router.loadView(new QuesDescView({quesid}));
	myController.loadView(new QuesDescView(quesid));
},

initialize: function (options) {
		
        this.ques = new QuesCollection();
        this.ques.id = options.quesid;
        this.ques.fetch();
        quesid = this.ques.id;	

        this.$el.empty();

        this.show(quesid);
    },

deleteQues: function()
{
	console.log("Deleting");
	ques = new QuesDesc({id: quesid});
	//_.invoke(this.ques, 'destroy');
	//q = new QuesDesc();
	ques.destroy({
		url: "/questions/" + quesid,
		dataType: 'json',
		success: function () {
		   
		   alert("Your Question deleted successfully!");
		   //  modalOpen();
		  	// $(".bbm-modal__title").html("Success!");

		  	// $(".bbm-modal__section").html("Your Question deleted successfully!");

		    router.navigate("#qfeed");
			//Backbone.history.loadUrl();
			window.location.reload();
		  },
		  error: function(e){
		  	//alert("You cannot delete someone else's question!")
		  	modalOpen();
		  	$(".bbm-modal__title").html("Information");

		  	$(".bbm-modal__section").html("You cannot delete the Question submitted by another User!");

		  }});
	//router.navigate("#qfeed",true);
	
	//this.remove();
	//return false;
},

show: function(quesid){
	$(".viewheader").html("View Question");
	this.ques = new QuesCollection();
	var q = new Question();
		var item1 = [];
		$.ajax({
		  url: '/questions/' + quesid,
		  dataType: 'json',
		  async: false,
		  success: function (data) {
		    //questions = new Question.Collections.Questions(data[0]);
		    //var m = new Question(data, {parse: true});
		    for (var i=0; i<data.length; i++)
		    {
		    	item1 = data[i];
		    	//console.log(item1.askedby);
		    		
		    }
		  } });

		//this.$el.html(template(this.model.toJSON()));
		this.$el.append("<h2 class='h2'>Question: " + item1.title + "</h2>");
		this.$el.append("<h4 class='h4'>Asked By: " + item1.askedby + "</h4>");

		this.$el.append("" +
			"<div class='desc' style='background-color: lightblue; height:150px; border-radius:25px; padding: 25px;'>");

		this.$(".desc").append("Description: " + item1.contents +"");
		
		this.$el.append("<div id='formbtn'></div>");

		//this.$("#formbtn").append("<br><a class='btn btn-warning' id='edit_question' rel='nofollow'>Edit This Question</a>");

		this.$("#formbtn").append("<br><a class='btn btn-danger' id='delete_question' rel='nofollow'>Delete This Question</a>");

		this.$el.append("<br><div class='answer' style='background-color:lightblue; height:320px; padding:25px; border-radius:25px;'>");

		$.ajax({
		  url: '/api/questions/senduser',
		  dataType: 'json',
		  async: false,
		  success: function (data) {
		    useremail = data;
		    
		  },
		  error: function(e){
		  	console.log("Error");
		  } });


		this.$(".answer").append("<label>Poster</label><br>" +
			"<input type='text' value=" + useremail + " id='email' class='form-control' readonly='true'><br>" + 
			"<label>Your Answer</label><br>" +
			"<textarea class='form-control' id='anscontents'></textarea><br>" +
			"<button class='btn btn-success' id='submitanswer'>Submit Answer</button>");


		var answers = [];
		var answeredby = [];
		var answereddate = [];
		var answerid = [];

		$.ajax({
		  url: '/questions/' + quesid +'/answers',
		  dataType: 'json',
		  async: false,
		  success: function (data) {
		  	//console.log(data[0]);
		    for(var i=0;i<data[0].length;i++)
		    {
		    	answers[i] = data[0][i].contents;
		    	answeredby[i] = data[0][i].answeredby;
		    	answereddate[i] = data[0][i].created_at;
		    	answerid[i] = data[0][i].id;
		    }
		    
		  },
		  error: function(e){
		  	console.log("Error");
		  } });


		for(var i=0;i<answers.length;i++)
		{
		 this.$el.append("<br><br>" +
		    	"<div class='answer' style='background-color:lightblue; height:220px; padding:20px; border-radius:25px;'>" +
  				   "<p>" +
				    "<strong>Answer: </strong>" +
				    "" + answers[i] +
				  "</p>" +
				  "<br><br>" +
				  "<p>" +
				    "<strong>Poster: </strong>" +
				    "" + answeredby[i] +" | <strong>Answered: </strong>" + answereddate[i] +
				  "</p>" +
				 
				  "<p>" +
				  "<br>" +
				  "<button class='btn btn-danger deleteAns' id='" + answerid[i] + "'>Delete Answer</button>" +
				"</p>" +
				"</div>" + 
		    	"");
		}

		return this;
	}

});

var useremail = "";

var newQues = Marionette.View.extend({

	model: newQuesModel,

	events: {
		"click .delete": "onDelete",
		"click .Show" : "onSubmit"
	},

	render: function(){
		$(".search-results").empty();
		$(".viewheader").html("Ask New Question");
		this.$el.append("<label>Title</label><br>" + 
			"<input type='text' id='title' placeholder='Minimum 5 Characters' class='form-control'><br>" +
			"<label>Description</label>" + 
			"<textarea class='form-control' id='desc' placeholder='Please enter the description'></textarea><br><button class='Show btn btn-success'>Submit Question</button>");
		
		$.ajax({
		  url: '/api/questions/senduser',
		  dataType: 'json',
		  async: false,
		  success: function (data) {
		    useremail = data;
		    
		  },
		  error: function(e){
		  	console.log("Error");
		  } });


		return this;
	},

	onSubmit: function()
	{
		console.log(useremail);
		nqm = new newQuesModel({title: $("#title").val(), contents: $("#desc").val(), askedby: "" + useremail});
		console.log(nqm);	
		console.log("Attempting to save");
		nqm.save({},{
			success: function(model, response, options)
			{
				//modalOpen();
				//$(".bbm-modal__title").html("Success!");

				//$(".bbm-modal__section").html("Your Question Submitted Successfully!");

				
				router.navigate("#qfeed");
				window.location.reload();
				Backbone.history.loadUrl();
				
			},
			error: function(model,xhr,options)
			{
				console.log("Somthing Went Wrong");
				modalOpen();
				$(".bbm-modal__title").html("Information: Something went wrong!");

				$(".bbm-modal__section").html("<p>Please check the following:</p>" +
					"<li>The Title should have more than 5 characters!</li>" +
					"<li>The Description should not be empty and should consist of at the least 5 characters!</li>");
			}
		});

		//console.log($("#title").val());
	}

});


var QuestionsView = Marionette.CollectionView.extend({
	id: "Questions",

	tagName: "table",

	className: "table table-bordered table-hover",

	initialize: function(){
		this.$el.empty();
		$(".search-results").empty();
		$(".viewheader").html("Question Feed");
		this.$el.append("<tr><td>Title</td><td>Asked By</td><td>View Question</td></tr>");
		bus.on("newQuestion", this.onNewQuestion, this);
		this.trigger('reset');
	},

	render: function(){
		var ques = quesview();
		var questions = new Questions(ques);
		questions.each(function(question){
			//this.loadView(new QuestionsView({ collection: questions }));
			var questionView = new QuestionView({ model: question });
			//->
			this.$el.append(questionView.render().$el);
		}, this);
	     

		return this;
	},

});

var HomeView = Marionette.View.extend({
	render: function(){
		this.$el.html("" +
			"<table class='table'><td>Hi</td></table>");
		return this;
	},

});

var viewProfile = Marionette.CollectionView.extend({
	events: {
		"click .gotoquestion": "goToQuestion",
		"click .gotoanswer" : "goToAnswer"
		//"click .Show" : "onSubmit"
	},
	initialize: function()
	{
		this.$el.empty();
		var quesasked = "";
		var answers = "";
		var followers = [];
		var following = [];
		var myquestions = [];
		var myquestionid = [];
		var myanswers = [];
		var myanswerid = [];

		info = {};
		$.ajax({
		  url: '/profiles/',
		  dataType: 'json',
		  async: false,
		  success: function (data) {
		    info = data;
		    
		  },
		  error: function(e){
		  	console.log("Error");
		  } });

		$.ajax({
		  url: '/api/app/senduser',
		  dataType: 'json',
		  async: false,
		  success: function (data) {
		    loginemail = data[0];
		    quesasked = data[1];
		    answers = data[2];
		    //console.log(data);
		  },
		  error: function(e){
		  	console.log("Error");
		  } });

		$.ajax({
		  url: '/api/app/sendfollows',
		  dataType: 'json',
		  async: false,
		  success: function (data) {

		  	for(var i=0;i<data[0].length;i++)
		  	{
		  		followers.push(data[0][i].email);
		  		followers.push("<br>");
		  	}
		  	
		  	for(var i=0;i<data[1].length;i++)
		  	{
		  		following.push(data[1][i].email);
		  		following.push("<br>");
		  	}
		    
		  },
		  error: function(e){
		  	console.log(e);
		  } });


		$.ajax({
		  url: '/api/app/sendquestions',
		  dataType: 'json',
		  async: false,
		  success: function (data) {
		    for(var i=0;i<data[0].length;i++)
		  	{
		  		myquestions[i] = data[0][i].title;
		  		myquestionid[i] = data[0][i].id;
		  		//myquestions.push(data[0][i].title);
		  		//myquestions.push("<br>");
		  	}
		  	
		    
		  },
		  error: function(e){
		  	
		  } });

		$.ajax({
		  url: '/api/app/sendanswers',
		  dataType: 'json',
		  async: false,
		  success: function (data) {
		  	console.log(data[0].contents);
		    for(var i=0;i<data.length;i++)
		  	{
		  		 myanswers[i] = data[i].contents;
		  		 myanswerid[i] = data[i].question_id;
		  		// myanswers.push(data[i][j].title);
		  		// myanswers.push("<br>");
		  	}
		  },

		  error: function(e){
		  	console.log("Error");
		  } });



		this.show(info,loginemail,quesasked,answers,followers,following,myquestions,myanswers,myquestionid,myanswerid);
	},

	show: function(info,loginemail,quesasked,answers,followers,following,myquestions,myanswers,myquestionid,myanswerid){
		$(".viewheader").html("My Profile");
		this.$el.append("" +
			"<div class='col-md-4 content-right' style='float: left;''>" +
					"<div class='cntnt-img'>" +
					"</div>" +
					"<div class='bnr-img'>" +
						"<img src='../assets/profile-img.png' width=165px height=165px alt=''/>" +
					"</div>" +
					"<div class='bnr-text'>" +
						"<h1>Quick Stats</h1>" +
						
					"</div>" +
					"<div class='btm-num'>" +
						"<ul>" +
							"<li>" +
								"<h4>" + info[0] +"</h4>" +
								"<h5>Following</h5>" +
							"</li>" +
							"<li>" +
								"<h4>" + info[1] +"</h4>" +
								"<h5>Followers</h5>" +
							"</li>" +
							"<li>" +
								"<h4>" + info[2] +"</h4>" +
								"<h5>Answers</h5>" +
							"</li>" +
						"</ul>" +
					"</div>" +				
				"</div>" +
				"</center>");

		//console.log(loginemail);
		this.$el.append("" +
			"<div class='col-md-4' style='position:relative; float:left; background-color: lightgreen; padding-top:10px; width: 450px;height: 385px;'>" +
				"<div class='bnr-num'>" +
					"<center><img src='../assets/details-img.png' width=160px height=160px alt=''/>" +
					"<br><br>" +
					"Details</center>" +
					"</div>" +
					"<table class='table'>" +
					"<tr>" +
					"<td>" +
					"Registered Email: " +
					"</td>" +
					"<td>" +
					""+ loginemail +
					"</td>" +
					"</tr>" +
					"<tr>" +
					"<td>" +
					"No of Questions asked: " +
					"</td>" +
					"<td>" +
					"" + quesasked +
					"</td>" +
					"</tr>" +
					"<tr>" +
					"<td>" +
					"No of Questions Answered: " +
					"</td>" +
					"<td>" +
					"" + answers +
					"</td>" +
					"</tr>" +
					"<br>" +
					"</table>" +
					"</div>" +
			"");


		this.$el.append("" +
			"<div class='col-md-2' style='position:relative; float:left; background-color: #b3f2fd; padding-top:10px; width: 310px;height: 200px;'>" +
			"Followers:" +
			"<br><br>" +
			"" + followers.join("") +
			"<br><br><br><br><br><br>" +
			"</div>" +
			"<div class='col-md-2' style='position:relative; border:thin yellow; overflow:auto; float:left; background-color: #b3f2fd; padding-top:10px; width: 310px; height: 185px;'>" +
			"Following:" +
			"<br><br>" +
			"" + following.join("") +
			"</div>" +
			"<div class='clearfix'> </div>" +
			"<br><br>");

		this.$el.append("" +
			"<h3 class='h3'>My Questions</h3>" +
			"<br>");
		for (var i=0;i<myquestions.length; i++)
		{
			this.$el.append("" +
			"<a id=" + myquestionid[i] +" class='gotoquestion'> " + myquestions[i] + "</a>" +
			"<br>");
		}
		this.$el.append("" +
			"<h3 class='h3'>My Answers</h3>" +
			"<br>");
		for (var i=0;i<myanswers.length; i++)
		{
			this.$el.append("" +
			"<a id=" + myanswerid[i] + " class='gotoanswer'>" + myanswers[i] + "</a>" +
			"<br>");
		}

		return this;
	},
	goToQuestion: function(e){
		var t = $(e.target);
		var id = t.attr("id");
		Backbone.history.navigate('qview/' + id, {trigger: true});
	},
	goToAnswer: function(e){
		var t = $(e.target);
		var id = t.attr("id");
		Backbone.history.navigate('qview/' + id, {trigger: true});
	}
});


var viewUsers = Marionette.CollectionView.extend({

events: {
		"click .onfollow": "onFollow",
	},

initialize: function(){
	this.$el.empty();
	var stat = [];
	$.ajax({
		  url: '/api/app/listofusers',
		  dataType: 'json',
		  async: false,
		  success: function (data) {
		  	stat = data[0];
		  },
		  error: function(e){
		  	console.log("Error");
		  } });

this.showusers(stat);
},

showusers: function(stat){
	$(".viewheader").html("All Users");
	this.$el.append("" +
	"<table class='table table-fixed' id='userstable'>" +
		"<tr>" +
		"<td>User</td>" +
		"<td>Follow / Unfollow</td>" +
		"</tr>");
	for (var i=0;i<stat.length;i++)
	{
	this.$("#userstable").append("" +
		"<tr>" +
		"<td>" +
		  "" + stat[i].email +
		"</td>" +
		"<td>" +
		"<button class='btn btn-success onfollow' username=" + stat[i].email +" id='" + stat[i].id + "' status=" + stat[i].follow + ">" + stat[i].follow + "</button>" +
		"</td></tr>");
	}
	this.$el.append("</table>");
	//debugger;
	return this;
},
	onFollow: function(e){
		var ele = $(e.currentTarget);
		console.log(ele.attr('id'));
		console.log(ele.attr('status'));
		if (ele.attr('status') === "Follow")
		{
		$.ajax({
		  url: '/users/' + ele.attr('id') + '/follow',
		  dataType: 'json',
		  async: false,
		  success: function (data) {
		  	console.log(data);
		  	console.log("Followed");
		  	modalOpen();
				$(".bbm-modal__title").html("Great!");

				$(".bbm-modal__section").html("You are now following " + ele.attr('username'));
		    
		  },
		  error: function(e){
		  	//console.log(e);
		  } });

		//Backbone.history.navigate("/app/viewUsers");
		this.initialize();
		//router.viewUsers();
		// /window.location.reload();
		}
		if (ele.attr('status') === "Unfollow")
		{
		$.ajax({
		  url: '/users/' + ele.attr('id') + '/unfollow',
		  dataType: 'json',
		  async: false,
		  success: function (data) {
		  	console.log("Unfollowed");
		  	modalOpen();
				$(".bbm-modal__title").html("Information!");

				$(".bbm-modal__section").html("You are now unfollowing " + ele.attr('username'));
		    
		    
		  },
		  error: function(e){
		  	//console.log(e);
		  } });

		//router.viewUsers();
		this.initialize();
		//window.location.reload();

		}

	}

});

function quesfeed()
{

}

var MyController = Marionette.Object.extend({

  initialize: function(){
  	console.log("Init");
  },
  viewUsers: function(){
  		//debugger;
  		// var view1 = new viewUsers();

		this.loadView(new viewUsers());

		console.log("Hi");
	},

	viewProfile: function(){
		this.loadView(new viewProfile());
	},

	viewQuesDesc: function(id){
		this.loadView(new QuesDescView({quesid: id}));
	},

	newQues: function(){
		this.loadView(new newQues());
	},

	viewFeed: function(){
		//var ques = quesview();
		//var questions = new Questions(ques);
		//this.loadView(new QuestionsView({ collection: questions }));
		this.loadView(new QuestionsView());
		//Backbone.history.loadUrl();

	},

	viewHome: function(){
		this.loadView(new HomeView());
	},

	loadView: function(view){
		// If the currentView is set, remove it explicitly.
		if (this._currentView) {
			//debugger;
			this._currentView.remove();
		}
		$("#cont").html(view.render().el);
		
		this._currentView = view;
	},

	defaultRoute: function(){
		console.log("Default");
	}
});

var AppRouter = Backbone.Marionette.AppRouter.extend({
	appRoutes: {
		
		"qfeed": "viewFeed",
		"newq": "newQues",
		"qview/:id": "viewQuesDesc",
		"profile": "viewProfile",
		"users": "viewUsers",
		"*default": "viewFeed"
	},
 
});

var bus = _.extend({}, Backbone.Events);

myController = new MyController();
var router = new AppRouter({controller: myController});

var App = Backbone.Marionette.Application.extend({
	onStart: function(app,options) {
    Backbone.history.start();
    console.log("started");
  },

});

var app = new App();


//app.start();
// var router = new AppRouter();


var NavView = Marionette.View.extend({
	events: {
		"click": "onClick"
	},

	onClick: function(e){
		var $li = $(e.target);
		router.navigate($li.attr("data-url"), { trigger: true });
	}
});


var navView = new NavView({ el: "#nav" });

 $(document).ready(function(){
 	app.start();
 	$('a').click(function(e){
 		e.preventDefault();
 		//Backbone.history.navigate("/app/qfeed", {trigger: true});
 		var t = $(e.target);
 		Backbone.history.navigate(t.attr("data-url"), {trigger: true});
 	})
 });


 function quesview()
 {
 	var ques = [];
 	$.ajax({
		  url: '/questions',
		  dataType: 'json',
		  async: false,
		  success: function (data) {
		    //questions = new Question.Collections.Questions(data[0]);
		    var m = new Question(data, {parse: true});
		    for (var i=0; i<data.length; i++)
		    {
		    	var items = data[i];
		    		for (var j=0;j<items.length;j++)
		    		{
		    			item = items[j];
		    			//console.log(item.title);
		    			//console.log(item.askedby);
		    			var c = new Car({title: item.title, askedby: item.askedby, id: item.id});
		    			ques.push(c);
		    			//console.log(item);

		    		}
		    }
		  } });
 	return ques;
 }