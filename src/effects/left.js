/**
 * Moodular - Effect / Left
 * Copyright (c) 2013 Sylvain "GouZ" Gougouzian (sylvain@gougouzian.fr)
 * MIT (http://www.opensource.org/licenses/mit-license.php) licensed.
 * GNU GPL (http://www.gnu.org/licenses/gpl.html) licensed.
 */
!function($) {
	$.extend($.fn.moodular.effects, {
		left : function(m) {
			if ( typeof m.opts.view === "undefined")
				m.opts.view = 1;
			var percent, s, v, a = {
					duration : m.opts.speed,
					easing : m.opts.easing,
					queue : m.opts.queue
				};
			m.$element.on('moodular.init', function () {
				if (typeof m.opts.view === 'object') {
					var w = $(window).width();
					for (i in m.opts.view)
						if (i < w)
							v = m.opts.view[i];
				} else
					v = m.opts.view;
				percent = 100 / v;
				m.items.css('left', '100%').width(percent + '%');
				for (var i = 0; i < (v + m.opts.step); i++)
					m.items.eq(i).css('left', i * percent + '%');
				s = '=' + percent * m.opts.step + '%';
			}).on('moodular.next', function() {
				if (v == 1) {
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
						'left' : '0%'
					}, a);
				} else if (v < m.nbItems)
					for (var i = 0; i < (v + m.opts.step); i++)
						m.items.eq((m.current + i) % m.nbItems).css('left', i * percent + '%').animate({
							'left' : '-' + s
						}, a);
			}).on('moodular.prev', function() {
				if (v == 1) {
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
						'left' : '0%'
					}, a);
				} else if (v < m.nbItems) {
					for (var i = 0; i < v; i++)
						m.items.eq((m.current + i) % m.nbItems).css('left', i * percent + '%').animate({
							'left' : '+' + s
						}, a);
					for (var i = 1; i <= m.opts.step; i++)
						m.items.eq((m.current - i) % m.nbItems).css('left', -i * percent + '%').animate({
							'left' : '+' + s
						}, a);
				}
			});
			$(window).on('resize.moodular', function () {
				m.$element.trigger('moodular.init');
			}).trigger('resize.moodular');
		}
	});
}(window.jQuery);
