/**
 * Copyright (c) 2012 Sylvain Gougouzian (sylvain@gougouzian.fr)
 * MIT (http://www.opensource.org/licenses/mit-license.php) licensed.
 * GNU GPL (http://www.gnu.org/licenses/gpl.html) licensed.
 *
 * jQuery moodular effects by Sylvain Gougouzian http://sylvain.gougouzian.fr
 */
jQuery(function($) {
	$.extend($.fn.moodular.effects.init,{
		top: function (m) {
			m.vertical = true;
		},
		bottom: function (m) {
			m.vertical = true;
		},
		fade: function (m) {
			$('>' + m.opts.item, m.e).css({
				'position' : 'absolute',
				'z-index' : 1,
				'opacity' : 0
			});
			$('>' + m.opts.item + ':first', m.e).css({
				'z-index' : 3,
				'opacity' : 1
			});
			$('>' + m.opts.item, m.e).eq(1).css('z-index', 2);
		},
		legend: function (m) {
			m.opts.legendContainer.html($('> ' + m.opts.item + ':first .legend', m.e).html());
		},
		multiple: function (m) {
			m.nb_move = 1;
		}
	});
	$.extend($.fn.moodular.effects.move,{
		right: function (c, b) {
			c.e.animate({
				left: (c.dir == -1 ? '-=' : '+=') + c.size + 'px'
			}, c.opts.speed, c.opts.easing, function () { 
				b(); 
			});
		},
		top: function (c, b) {
			c.e.animate({
				top: (c.dir == 1 ? '-=' : '+=') + c.size + 'px'
			}, c.opts.speed, c.opts.easing, function () {
				b();
			});
		},
		bottom: function (c, b) {
			c.e.animate({
				top: (c.dir == -1 ? '-=' : '+=') + c.size + 'px'
			}, c.opts.speed, c.opts.easing, function () {
				b();
			});
		},
		fade: function (c, b) {
			$('>' + c.opts.item, c.e).css({
				'z-index' : 1,
				'opacity' : 0
			});
			$('>' + c.opts.item + '[data-position=' + c.current + ']', c.e).css({
				'z-index' : 2,
				'opacity' : 1
			});
			$('>' + c.opts.item + '.current', c.e).css({
				'z-index' : 3,
				'opacity' : 1
			}).animate({
				opacity: 0
			}, c.opts.speed, c.opts.easing, function () {
				b();
			});
		},
		multiple: function (c, b) {
			c.e.animate( {
				left : (c.dir == 1 ? '-=' : '+=') + c.size * c.nb_move + 'px'
			}, c.opts.speed, c.opts.easing, function() {
				b();
			});
		}
	});
	$.extend($.fn.moodular.effects.before,{
		right: function (m) {
			if (m.dir == 1) {
				m.e.prepend($('>' + m.opts.item, m.e).eq(1));
				m.e.css('left', '-' + m.size + 'px');
			} else {
				$('>' + m.opts.item + ':last', m.e).insertAfter($('>' + m.opts.item + ':first', m.e));
			}
		},
		top: function (m) {
			if (m.dir == -1) {
				m.e.prepend($('>' + m.opts.item + ':last', m.e));
				m.e.css('top', '-' + m.size + 'px');
			} else {
				$('>' + m.opts.item + '[data-position=' + m.current + ']', m.e).insertAfter($('>' + m.opts.item + ':first', m.e));
			}
		},
		bottom: function (m) {
			if (m.dir == 1) {
				m.e.prepend($('> ' + m.opts.item, m.e).eq(1));
				m.e.css('top', '-' + m.size + 'px');
			} else {
				$('>' + m.opts.item + ':last', m.e).insertAfter($('>' + m.opts.item + ':first', m.e));
			}
		},
		legend: function (m) {
			m.opts.legendContainer.fadeOut(m.opts.legendSpeed);
		},
		multiple: function (m) {
			if (m.dir == -1) {
				for (var i = 0; i < m.nb_move; i++)
					m.e.prepend($('> ' + m.opts.item + ':last', m.e));
				m.e.css('left', '-' + m.size + 'px');
			}
		}
	});
	$.extend($.fn.moodular.effects.after,{
		right: function (m) {
			if (m.dir == 1) {
				m.e.append($('> ' + m.opts.item, m.e).eq(1));
			} else {
				$('>' + m.opts.item + ':first', m.e).insertAfter($('>' + m.opts.item, m.e).eq(1));
				m.e.css('left', 0);
			}
		},
		top: function (m) {
			if (m.dir == 1) {
				m.e.append($('> ' + m.opts.item + ':first', m.e));
				m.e.css('top', 0);
			}
		},
		bottom: function (m) {
			if (m.dir == 1) {
				m.e.append($('> ' + m.opts.item, m.e).eq(1));
			} else {
				$('>' + m.opts.item + ':first', m.e).insertAfter($('>' + m.opts.item, m.e).eq(1));
				m.e.css('top', 0);
			}
		},
		fade: function (m) {
			$('>' + m.opts.item, m.e).css('z-index', 1);
			$('>' + m.opts.item + '[data-position=' + m.current + ']', m.e).css('z-index', 2);
		},
		legend: function (m) {
			m.opts.legendContainer.html($('.legend', $('> ' + m.opts.item + '[data-position=' + m.current + ']', m.e)).html()).fadeIn(m.opts.legendSpeed);
		},
		multiple: function (m) {
			if (m.dir == 1) {
				for (var i = 0; i < m.nb_move; i++)
					m.e.append($('> ' + m.opts.item + ':first', m.e));
				m.e.css('left', 0);
			}
			m.current = $('>' + m.opts.item, m.e).data('position');
			m.nb_move = 1;
		}
	});
	$.extend($.fn.moodular.effects.resize,{
		right: function (m) {
			m.size = parseInt(m.e.parent().width());
			m.e.width(2 * m.size + 'px');
			$('> ' + m.opts.item, m.e).width(m.size);
		},
		top: function (m) {
			m.size = parseInt(m.e.parent().height());
			m.e.height(2 * m.size + 'px');
			$('>' + m.opts.item, m.e).height(m.size);
		},
		bottom: function (m) {
			m.size = parseInt(m.e.parent().height());
			m.e.height(2 * m.size + 'px');
			$('>' + m.opts.item, m.e).height(m.size);
		},
		multiple: function (m) {
			m.size = parseInt(m.e.parent().width());
			m.e.width(2 * m.size + 'px');
			var mif = $('>' + m.opts.item + ':first', m.e);
			if (m.vertical) {
				m.size = parseInt(mif.outerHeight(true));
			} else {
				m.size = parseInt(mif.outerWidth(true));
			}
		}
	});
});