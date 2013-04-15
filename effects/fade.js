!function($){$.extend($.fn.moodular.effects, {
 fade: function(m) {
  m.items.css({
   opacity: 0,
   'z-index': 1
  });
  for (var i = 0; i < m.opts.view; i++)
   m.items.eq(i).css({
    opacity: 1,
    'z-index': 2
   })
  m.$element.on('moodular.prev moodular.next', function() {
   for (var i = 0; i < m.opts.view; i++)
    m.items.eq((m.current + i) % m.nbItems).animate({
    opacity: 0
    }, {
     duration: m.opts.speed, 
     easing: m.opts.easing, 
     queue: m.opts.queue,
     complete: function() {
      $(this).css('z-index', 1);
     }
    });
   for (var i = 0; i < m.opts.view; i++)
    m.items.eq((m.next + i) % m.nbItems).animate({
     opacity: 1
    }, {
     duration: m.opts.speed, 
     easing: m.opts.easing, 
     queue: m.opts.queue,
     complete: function() {
      $(this).css('z-index', 2);
     }
    });
  })
 }
})}(window.jQuery);