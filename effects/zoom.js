function (m) {
	if (typeof m.opts.time === 'undefined')
		m.opts.time = m.opts.timer;
	if (typeof m.opts.zoom === 'undefined')
		m.opts.zoom = 10;
	m.items.hide().eq(0).show();
	var a = function (i) {
		m.items.eq(i).stop().css({
			top: 0,
			left: 0,
			width: '100%',
			height: '100%'
		}).show().animate({
			top: '-=' + m.opts.zoom + '%',
			left: '-=' + m.opts.zoom + '%',
			width: '+=' + 2 * m.opts.zoom + '%',
			height: '+=' + 2 * m.opts.zoom + '%'
		}, m.opts.time);
	}
	a(m.current);
	m.$element.on('moodular.prev moodular.next', function() {
		m.items.eq(m.current).hide();
		a(m.next);
	})
}