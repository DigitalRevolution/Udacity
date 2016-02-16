var initialCatList = [
				{
					'clickCount' : 0,
					'name' : 'Amber',
					'imgSrc' : './img/cat1.jpg',
					'nicknames' : ['Orange'] 

				},
				{
					'clickCount' : 0,
					'name' : 'Blue',
					'imgSrc' : './img/cat2.jpg',
					'nicknames' : ['Azul'] 
				},
				{
					'clickCount' : 0,
					'name' : 'Cyan',
					'imgSrc' : './img/cat3.jpg',
					'nicknames' : ['Breen'] 
				},
				{
					'clickCount' : 0,
					'name' : 'Dusty',
					'imgSrc' : './img/cat4.jpg',
					'nicknames' : ['Brown'] 
				},
				{
					'clickCount' : 0,
					'name' : 'Fucia',
					'img' : './img/cat5.jpg', 
					'nicknames' : ['Indigo'] 
				}
			];

var Cat = function(data){

	this.clickCount = ko.observable(data.clickCount);
	this.name = ko.observable(data.name); 
	this.imgSrc = ko.observable(data.imgSrc); 
	this.nicknames = ko.observableArray(data.nicknames); 

	this.popularity = ko.computed(function(){
		var count = this.clickCount();
		if(count<11){return "Kitten"};
		if(count<21 && count>10){return "Cat"};
		if(count>20){return "Popular Cat"}; 
	},this);

}

var ViewModel = function() {
	var that = this;

	this.catList = ko.observableArray([]); 

	initialCatList.forEach(function(catItem){
		that.catList.push( new Cat (catItem) ); 
	});

	this.currentCat = ko.observable( this.catList()[0] );

	this.incrementCounter = function() {
		that.currentCat().clickCount(that.currentCat().clickCount() + 1); 
	}; 

}

ko.applyBindings(new ViewModel());