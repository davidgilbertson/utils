utils
=====

A bunch of utilities that I use. If you're here, and would also like to use them, sweet!
But please forgive the mess. There is sometimes jQuery dependencies, sometimes not, and my explanations are for future David, so may not make perfect sense to you.

Also, some of the graphical elements (right click menu and popup) will require css to get them looking hot.

## log.js
### log()
Draws a logging window on the screen, cool for when there's no console (e.g. mobile). You can drag the log window around the screen so it doesn't get in the way.

	myApp.log('log this data');



## data.js
Stuff that JavaScript should have

### store()
Gets and sets values in localStorage

	myApp.store('last used', 'today');

### properCase()
Converts a string to proper case

	myApp.properCase('the quick brown fox'); //The quick brown fox

### round(number, decimal places)
Rounds to the specified decimal places

	myApp.round(123.456, 2); //123.45

### contain(low number, middle number, high number)
Contains a given number between two other numbers.

	var x = 121;
	var containedX = myApp.contain(1, x, 100);
	//containedX = 100

### convertNums(object)
Takes an object of any complexity and turns strings into numbers or boolean where possible.
For example, a complex model (arrays of arrays of objects with arrays) gets returned from a server in JSON format.
This model can be parsed through convertNums and any strings that can be converted to numbers will be.

### makeGUID()
Returns a GUID

	var someUniqueID = myApp.makeGUID();


## graphical.js
Things that do things on the screen

### rightClick(x, y, items)
To be called from a contextmenu event. Takes an array of items to show in the right click menu, and returns a jQuery object. Click events are then obviously bound to whatever right click items there were.

	var items = [
		{id: 'rc-add', name: 'Add Something'},
		{id: 'rc-edit', name: 'Edit This Thing'},
		{id: 'rc-rename', name: 'Rename...'},
		'hr',
		{id: 'rc-delete', name: 'Delete'}
	];
	
	var $rc = myApp.rightClick(e.pageX, e.pageY, items);
	$rc.on('click', function(e) {
		if (e.target.id === 'rc-add') {
			//Add something
		}
		if (e.target.id === 'rc-edit') {
			//Edit this thing
		}
	});


### popup(options)
Kind of like an advanced prompt()
Accepts a data model as one of the options. The popup prompt is shown (for example, with fields for name, description and phone number) and the onSave event will return the model with the data filled in.

	myApp.popup({
		heading: 'Enter your details',
		modelDef: [
			{name: 'name', el: '<input type="text" maxlength="50">', value: ''},
			{name: 'description', el: '<textarea>', value: ''},
			{name: 'history', el: '<textarea>', value: ''}
		],
		onSave: function(model) {
			//do something with the model
		},
		onClose: function() {
			//do something on close
		}
	});


## rest_sync.js

### sync(options)
A function for working with a rest server.
Accepts an object with the following properties

method: 'create' | 'read' | 'update' | 'delete'
id: must be supplied when the method is 'read'
modelType: must be supplied when the method isn't read. Defines the endpoint of the URL. e.g. 'user' | 'taskItem'
model: the model object
success: a callback function called when the request completes

#### Example 
	myApp.sync({
		method: 'create',
		modelType: 'user',
		model: userModel,
		callback: function(response) {
			//do something with the response
		}
	});


## timer.js
### timer()
Set points in your code to measure time between. All runs are remembered and can be logged to a pretty table in the console.

#### Example
	myApp.timer.start('Load Data', 'This is my first run');
	//Some code that fetches some data
	
	myApp.timer.next('Processing data');
	//Some code that processes the data
	
	myApp.timer.next('Draw to DOM')
	//Some code that draws the data to the DOM
	
	myApp.timer.stop();

To show the times recorded

	myApp.timer.getHistory();

To clear the history

	myApp.timer.clear();
