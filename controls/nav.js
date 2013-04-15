!function($){$.extend($.fn.moodular.controls, {
 nav: function(m) {
  if (typeof m.opts.navView === "undefined")
   m.opts.navView = m.nbItems;
  if (typeof m.opts.navEffects === "undefined")
   m.opts.navEffects = "";
  if (typeof m.opts.navControls === "undefined")
   m.opts.navControls = "";
  if (typeof m.opts.navButtonPrev === "undefined")
   m.opts.navButtonPrev = "";
  if (typeof m.opts.navButtonNext === "undefined")
   m.opts.navButtonNext = "";
  if (typeof m.opts.navSelector === "undefined")
   m.opts.navSelector = "li";
  m.opts.navWrapper.moodular({
   timer: m.opts.timer,
   view : m.opts.navView,
   effects : m.opts.navEffects,
   controls : m.opts.navControls,
   buttonPrev : m.opts.navButtonPrev,
   buttonNext : m.opts.navButtonNext,
   speed : m.opts.speed
  });
  m.opts.timer = 0;
  var n = m.opts.navWrapper.data('moodular');
  n.$element.on('moodular.next', function () {
   m.next = n.current;
   m.$element.trigger('moodular.next');
  }).on('moodular.prev', function () {
   m.next = n.current;
   m.$element.trigger('moodular.prev');
  });
  $(m.opts.navSelector, m.opts.navWrapper).each(function(i) {
   $(this).data('index', i);
  }).on('mouseenter', function() {
   n._current = n.current;
   n.stop();
   $('>li', m.opts.navWrapper).removeClass('active');
   $(this).addClass('active');
   m.next = $(this).data('index');
   var _speed = m.opts.speed;
   m.opts.speed = 0;
   m.$element.trigger('moodular.next');
   m.opts.speed = _speed;
  }).on('mouseleave', function() {
   n.current = n._current;
   n.next = -1;
   n.start();
  });
 }
})}(window.jQuery);