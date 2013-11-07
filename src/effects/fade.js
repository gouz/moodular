/**
 * Moodular - Effect / Fade
 * Copyright (c) 2013 Sylvain "GouZ" Gougouzian (sylvain@gougouzian.fr)
 * MIT (http://www.opensource.org/licenses/mit-license.php) licensed.
 * GNU GPL (http://www.gnu.org/licenses/gpl.html) licensed.
 */
!function($) {
	$.extend($.fn.moodular.effects, {
		fade : function(m) {
			m.items.css({
				opacity : 0,
				'z-index' : 1
			});
			if ( typeof m.opts.view === "undefined")
				m.opts.view = 1;
			for (var i = 0; i < m.opts.view; i++)
				m.items.eq(i).css({
					opacity : 1,
					'z-index' : 2
				});
			m.$element.on('moodular.prev moodular.next', function() {
				for (var i = 0; i < m.opts.view; i++)
					m.items.eq((m.current + i) % m.nbItems).stop().css({
						opacity : 1,
						'z-index' : 2
					}).animate({
						opacity : 0
					}, {
						duration : m.opts.speed,
						easing : m.opts.easing,
						queue : m.opts.queue,
						complete : function() {
							$(this).css('z-index', 1);
						}
					});
				for (var i = 0; i < m.opts.view; i++)
					m.items.eq((m.next + i) % m.nbItems).stop().css({
						opacity : 1,
						'z-index' : 1
					}).animate({
						opacity : 1
					}, {
						duration : m.opts.speed,
						easing : m.opts.easing,
						queue : m.opts.queue,
						complete : function() {
							$(this).css('z-index', 2);
						}
					});
			});
		}
	});
}(window.jQuery);
