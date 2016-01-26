$(function(){

// Model 
	var model = {
		cats : [
				{
					'name' : 'Amber',
					'img' : 'cat1.jpg',
					'clicks' : 0
				},
				{
					'name' : 'Blue',
					'img' : 'cat2.jpg',
					'clicks' : 0
				},
				{
					'name' : 'Cyan',
					'img' : 'cat3.jpg',
					'clicks' : 0
				},
				{
					'name' : 'Dusty',
					'img' : 'cat4.jpg',
					'clicks' : 0
				},
				{
					'name' : 'Fucia',
					'img' : 'cat5.jpg', 
					'clicks' : 0
				}
			]
	}; 

	// Controller 
	var controller = {

		init: function(){
			view.catMenu.init();
			view.catSection.init(); 
		}, 

		increment: function(catNum){
			model.cats[catNum].clicks++; 
			view.catSection.render(catNum); 
		}
	};

	// click handlers -- use delegation so $(this) doesn't bind to something crazy. 

	$('.cat-section').on('click', '.cat-photo', function() {
		var catNum = $(this).data('num'); 
		controller.increment(catNum);
	});

	$('.cat-menu').on('click', '.cat-selector', function(e) {
		e.preventDefault();
		console.log($(this).attr('href')); 
		var catNum = $(this).attr('href');
		controller.increment(catNum); 
	});


	// View
	var view = {

		catMenu : {

			init : function(){

				this.render(); 

			},

			render: function(){

				for (var i = 0; i < model.cats.length; i++){
					$('.cat-menu').append(
						'<li>' +
						'<a class = "cat-selector" data-num = "' + i + '"href = "'+ i + '">' + model.cats[i].name + '</a>' +
						'</li>'
				)}
			}
		}, 
		
		catSection : {

			init : function(){

				this.render(0); 
		
			},

			render: function(catNum){
				$('.cat-section').html(
				'<h3>' + model.cats[catNum].name + 
				'</h3><img class = "cat-photo" data-num = "' + catNum + 
				'" src = "./img/' + model.cats[catNum].img + 
				'"><h3>' + model.cats[catNum].clicks + '</h3>'
				); 
			}
		}
	}; 

	controller.init(); 

}); 
