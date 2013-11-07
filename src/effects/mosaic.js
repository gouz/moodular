/**
 * Moodular - Effect / Mosaic
 * Copyright (c) 2013 Sylvain "GouZ" Gougouzian (sylvain@gougouzian.fr)
 * MIT (http://www.opensource.org/licenses/mit-license.php) licensed.
 * GNU GPL (http://www.gnu.org/licenses/gpl.html) licensed.
 */
!function($) {
	$.extend($.fn.moodular.effects, {
		mosaic : function(m) {
			if ( typeof m.opts.slices === "undefined")
				m.opts.slices = [6, 6];
			if ( typeof m.opts.mode === "undefined")
				m.opts.mode = 'random';
			m.items.hide().eq(0).show();
			var h = m.opts.slices[1], v = m.opts.slices[0], _w = m.$element.width(), _h = m.$element.height(), W = _w / v, H = _h / h;
			m.$element.on('moodular.prev moodular.next', function() {
				$('#mosaic_wrapper', m.$element).remove();
				m.items.hide().eq(m.next).show().css('z-index', 1);
				var C = m.items.eq(m.current).html();
				c = '';
				for (var i = 0; i < v; i++)
					for (var j = 0; j < h; j++)
						c += '<div style="position:absolute;left:' + (i * W) + 'px;top:' + (j * H) + 'px;width:' + W + 'px;height:' + H + 'px;overflow:hidden;"><div style="margin-left:-' + (i * W) + 'px;margin-top:-' + (j * H) + 'px;width:' + _w + 'px;height:' + _h + 'px">' + C + '</div></div>';
				m.$element.prepend('<' + m.opts.selector + ' id="mosaic_wrapper" style="z-index:2;position:absolute;">' + c + '</div>');
				$('#mosaic_wrapper>div', m.$element).css('opacity', 1).each(function(k) {
					var $this = $(this);
					var n = h * v, r;
					if (m.opts.mode == 'random')
						r = m.opts.speed * 0.5 * Math.ceil(Math.random() * (n - 1)) / n;
					else if (m.opts.mode == 'crawler')
						r = m.opts.speed * 0.5 * k / n;
					setTimeout(function() {
						$this.animate({
							opacity : 0
						}, r, m.opts.easing);
					}, r);
				});
				clearTimeout(m.mTimer);
				m.mTimer = setTimeout(function() {
					$('#mosaic_wrapper', m.$element).remove();
				}, m.opts.speed);
			});
		}
	});
}(window.jQuery);
