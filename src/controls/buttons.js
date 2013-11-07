/**
 * Moodular - Controls / Buttons
 * Copyright (c) 2013 Sylvain "GouZ" Gougouzian (sylvain@gougouzian.fr)
 * MIT (http://www.opensource.org/licenses/mit-license.php) licensed.
 * GNU GPL (http://www.gnu.org/licenses/gpl.html) licensed.
 */
!function($) {
	$.extend($.fn.moodular.controls, {
		buttons : function(m) {
			if (typeof m.opts.view === "undefined")
				m.opts.view = 1;
			if (m.nbItems <= m.opts.view) {
				m.opts.buttonPrev.hide();
				m.opts.buttonNext.hide();
			}
			m.opts.buttonPrev.on('click', function() {
				m.$element.trigger('moodular.prev');
				return false;
			});
			m.opts.buttonNext.on('click', function() {
				m.$element.trigger('moodular.next');
				return false;
			});
		}
	});
}(window.jQuery); 