//$(function(){

// Model 
	var model = {
		currentCatNum: null, 
		cats : [
				{
					'name' : 'Amber',
					'img' : './img/cat1.jpg',
					'clicks' : 0
				},
				{
					'name' : 'Blue',
					'img' : './img/cat2.jpg',
					'clicks' : 0
				},
				{
					'name' : 'Cyan',
					'img' : './img/cat3.jpg',
					'clicks' : 0
				},
				{
					'name' : 'Dusty',
					'img' : './img/cat4.jpg',
					'clicks' : 0
				},
				{
					'name' : 'Fucia',
					'img' : './img/cat5.jpg', 
					'clicks' : 0
				}
			], 
		update : function(catNum) {
			this.cats[catNum].name = $('form').find('input[name = "catname"]').val();
			this.cats[catNum].img = $('form').find('input[name = "catimg"]').val();
			this.cats[catNum].clicks = $('form').find('input[name = "catclicks"]').val();
			view.adminSection.clearAndClose();  
			view.catSection.render(catNum);
			view.catMenu.render();
		}
	}; 

	// Controller 
	var controller = {

		init: function(){
			model.currentCatNum = 0; 
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
		model.currentCatNum = $(this).data('num'); 
		controller.increment(model.currentCatNum);
	});

	$('.cat-menu').on('click', '.cat-selector', function(e) {
		e.preventDefault();
//		console.log($(this).attr('href')); 
		model.currentCatNum = $(this).attr('href');
		controller.increment(model.currentCatNum); 
	});

	$('.admin-button').click( function() {
		$('.admin-section').show(); 
	}); 
	$('.admin-cancel').click( function() {
		view.adminSection.clearAndClose();  
	})
	$('.admin-save').click( function() {
		model.update(model.currentCatNum); 
	})

	// View
	var view = {

		catMenu : {

			init : function(){
				this.render(); 
			},

			render: function(){
				$('.cat-menu').html(''); 
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
				'" src = "' + model.cats[catNum].img +  
				'"><h3>' + model.cats[catNum].clicks + '</h3>'
				); 
			} 
		}, 

		adminSection : {

			clearAndClose : function() {
				$('form').find('input[type = text]').val('');
				$('.admin-section').hide();
			}
		}
	}; 

	controller.init(); 

//}); 
