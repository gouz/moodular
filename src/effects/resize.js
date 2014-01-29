!function($){$.extend($.fn.moodular.effects, {
 resize: function (m) {
  if (typeof m.opts.ratio === 'undefined')
   m.opts.ratio = 0;
  if (m.opts.ratio)
   $(window).on('resize.moodular', function () {
    m.$element.height(parseInt(m.$element.width()) / m.opts.ratio)
   }).trigger('resize.moodular')
 }
})}(window.jQuery);
