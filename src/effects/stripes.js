/**
 * Moodular - Effect / Stripes
 * Copyright (c) 2013 Sylvain "GouZ" Gougouzian (sylvain@gougouzian.fr)
 * MIT (http://www.opensource.org/licenses/mit-license.php) licensed.
 * GNU GPL (http://www.gnu.org/licenses/gpl.html) licensed.
 */
!function($) {
	$.extend($.fn.moodular.effects, {
		stripes : function(m) {
			if ( typeof m.opts.stripes === "undefined")
				m.opts.stripes = 1;
			if ( typeof m.opts.orientation === "undefined")
				m.opts.orientation = 'vertical';
			m.items.hide().eq(0).show();
			var ns = m.opts.stripes, _w = 'width', _h = 'height', o = m.opts.orientation == 'vertical' ? _w : _h, __o = o == _w, _o = __o ? _h : _w, d = __o ? 'left' : 'top', _d = __o ? 'top' : 'left', s = parseInt(m.$element.css(o)), _s = parseInt(m.$element.css(_o)), S = s / ns;
			m.$element.on('moodular.prev moodular.next', function() {
				$('#stripes_wrapper', m.$element).remove();
				m.items.hide().eq(m.next).show().css('z-index', 1);
				var C = m.items.eq(m.current).html();
				c = '';
				for (var i = 0; i < ns; i++)
					c += '<div style="position:absolute;' + d + ':' + (i * S) + 'px;' + _d + ':' + '0;' + o + ':' + S + 'px;' + _o + ':' + _s + 'px;overflow:hidden;"><div style="margin-' + d + ':-' + (i * S) + 'px;' + o + ':' + s + 'px;' + _o + ':' + _s + 'px">' + C + '</div></div>';
				m.$element.prepend('<' + m.opts.selector + ' id="stripes_wrapper" style="z-index:2;position:absolute;">' + c + '</div>');
				$('#stripes_wrapper>div', m.$element).each(function(i) {
					var a = {};
					a[_d] = i % 2 ? '100%' : '-100%';
					$(this).animate(a, m.opts.speed * 0.75, m.opts.easing);
				});
				clearTimeout(m.mTimer);
				m.mTimer = setTimeout(function() {
					$('#stripes_wrapper', m.$element).remove();
				}, m.opts.speed);
			});
		}
	});
}(window.jQuery);
