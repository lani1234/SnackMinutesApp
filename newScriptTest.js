//GLOBAL VARIABLES
var weight;
var activityName;
var met;
var foodName;
var currentCalories;//will change each time new food chosen
var totalCalories=0;
var servingSize;
var servings;



/***************create weight list*********************************/
//$(function ($) {
$(document).ready(function(){	
	var list = $("<ul></ul>").attr("id", "weightList")
							 .attr("class", "weightList")
							 .attr("data-role","listview") 
							 .attr("data-filter","true")
							 .attr("data-inset","true")
							 .attr("data-icon","false")
							 .attr("data-filter-placeholder","Scroll or Type & Select");
	for(var i=100; i<=500; i++)
    {
    	var item = $("<li><a class=\"wrap\" href=#>"+i+"</a></li>").attr("value", i);
    	//var item = $("<li>"+i+"</li>").attr("value", i);
    	list.append(item);
    }
    $("#weightListDiv").append(list);
    
});

/***************create activity list*********************************/
//$(function ($) {
$(document).ready(function(){	
	var list = $("<ul></ul>").attr("id", "activityList")
	 						 .attr("class", "activityList")
	 						 .attr("data-role","listview") 
	 						 .attr("data-filter","true")
	 						 .attr("data-inset","true")
							 .attr("data-icon","false")
							 .attr("data-filter-placeholder","Scroll or Type & Select");
	var arrayOfObjects=[];
	$.ajax({
	type: "GET",
	url: "activities2.js",
	dataType: "text",
	success: function(data) {
								data = $.csv.toArrays(data);
								arrayOfObjects = new Array();
								for(var i=0; i<data.length; i++)
								{
									var activityObject = new Object();
									activityObject.label = data[i][0];
									activityObject.met = data[i][1];
									arrayOfObjects.push(activityObject);
								}
								
								for(var i=0; i<arrayOfObjects.length; i++)
								{
									var val = JSON.stringify(arrayOfObjects[i]);
									var item = $("<li><a class=\"wrap\" href=#>"+arrayOfObjects[i].label+"</li>").attr("value", val);
								    list.append(item);
								}
							}	
	});
	$("#activityListDiv").append(list);
});


/***************create food list*********************************/
//$(function ($) {
$(document).ready(function(){
	var list = $("<ul></ul>").attr("id", "foodList")
							 .attr("class", "foodList")
							 .attr("data-role","listview") 
							 .attr("data-filter","true")
							 .attr("data-inset","true")
							 .attr("data-icon","false")
							 .attr("data-filter-placeholder","Scroll or Type & Select");
	
	var arrayOfObjects=[];
	$.ajax({
	type: "GET",
	url: "foodDbNoDuplicates.js",
	//url: "foodDb.js",
	dataType: "text",
	success: function(data) {
								data = $.csv.toArrays(data);
								arrayOfObjects = new Array();
								for(var i=1; i<data.length; i++)//skipping over header
								{
									 var foodObject = new Object();
									 foodObject.label = data[i][1];
									 foodObject.weight = data[i][2];
									 foodObject.servingSize = data[i][3];
									 foodObject.calories = data[i][4];
									 arrayOfObjects.push(foodObject);
								}
								
								for(var i=0; i<arrayOfObjects.length; i++)
								{
									var val = JSON.stringify(arrayOfObjects[i]);
									var item = $("<li><a class=\"wrap\" href=#>"+arrayOfObjects[i].label+"</li>").attr("value", val);
								    list.append(item);
								}
							}	
	});
	$("#foodListDiv").append(list);
});

/***************create servings list*********************************/
//$(function ($) {
$(document).ready(function(){	
	var list = $("<ul></ul>").attr("id", "servingsList")
							 .attr("class", "servingsList")
							 .attr("data-role","listview") 
							 .attr("data-filter","true")
							 .attr("data-inset","true")
							 .attr("data-icon","false")
							 .attr("data-filter-placeholder","Scroll or Type & Select");
	for(var i=1; i<=100; i++)
  {
  	var item = $("<li><a class=\"wrap\" href=#>"+i+"</a></li>").attr("value", i);
  	//var item = $("<li>"+i+"</li>").attr("value", i);
  	list.append(item);
  }
  $("#servingsListDiv").append(list);
  
});

/*==========================================================================*/


/*==========================================================================*/
/**** when click on weight div, go to weight list - which takes up page 2 *****/
$(document).ready(function(){
	$(document).on('tap', '#weightDiv', function(e){
		  //clear search filter
		  $('#weightListDiv input[data-type="search"]').val('');
		  $('#weightListDiv input[data-type="search"]').trigger("keyup");
		  
		  $("#a2").click();
		  e.preventDefault();		  
	});
});


/***** when click on activity div, go to activity list - which takes up page 3 ****/
$(document).ready(function(){
	$(document).on('tap', '#activityDiv', function(e){
		  //clear search filter
		  $('#activityListDiv input[data-type="search"]').val('');
		  $('#activityListDiv input[data-type="search"]').trigger("keyup");
		  
		  $("#a3").click();
		  e.preventDefault();
	});
});

