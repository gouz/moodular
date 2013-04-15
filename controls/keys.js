!function($){$.extend($.fn.moodular.controls, {
 keys: function(m) {
  if (typeof m.opts.keyPrev === "undefined")
   m.opts.keyPrev = 37;
  if (typeof m.opts.keyNext === "undefined")
   m.opts.keyNext = 39;
  $(document).on('keydown', function(event) {
   if (event.keyCode == m.opts.keyPrev) {
    m.$element.trigger('moodular.prev');
    return false;
   } else if (event.keyCode == m.opts.keyNext) {
     m.$element.trigger('moodular.next');
     return false;
   }
  });
 }
})}(window.jQuery);