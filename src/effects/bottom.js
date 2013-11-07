/**
 * Moodular - Effect / Bottom
 * Copyright (c) 2013 Sylvain "GouZ" Gougouzian (sylvain@gougouzian.fr)
 * MIT (http://www.opensource.org/licenses/mit-license.php) licensed.
 * GNU GPL (http://www.gnu.org/licenses/gpl.html) licensed.
 */
!function($) {
	$.extend($.fn.moodular.effects, {
		bottom : function(m) {
			if ( typeof m.opts.view === "undefined")
				m.opts.view = 1;
			var percent = 100 / m.opts.view;
			m.items.css('top', '100%').height(percent + '%');
			for (var i = 0; i < (m.opts.view + m.opts.step); i++)
				m.items.eq(i).css('top', 100 - (i + 1) * percent + '%');
			var s = '=' + percent * m.opts.step + '%';
			m.$element.on('moodular.next', function() {
				if (m.opts.view == 1) {
					m.items.eq(m.current).css('top', 0).animate({
						'top' : '+' + s
					}, {
						duration : m.opts.speed,
						easing : m.opts.easing,
						queue : m.opts.queue,
						complete : function() {
							$(this).css('top', '100%');
						}
					});
					m.items.eq(m.next).css('top', '-100%').animate({
						'top' : 0
					}, {
						duration : m.opts.speed,
						easing : m.opts.easing,
						queue : m.opts.queue
					});
				} else if (m.opts.view < m.nbItems)
					for (var i = (0 - m.opts.step); i < (m.opts.view + m.opts.step); i++)
						m.items.eq((m.current + i) % m.nbItems).css('top', 100 - (i + 1) * percent + '%').animate({
							'top' : '+' + s
						}, {
							duration : m.opts.speed,
							easing : m.opts.easing,
							queue : m.opts.queue
						});
			}).on('moodular.prev', function() {
				if (m.opts.view == 1) {
					m.items.eq(m.current).css('top', 0).animate({
						'top' : '-' + s
					}, {
						duration : m.opts.speed,
						easing : m.opts.easing,
						queue : m.opts.queue,
						complete : function() {
							$(this).css('top', '-100%');
						}
					});
					m.items.eq(m.next).css('top', '100%').animate({
						'top' : 0
					}, {
						duration : m.opts.speed,
						easing : m.opts.easing,
						queue : m.opts.queue
					});
				} else if (m.opts.view < m.nbItems) {
					for (var i = 0; i < m.opts.view; i++)
						m.items.eq((m.current + i) % m.nbItems).css('top', 100 - (i + 1) * percent + '%').animate({
							'top' : '-' + s
						}, {
							duration : m.opts.speed,
							easing : m.opts.easing,
							queue : m.opts.queue
						});
					for (var i = 1; i <= m.opts.step; i++)
						m.items.eq((m.current - i) % m.nbItems).css('top', 100 + (i - 1) * percent + '%').animate({
							'top' : '-' + s
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
