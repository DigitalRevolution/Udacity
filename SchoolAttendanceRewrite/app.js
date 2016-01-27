var i; 
var model = {
	students : [
		{
			name : 'Slappy the Frog', 
			attendance : [0,0,0,0,0,0,0,0,0,0,0,0],
			total : 0
		}, 
		{
			name : 'Lilly the Lizard', 
			attendance : [0,0,0,0,0,0,0,0,0,0,0,0],
			total : 0
		},
		{
			name : 'Paulrus the Walrus', 
			attendance : [0,0,1,0,0,0,0,0,0,0,0,0],
			total : 0
		},
		{
			name : 'Gregory the Goat', 
			attendance : [0,0,0,0,0,0,0,0,1,0,0,0],
			total : 0
		},
		{
			name : 'Adam the Anaconda', 
			attendance : [0,0,1,0,0,0,0,0,0,0,0,0],
			total : 0
		}
	]
};

var controller = {}; 

// Function to update the model when a button is clicked
// $(input[type = 'checkbox']).on('click', $('.attend-col'), function (){
// this.attr('')
// })

var increment = function(){
	console.log('check'); 
};

// Function to initialize the chart with 12 columns and students.length rows. 
$(function(){
	var students = model.students.length - 1; 
	// make sure our loop runs the first iteration -- it's running in reverse because of the insertAfter method. 
	totalAbsences(); 
	// fire a function before the loop to make sure our totals are current.
	for(i = students; i >= 0; i--){ // loop through every student object.
		// create a row for every student in the model
		$('<tr class="student'+i+'"><td class="name-col' + i + '">'+ model.students[i].name +'</td>').insertAfter('tbody');
		// write the students name in the first column
		var days = model.students[i].attendance.length; 
		// determine size of attendance data -- this won't break the code as long as all attendance arrays are the same length.
		for(j = 0; j < days; j++){ // loop through data on every day. 
			$('<td class="attend-col"><input type="checkbox" class='+ i + '-' + j + '></td>').insertAfter('.name-col' + i);
			// really we're keeping track of where we are on the grid by passing in x&y coordinates
			if (model.students[i].attendance[j] === 1) {
			// if 1, check box
				$('.'+i+'-'+j).prop('checked',true); 
			} else {
			// else, uncheck box
				$('.'+i+'-'+j).prop('checked',false); 
			}
		}
	// add the total absences as the last td. 
	$('<td>'+model.students[i].total+'</td></tr>').appendTo('.student'+i); 
	}
	// since I've clearly coded myself into a corner, this function now needs to be 
	$('input[type=checkbox]').on('click', increment()); 
});

// function to initialize the header
// header.init
$(function(){
	var days = model.students[0].attendance.length; 
	for(i = days; i > 0; i--) {
		$('<th>' + i + '</th>').insertAfter('.primary-name-col'); 
	}
});

// Function to build Totals column 
var totalAbsences = function(){
		var sum; 
		for(i=0; i<model.students.length; i++) {
			sum = model.students[i].attendance.reduce((a,b) => a+b, 0); 
			model.students[i].total = sum; 
		}
	};

var view = {}; 

// function to render the chart

// function to render the header

