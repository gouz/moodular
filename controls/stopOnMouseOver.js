!function($){$.extend($.fn.moodular.controls, {
	stopOnMouseOver: function (m) {
		m.$element.on('mouseenter', function () {
			m.stop();
		}).on('mouseleave', function () {
			m.start();
		});
	}
})}(window.jQuery);