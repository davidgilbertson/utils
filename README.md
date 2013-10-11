utils
=====

A bunch of utilities that I use, including:

## log.js
### log()
Draws a logging window on the screen, cool for when there's no console (e.g. mobile)

myApp.log('log this data');



## data.js
Stuff that JavaScript should have

### store()
gets and sets values in localStorage
myApp.store('last used', 'today');

### properCase()
Converts a string to Propper Case
myApp.properCase('the quick brown fox'); //The quick brown fox

### round(number, decimal places)
rounds to the specified decimal places
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

### makeGUID
returns a GUID
var someUniqueID = myApp.makeGUID();


## graphical.js
Things that do things on the screen

### rightClick(x, y, items)
To be called from a contextmenu event. Takes an array of items to show in the right click menu.
The jQuery element is returned. Click events on the items in the right click menu can then be handled by the element's id.

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
  startMsg: 'Adding a new user',
  endMsg: 'New user added',
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