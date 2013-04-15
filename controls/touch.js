!function($){$.extend($.fn.moodular.controls, {
 touch: function(m) {
  var touchb = null, 
   touche = null;
  m.$element.on('touchstart', function(event) {
   var e = event.originalEvent;
   touchb = e.targetTouches[0].pageX;
  }).on('touchmove', function(event) {
   event.preventDefault();
   var e = event.originalEvent;
   touche = e.targetTouches[0].pageX;
  }).on('touchend', function() { 
    if (touchb > touche) m.$e.trigger('moodular.next');
    else if (touchb < touche) m.$e.trigger('moodular.prev');
    touchb = null;
    touche = null;
    return false;
  });
 }
})}(window.jQuery);