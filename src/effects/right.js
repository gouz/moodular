/**
 * Moodular - Effect / Right
 * Copyright (c) 2013 Sylvain "GouZ" Gougouzian (sylvain@gougouzian.fr)
 * MIT (http://www.opensource.org/licenses/mit-license.php) licensed.
 * GNU GPL (http://www.gnu.org/licenses/gpl.html) licensed.
 */
!function($) {
	$.extend($.fn.moodular.effects, {
		right : function(m) {
			if ( typeof m.opts.view === "undefined")
				m.opts.view = 1;
			var percent = 100 / m.opts.view;
			m.items.css('left', '100%').width(percent + '%');
			for (var i = 0; i < (m.opts.view + m.opts.step); i++)
				m.items.eq(i).css('left', 100 - (i + 1) * percent + '%');
			var s = '=' + percent * m.opts.step + '%';
			m.$element.on('moodular.next', function() {
				if (m.opts.view == 1) {
					m.items.eq(m.current).css('left', 0).animate({
						'left' : '+' + s
					}, {
						duration : m.opts.speed,
						easing : m.opts.easing,
						queue : m.opts.queue,
						complete : function() {
							$(this).css('left', '100%');
						}
					});
					m.items.eq(m.next).css('left', '-100%').animate({
						'left' : 0
					}, {
						duration : m.opts.speed,
						easing : m.opts.easing,
						queue : m.opts.queue
					});
				} else if (m.opts.view < m.nbItems)
					for (var i = (0 - m.opts.step); i < (m.opts.view + m.opts.step); i++)
						m.items.eq((m.current + i) % m.nbItems).css('left', 100 - (i + 1) * percent + '%').animate({
							'left' : '+' + s
						}, {
							duration : m.opts.speed,
							easing : m.opts.easing,
							queue : m.opts.queue
						});
			}).on('moodular.prev', function() {
				if (m.opts.view == 1) {
					m.items.eq(m.current).css('left', 0).animate({
						'left' : '-' + s
					}, {
						duration : m.opts.speed,
						easing : m.opts.easing,
						queue : m.opts.queue,
						complete : function() {
							$(this).css('left', '-100%');
						}
					});
					m.items.eq(m.next).css('left', '100%').animate({
						'left' : 0
					}, {
						duration : m.opts.speed,
						easing : m.opts.easing,
						queue : m.opts.queue
					});
				} else if (m.opts.view < m.nbItems) {
					for (var i = 0; i < m.opts.view; i++)
						m.items.eq((m.current + i) % m.nbItems).css('left', 100 - (i + 1) * percent + '%').animate({
							'left' : '-' + s
						}, {
							duration : m.opts.speed,
							easing : m.opts.easing,
							queue : m.opts.queue
						});
					for (var i = 1; i <= m.opts.step; i++)
						m.items.eq((m.current - i) % m.nbItems).css('left', 100 + (i - 1) * percent + '%').animate({
							'left' : '-' + s
						}, {
							duration : m.opts.speed,
							easing : m.opts.easing,
							queue : m.opts.queue
						});
				}
			});
		}
	});
}(window.jQuery);
