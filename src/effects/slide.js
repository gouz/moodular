/**
 * Moodular - Effect / Slide
 * Copyright (c) 2013 Sylvain "GouZ" Gougouzian (sylvain@gougouzian.fr)
 * MIT (http://www.opensource.org/licenses/mit-license.php) licensed.
 * GNU GPL (http://www.gnu.org/licenses/gpl.html) licensed.
 */
!function($) {
	$.extend($.fn.moodular.effects, {
		slide : function(m) {
			if ( typeof m.opts.direction === "undefined")
				m.opts.direction = 'left';
			m.items.css('z-index', 1).eq(0).css('z-index', 2);
			var a = {};
			if (m.opts.direction == 'top')
				a['top'] = '-100%';
			else if (m.opts.direction == 'bottom')
				a['top'] = '100%';
			else if (m.opts.direction == 'right')
				a['left'] = '100%';
			else
				a['left'] = '-100%';
			m.$element.on('moodular.next', function() {
				m.items.eq(m.next).css('z-index', 2);
				m.items.eq(m.current).css('z-index', 3).animate(a, {
					duration : m.opts.speed,
					easing : m.opts.easing,
					queue : m.opts.queue,
					complete : function() {
						$(this).css({
							'z-index' : 1,
							left : 0,
							top : 0
						});
					}
				});
			});
			m.$element.on('moodular.prev', function() {
				m.items.css('z-index', 1);
				m.items.eq(m.current).css('z-index', 2);
				m.items.eq(m.next).css('z-index', 3).css(a).animate({
					left : 0,
					top : 0
				}, {
					duration : m.opts.speed,
					easing : m.opts.easing,
					queue : m.opts.queue,
					complete : function() {
						m.items.css('z-index', 1);
						$(this).css('z-index', 2);
					}
				});
			});
		}
	});
}(window.jQuery);
