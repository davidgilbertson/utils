'use strict'
var myApp = myApp || {};

myApp.rightClick = function(x, y, items) {
  var $rc = $('<div id="rc-menu" class="rc-menu"></div>');
  $.each(items, function(i, val) {
    if (val === 'hr') {
      $rc.append('<hr>');
    } else {
      $rc.append('<div id="' + val.id + '" class="rc-item">' + val.name + '</div>');
    }
  });
  
  y -= 24; //align the mouse with the top item.
  x += 12; //give the mouse a bit of breathing room.
  
  $rc.css({left: x + 'px', top: y + 'px'});

  $('body').append($rc);
  
  var distFromRight = $(document).outerWidth() - ($rc.offset().left + $rc.outerWidth());
  if (distFromRight < 0) {
    x += distFromRight;
  }
  var distFromBottom = $('body').outerHeight() - ($rc.offset().top + $rc.outerHeight());
  if (distFromBottom < 0) {
    y += distFromBottom;
  }
  $rc.css({left: x + 'px', top: y + 'px'});
  
  return $rc;
};


myApp.popup = function(opt) {
  //TODO, add a type: form | message
  if (!opt.modelDef) { return; }
  myApp.editMode = true;
  $('#prompt-panel').remove();
  var heading = opt.heading || '';
  var modelDef = opt.modelDef;
  var onSave = opt.onSave;
  var onClose = opt.onClose;
  var $prompt = $('<div id="prompt-panel" class="hover-panel"><h1>' + heading + '</h1></div>');
  
  function save() {
    var model = {};
    _.each(modelDef, function(obj) {
      model[obj.name] = obj.el.val();
    });
    close();
    onSave && onSave(model);
  }
  function cancel() {
    close();
    return false;
  }
  function close() {
    myApp.editMode = false;
    $prompt.remove();
    onClose && onClose();
  }
  
  _.each(modelDef, function(obj) {
    var $row = $('<div class="prompt-row"></div>');
    $row.append('<label>' + myApp.properCase(obj.name) + '</label><br>');
    var $input = $(obj.el);
    obj.value && $input.val(obj.value);
    $row.append($input);
    $prompt.append($row);
    obj.el = $input; //hold a reference to the dom object
  });
  
  var $btns = $('<div id="prompt-btns"></div>');
  $btns.append('<button id="prompt-cancel" class="btn strong cancel">Cancel</button>');
  $btns.append('<button id="prompt-ok" class="btn strong">OK</button>');
  $prompt.append($btns);
  
  $('body').append($prompt);
  
  //TODO: pass in the focus? So if I edit descrition, the focus goes there?
  if ($prompt.find('input').length > 0) {
    $prompt.find('input')[0].focus();
    $prompt.find('input').on('keydown', function(e) {
      if (e.which === 13) {
        save();
      } else if (e.which === 27) {
        cancel();
      } 
    });
  }
  
  $('#prompt-ok').one('click', function() {
    save();
  });
  $('#prompt-cancel').one('click', function() {
    cancel();
  });
};
