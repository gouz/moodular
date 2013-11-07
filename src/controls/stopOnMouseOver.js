/**
 * Moodular - Controls / StopOnMouseOver
 * Copyright (c) 2013 Sylvain "GouZ" Gougouzian (sylvain@gougouzian.fr)
 * MIT (http://www.opensource.org/licenses/mit-license.php) licensed.
 * GNU GPL (http://www.gnu.org/licenses/gpl.html) licensed.
 */
!function($) {
	$.extend($.fn.moodular.controls, {
		stopOnMouseOver : function(m) {
			m.$element.on({
				mouseenter : function() {
					m.stop();
				},
				mouseleave : function() {
					m.start();
				}
			});
		}
	});
}(window.jQuery);
