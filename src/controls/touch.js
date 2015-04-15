/**
 * Moodular - Controls / Touch
 * Copyright (c) 2013 Sylvain "GouZ" Gougouzian (sylvain@gougouzian.fr)
 * MIT (http://www.opensource.org/licenses/mit-license.php) licensed.
 * GNU GPL (http://www.gnu.org/licenses/gpl.html) licensed.
 */
!function($) {
	$.extend($.fn.moodular.controls, {
		touch : function(m) {
			var touchb = null, touche = null;
			m.$element.on({
				touchstart : function(event) {
					var e = event.originalEvent;
					touchb = e.targetTouches[0].pageX;
				},
				touchmove : function(event) {
					event.preventDefault();
					var e = event.originalEvent;
					touche = e.targetTouches[0].pageX;
				},
				touchend : function() {
					if (touchb > touche)
						m.$element.trigger('moodular.next');
					else if (touchb < touche)
						m.$element.trigger('moodular.prev');
					touchb = null;
					touche = null;
					return false;
				}
			});
		}
	});
}(window.jQuery);
