/**
 * Moodular - Controls / StartOnMouseOver
 * Copyright (c) 2013 Sylvain "GouZ" Gougouzian (sylvain@gougouzian.fr)
 * MIT (http://www.opensource.org/licenses/mit-license.php) licensed.
 * GNU GPL (http://www.gnu.org/licenses/gpl.html) licensed.
 */
!function($) {
	$.extend($.fn.moodular.controls, {
		startOnMouseOver : function(m) {
			var timer = m.opts.timer, mouseon = false;
			m.opts.timer = 0;
			m.$element.on({
				mouseenter : function() {
					if (!mouseon) {
						m.opts.timer = timer;
						mouseon = true;
						m.$element.trigger('moodular.next');
					}
				},
				mouseleave : function() {
					m.opts.timer = 0;
					mouseon = false;
					m.stop();
				}
			});
		}
	});
}(window.jQuery);
