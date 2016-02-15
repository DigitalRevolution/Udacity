var Cat = function(){

	this.clickCount = ko.observable(0); 
	this.name = ko.observable('Tabby'); 
	this.imgSrc = ko.observable('img/cat1.jpg'); 
	this.imgAttribution = ko.observable('The Internet'); 
	this.nicknames = ko.observableArray(['Garfield','Felix','Ookla']); 
	this.popularity = ko.computed(function(){
		var count = this.clickCount();
		if(count<11){return "Kitten"};
		if(count<21 && count>10){return "Cat"};
		if(count>20){return "Popular Cat"}; 
	},this);

}

var ViewModel = function() {

	this.currentCat = ko.observable(new Cat()); 

	this.incrementCounter = function() {
		this.currentCat().clickCount(this.currentCat().clickCount() + 1); 
	}; 

}

ko.applyBindings(new ViewModel());