/***** when click on food div, go to food list - which takes up page 4 ****/
$(document).ready(function(){
	$(document).on('tap', '#foodDiv', function(e){
		  //clear search filter
		  $('#foodListDiv input[data-type="search"]').val('');
		  $('#foodListDiv input[data-type="search"]').trigger("keyup");
		  $("#a4").click();  
		  e.preventDefault();
	});
});

/***** when click on servings div, go to servings list - which takes up page 5 ****/
$(document).ready(function(){
	$(document).on('tap', '#numberOfServingsDiv', function(e){
		  //window.location = "#page4Id";
		  $("#a5").click();  
		  e.preventDefault();
	});
});

/***** when click on calculate div... ****/
$(document).ready(function(){
	$(document).on('tap', '#calculateDiv', function(e){
		  //alert("weight = "+weight + "\nactivity = "+activityName + "\nfood = "+foodName + "\nservings = "+servings);
		  if(weight===undefined || weight==null)
			  alertify.alert("You must select your weight.");
		  else if(activityName===undefined || activityName==null)
			  alertify.alert("You must select an activity.");
		  else if(foodName===undefined || foodName==null)
			  alertify.alert("You must select a snack.");
		  else if(servings===undefined || servings==null)
			  alertify.alert("You must select the number of servings.");
		  else
		  {
			  //alert("calories = "+currentCalories+"\nweight = "+weight+"\nmet = "+met);
			  var minutes = Math.round((currentCalories/((weight/2.2)*met*.017)) * 100) / 100;
			  $("#snackMinutesDiv").html("<p>"+minutes+"<br />Snack<br />Minutes!</p>");
			  $("#a6").click(); 
			  e.preventDefault();
		  }
		  
	});
});
/*==========================================================================*/


/*==========================================================================*/
/**** After selecting a weight, go back to page1 and show weight in weight div ****/
$(document).ready(function(){
	$(document).on('tap', 'ul.weightList li', function(){ 
			     //alert($(this).attr('value'));
			     weight=($(this).attr('value'));
			     //$("#weightDiv").text(weight);
			     $("#weightDiv").html("<p>"+weight+"</p>");
			     //$("#weightLink").text(weight);
			     //window.location = "#page1Id";
			     $("#a1").click();
			     //preventDefault();
	});
});


/***** After selecting an activity, go back to page1 and show activity in activity div *****/
$(document).ready(function(){
	$(document).on('tap', 'ul.activityList li', function(){
			     //alert($(this).attr('value'));
			     selected = JSON.parse($(this).attr('value'));
			     activityName=selected.label;
			     met = selected.met;
			     //$("#activityDiv").text(selected.label);
			     $("#activityDiv").html("<p>"+selected.label+"</p>");
			     //window.location = "#page1Id";
			     $("#a1").click();
			     //preventDefault();
		
	});
});

/***** After selecting an food, go back to page1 and show food in food div  *****/
/***** and serving size in serving size div                                 *****/
$(document).ready(function(){
	$(document).on('tap', 'ul.foodList li', function(){
			     selected = JSON.parse($(this).attr('value'));
			     //alert(selected.label+"\n"+selected.weight+"\n"+selected.servingSize+"\n"+selected.calories);
			     foodName=selected.label;
			     currentCalories = selected.calories;
			     servingSize = selected.servingSize;
			     //$("#servingSizeDiv").text("Serving size:\n"+selected.servingSize);
			     //$("#foodDiv").text(selected.label);
			     $("#foodDiv").html("<p>"+selected.label + "<br />Serving Size: "+selected.servingSize+"</p>");
			     //window.location = "#page1Id";
			     //testing flowtype
			     //$("#foodDiv").flowtype();
			     $("#a1").click();
			     //preventDefault();
		
	});
});

/**** After selecting a number of servings, go back to page1 and show servings in servings div ****/
$(document).ready(function(){
	$(document).on('tap', 'ul.servingsList li', function(){ 
			     //alert($(this).attr('value'));
			     servings=($(this).attr('value'));
			     $("#numberOfServingsDiv").html("<p>"+servings+"</p>");
			     //$("#weightLink").text(weight);
			     //window.location = "#page1Id";
			     $("#a1").click();
			     //preventDefault();
	});
});
/*==========================================================================*/


/***** when clicking on back button go back to page 1 and refresh everything *****/
$(document).ready(function(){
	//$(document).on('tap', '#backButton', function(){
	$(document).on('tap', '#tryAnotherSnackDiv', function(){
			weight=null;
			activityName=null;
			met=null;
			foodName=null;
			currentCalories=null;//will change each time new food chosen
			totalCalories=0;
			servingSize=null;
			servings=null;
			//clear search filters
			$("#weightList").attr("data-filter-placeholder","Scroll or Type & Select");
			$("#activityList").attr("data-filter-placeholder","Scroll or Type & Select");
			$("#foodList").attr("data-filter-placeholder","Scroll or Type & Select");
			$("#servingsList").attr("data-filter-placeholder","Scroll or Type & Select");
			
			$("#weightDiv").html("<p>Weight</p>");
			$("#activityDiv").html("<p>Activity</p>");
			$("#foodDiv").html("<p>Snack</p>");
			$("#numberOfServingsDiv").html("<p>Servings</p>");
			$("#a1").click();
		
	});
});