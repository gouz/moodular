function(m) {
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
