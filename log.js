'use strict'
var myApp = myApp || {};

//Draws a logging window on the screen. Use where a console isn't available (mobile, etc);
myApp.log = function(str) {
  if (!myApp.logging) { return; }
  if ($('#logging-panel').length === 0) {
    $('body').append('<div id="logging-panel"><h1>Log</h1><div id="log"></div></div>');
    $('#logging-panel').css({
      'position': 'fixed',
      'width': '600px',
      'height': '600px',
      'bottom': '20px',
      'left': '20px',
      'padding': '10px',
      'background': '#111',
      'font-family': 'courier',
      'color': '#eee',
      'overflow': 'auto',
      'box-shadow': '2px 2px 20px rgba(0, 0, 0, 0.5)',
      'z-index': '99',
      'cursor': 'move'
    });
    $('#logging-panel').off().on('mousedown', function(e) {
      var offsetX = e.pageX - $(this).offset().left;
      var offsetY = e.pageY - $(this).offset().top;
      $(document).on('mousemove.log', function(e) {
        e.preventDefault();
        $('#logging-panel').css({
          left: e.pageX - offsetX,
          top: e.pageY - offsetY
        });
      });
      $(document).on('mouseup.log blur.log', function() {
        $(document).off('.log');
      });
    });
  }
  if (typeof str === 'object') {
    str = JSON.stringify(str);
  }
  $('#log').append('<p>> ' + str + '</p>');
};
