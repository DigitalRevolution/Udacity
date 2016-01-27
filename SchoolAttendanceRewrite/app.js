$(function(){
	var i,j; // global increment vars used throughout application.

	// This is the default model -- attendance info will be saved to local storage programatically
	// Keep in mind that name updates are not a current feature and local storage would have to be 
	// cleared to update names. Totals are calculated automatically. 
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
				attendance : [0,0,0,0,0,0,0,0,0,0,0,0],
				total : 0
			},
			{
				name : 'Gregory the Goat', 
				attendance : [0,0,0,0,0,0,0,0,0,0,0,0],
				total : 0
			},
			{
				name : 'Adam the Anaconda', 
				attendance : [0,0,0,0,0,0,0,0,0,0,0,0],
				total : 0
			}
		]
	};

	var controller = {

		// Function to see if the user has any model data -- if local data is available,
		// use it. Otherwise we default to the model above. 
		initData : function(){
	        if(localStorage.udacityAttendanceAppData){
	            model.students = JSON.parse(localStorage.udacityAttendanceAppData); 
	        }
	    },

	    // Function to build numerical x axis titles. 
	    headBuild : function(){
			// Name the first column for names
			var output = '<tr><th class="primary-name-col">Student Name</th>';
			// Create and numerically entitle column for each day
			var days = model.students[0].attendance.length + 1; 
			for (i=1; i<days; i++){
				output += '<th>'+i+'</th>'; 
			}
			// Name the last column for totals
			output += '<th class="missed-col">Days Missed</th></tr>';
			// Call a function to insert output to the view. 
			view.headRender(output); 
		}, 

	    // Function to build attendance spreadsheet and add x and y axis labels. 
		bodyBuild : function(){
			// Initialize Local Variables - output will hold html in building, 
			//                            - checkbox will hold an array of checkboxes
			var checkbox, output; 
			// Students = Rows
			var students = model.students.length;
			// Days = Columns / row -- currently coded to length of first attendance array. 
			// Variant array length functionality not currently available. 
			var days = model.students[0].attendance.length; 
			// Start a loop to create every Row. 
			for(i=0; i<students; i++){ // outer loop
				// [0] Start the row and add the first <td> with the students name to output.
				// In other words, create y-axis titles.
				output += '<tr><td>' + model.students[i].name + '</td>';
				// [1] Start a loop to create every column 'j' <td> in this row 'i'
				for(j=0; j<days; j++){ // inner loop
					// [2] Test attendance binary value
					if(model.students[i].attendance[j] === 1){
						// [3] If truthy add the <td> and <input> to output variable  
						// In other words, plot x,y or student,day in html.
						output += '<td><input class = "checkbox" data-student="'+i+'" data-day="'+j+'" type="checkbox" checked></td>'; 
					} else {
						// [4] If falsy add same code without the checked attribute. 
						output += '<td><input class = "checkbox" data-student="'+i+'" data-day="'+j+'" type="checkbox"></td>'; 
					}
					// [5] Return to step [2] with next day 'j'
				}
				// [6] In the final column, add a <td> that calls the total function to determine total days 
				output += '<td>' + controller.total(i) + '</td>'; 
			// [7] Return to step [0] with the next student.
			}
			// [8] Add fullly compiled output to tbody.spreadsheet
			view.bodyRender(output); 
			// [9] Create an array of all the checkboxes
			checkbox = document.getElementsByClassName('checkbox');
			// [10] Add event listeners to each checkbox to handle clicks
			controller.handler(checkbox);
		},

		// Function to sum attendance arrays.
		// This is called for each student in the outer loop of body build. (around line 90)
		total : function(student){
			var sum = model.students[student].attendance.reduce((a,b) => a+b, 0); 
			model.students[student].total = sum; 		
			return sum;
		}, 

		// Add listeners and handle clicks on each checkbox  
		// Called once in the final line in bodyBuild function 
		handler : function(checkbox){
			for(i=0; i<checkbox.length; i++){
				checkbox[i].addEventListener('click', function(){
					var student = $(this).data('student'); 
					var day = $(this).data('day');
					controller.toggle(student, day);
				})
			}
		}, 

		// Function to toggle binary values in model. 
		// Function extended for simplicity. Maybe we'll go ternary next week. 
		toggle : function(student, day){
			if (model.students[student].attendance[day] === 1){
				model.students[student].attendance[day] = 0;
			} else {
				model.students[student].attendance[day] = 1;
			}
			// Upddate local storage for persistant data. 
			localStorage.udacityAttendanceAppData = JSON.stringify(model.students); 
			// Rebuild the page. 
			controller.bodyBuild(); 
		}
	}; 

	var view = {
		init: function(){
			controller.initData();
			controller.bodyBuild();
			controller.headBuild(); 
		},
		headRender : function(output){
			$('.header').html(output);
		},
		bodyRender : function(output){
			$('.spreadsheet').html(output);
		}
	};

	view.init(); 

});