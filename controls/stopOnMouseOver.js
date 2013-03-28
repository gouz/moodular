function (m) {
	m.$element.on('mouseenter', function () {
		m.stop();
	}).on('mouseleave', function () {
		m.start();
	});
}
