!function($){$.extend($.fn.moodular.controls, {
 startOnMouseOver: function (m) {
  var timer = m.opts.timer, mouseon = false;
  m.opts.timer = 0;
  m.$element.on('mouseenter', function () {
   if (!mouseon) {
    m.opts.timer = timer;
    mouseon = true;
    m.$element.trigger('moodular.next');   	
   }
  }).on('mouseleave', function () {
   m.opts.timer = 0;
   mouseon = false;
   m.stop();
  });
 }
})}(window.jQuery);
