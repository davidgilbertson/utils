'use strict'
var myApp = myApp || {};

/* 
 * A function for working with a rest server.
 * Accepts an object with the following properties
 *
 * method: 'create' | 'read' | 'update' | 'delete'
 * id: must be supplied when the method is 'read'
 * modelType: must be supplied when the method isn't read. Defines the endpoint of the URL. e.g. 'user' | 'taskItem'
 * model: the model object
 * success: a callback function called when the request completes
 *
 */
myApp.sync = function(opt) {
  if (opt.method === 'create') {
    $.ajax({
      url: 'api/' + opt.modelType,
      type: 'POST',
      data: JSON.stringify(opt.model),
      contentType: "application/json",
      success: function(response) {
        if (opt.success) {
          //do something
        }
      },
      error: function() {
        //do something
      },
      complete: function() {
        //do something
      }
    });
  }
  if (opt.method === 'read') {
    $.getJSON('api/' + opt.modelType + '/' + opt.id, function(response) {
      if (opt.success) {
        //do something
      }
    }).fail(function(err) {
        //do something
    });
  }
  if (opt.method === 'update') {
    $.ajax({
      url: 'api/' + opt.modelType,
      type: 'PUT',
      data: JSON.stringify(opt.model),
      contentType: "application/json",
      success: function(response) {
        if (opt.success) {
          //do something
        }
      },
      error: function() {
        return false;
      },
      complete: function() {
        //do something
      }
    });
  }
  if (opt.method === 'delete') {
    $.ajax({
      url: 'api/' + opt.modelType,
      type: 'DELETE',
      data: JSON.stringify(opt.model),
      contentType: "application/json",
      success: function(response) {
        if (opt.success) {
          //do something
        }
      },
      error: function() {
        return false;
      },
      complete: function() {
          //do something
      }
    });
  }
};