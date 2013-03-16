/**
 * Copyright (c) 2013 Sylvain "GouZ" Gougouzian (sylvain@gougouzian.fr) 
 * MIT (http://www.opensource.org/licenses/mit-license.php) licensed.
 * GNU GPL (http://www.gnu.org/licenses/gpl.html) licensed.
 */! function($) {
	var Moodular = function(content, opts, ctrls, fxs) {
		this.opts = opts;
		this.ctrls = ctrls;
		this.fxs = fxs;
		this.$element = $(content);
		this.current = 0;
		this.next = -1;
		this.items = $('>' + this.opts.selector, this.$element);
		this.nbItems = this.items.length;
		this.init();
	};
	Moodular.prototype = {
		init : function() {
			this.$element.css('position', 'relative');
			this.items.css({
				position : 'absolute',
				top : 0,
				left : 0
			});
			var that = this;
			this.$element.on('moodular.prev', function () {
				if (that.next == -1) {
					that.next = that.current - that.opts.step;
					if (that.next < 0)
						that.next += that.nbItems;
				}
			}).on('moodular.next', function () {
				if (that.next == -1)
					that.next = (that.current + that.opts.step) % that.nbItems;
			}).on('moodular.prev moodular.next', function () {
				that.stop();
				that.items.removeClass('active').eq(that.next).addClass('active');
			});
			var fxs = this.opts.effects.split(' ');
			for (var i in fxs)
			if ($.isFunction(this.fxs[fxs[i]]))
				this.fxs[fxs[i]](this);
			var ctrls = this.opts.controls.split(' ');
			for (var i in ctrls)
			if ($.isFunction(this.ctrls[ctrls[i]]))
				this.ctrls[ctrls[i]](this);
			this.$element.on('moodular.prev moodular.next', function () {
				that.current = that.next;
				that.next = -1;
				that.start();
			});
			this.items.eq(0).addClass('active');
			this.start();
		},
		start : function() {
			var that = this;
			if (this.opts.timer)
				this.timer = setTimeout(function () {
					that.$element.trigger('moodular.next');
				}, this.opts.timer);
		},
		stop : function() {
			clearInterval(this.timer);
		},
		moveTo: function (to) {
			this.next = to % this.nbItems;
			this.$element.trigger('moodular.next');
		}
	};
	$.fn.moodular = function(option, param) {
		return this.each(function() {
			var $this = $(this), 
				data = $this.data('moodular'), 
				opts = $.extend({}, $.fn.moodular.defaults, $this.data(), typeof option == 'object' && option), 
				ctrls = $.extend({}, $.fn.moodular.controls), 
				fxs = $.extend({}, $.fn.moodular.effects);
			if (!data)
				$this.data('moodular', ( data = new Moodular(this, opts, ctrls, fxs)));
			if ( typeof option == 'string')
				data[option](param);
		})
	};
	$.fn.moodular.defaults = {
		speed : 500,
		timer : 0,
		step : 1,
		effects : '',
		controls : '',
		easing : '',
		selector: 'li'
	};
	$.fn.moodular.controls = {};
	$.fn.moodular.effects = {}
}(window.jQuery);
!function($){$.extend($.fn.moodular.effects, {
left:function(m) {
	if (typeof m.opts.view === "undefined")
		m.opts.view = 1;
	var percent = 100 / m.opts.view;
	m.items.css('left', '100%').width(percent + '%')
	for (var i = 0; i < (m.opts.view + m.opts.step); i++)
		m.items.eq(i).css('left', i * percent + '%');
	var s = '=' + percent * m.opts.step + '%';
	m.$element.on('moodular.next', function() {
		if (m.opts.view == 1) {
			m.items.eq(m.current).stop().css('left', 0).animate({
				'left': '-' + s
			}, m.opts.speed, m.opts.easing, function() {
				$(this).css('left', '-100%');
			});
			m.items.eq(m.next).stop().css('left', '100%').animate({
				'left': 0
			}, m.opts.speed, m.opts.easing);
		} else if (m.opts.view < m.nbItems) 
			for (var i = 0; i < (m.opts.view + m.opts.step); i++)
				m.items.eq((m.current + i) % m.nbItems).stop().css('left', i * percent + '%').animate({
					'left': '-' + s
				}, m.opts.speed, m.opts.easing);
	}).on('moodular.prev', function() {
		if (m.opts.view == 1) {
			m.items.eq(m.current).stop().css('left', 0).animate({
				'left': '+' + s
			}, m.opts.speed, m.opts.easing, function() {
				$(this).css('left', '100%');
			});
			m.items.eq(m.next).stop().css('left', '-100%').animate({
				'left': 0
			}, m.opts.speed, m.opts.easing);
		} else if (m.opts.view < m.nbItems) {
			for (var i = 0; i < m.opts.view; i++)
				m.items.eq((m.current + i) % m.nbItems).stop().css('left', i * percent + '%').animate({
					'left': '+' + s
				}, m.opts.speed, m.opts.easing);
			for (var i = 1; i <= m.opts.step; i++)
				m.items.eq((m.current - i) % m.nbItems).stop().css('left', - i * percent + '%').animate({
					'left': '+' + s
				}, m.opts.speed, m.opts.easing);
		}
	})
},
right:function(m) {
	if (typeof m.opts.view === "undefined")
		m.opts.view = 1;
	var percent = 100 / m.opts.view;
	m.items.css('left', '100%').width(percent + '%')
	for (var i = 0; i < (m.opts.view + m.opts.step); i++)
		m.items.eq(i).css('left', 100 - (i + 1) * percent + '%');
	var s = '=' + percent * m.opts.step + '%';
	m.$element.on('moodular.next', function() {
		if (m.opts.view == 1) {
			m.items.eq(m.current).stop().css('left', 0).animate({
				'left': '+' + s
			}, m.opts.speed, m.opts.easing, function() {
				$(this).css('left', '100%');
			});
			m.items.eq(m.next).stop().css('left', '-100%').animate({
				'left': 0
			}, m.opts.speed, m.opts.easing);
		} else if (m.opts.view < m.nbItems) 
			for (var i = (0 - m.opts.step); i < (m.opts.view + m.opts.step); i++)
				m.items.eq((m.current + i) % m.nbItems).stop().css('left', 100 - (i + 1) * percent + '%').animate({
					'left': '+' + s
				}, m.opts.speed, m.opts.easing);
	}).on('moodular.prev', function() {
		if (m.opts.view == 1) {
			m.items.eq(m.current).stop().css('left', 0).animate({
				'left': '-' + s
			}, m.opts.speed, m.opts.easing, function() {
				$(this).css('left', '-100%');
			});
			m.items.eq(m.next).stop().css('left', '100%').animate({
				'left': 0
			}, m.opts.speed, m.opts.easing);
		} else if (m.opts.view < m.nbItems) {
			for (var i = 0; i < m.opts.view; i++)
				m.items.eq((m.current + i) % m.nbItems).stop().css('left', 100 - (i + 1) * percent + '%').animate({
					'left': '-' + s
				}, m.opts.speed, m.opts.easing);
			for (var i = 1; i <= m.opts.step; i++)
				m.items.eq((m.current - i) % m.nbItems).stop().css('left', 100 + (i - 1) * percent + '%').animate({
					'left': '-' + s
				}, m.opts.speed, m.opts.easing);
		}
	})
},
top:function(m) {
	if (typeof m.opts.view === "undefined")
		m.opts.view = 1;
	var percent = 100 / m.opts.view;
	m.items.css('top', '100%').height(percent + '%')
	for (var i = 0; i < (m.opts.view + m.opts.step); i++)
		m.items.eq(i).css('top', i * percent + '%');
	var s = '=' + percent * m.opts.step + '%';
	m.$element.on('moodular.next', function() {
		if (m.opts.view == 1) {
			m.items.eq(m.current).stop().css('top', 0).animate({
				'top': '-' + s
			}, m.opts.speed, m.opts.easing, function() {
				$(this).css('top', '-100%');
			});
			m.items.eq(m.next).stop().css('top', '100%').animate({
				'top': 0
			}, m.opts.speed, m.opts.easing);
		} else if (m.opts.view < m.nbItems) 
			for (var i = 0; i < (m.opts.view + m.opts.step); i++)
				m.items.eq((m.current + i) % m.nbItems).stop().css('top', i * percent + '%').animate({
					'top': '-' + s
				}, m.opts.speed, m.opts.easing);
	}).on('moodular.prev', function() {
		if (m.opts.view == 1) {
			m.items.eq(m.current).stop().css('top', 0).animate({
				'top': '+' + s
			}, m.opts.speed, m.opts.easing, function() {
				$(this).css('top', '100%');
			});
			m.items.eq(m.next).stop().css('top', '-100%').animate({
				'top': 0
			}, m.opts.speed, m.opts.easing);
		} else if (m.opts.view < m.nbItems) {
			for (var i = 0; i < m.opts.view; i++)
				m.items.eq((m.current + i) % m.nbItems).stop().css('top', i * percent + '%').animate({
					'top': '+' + s
				}, m.opts.speed, m.opts.easing);
			for (var i = 1; i <= m.opts.step; i++)
				m.items.eq((m.current - i) % m.nbItems).stop().css('top', - i * percent + '%').animate({
					'top': '+' + s
				}, m.opts.speed, m.opts.easing);
		}
	})
},
bottom:function(m) {
	if (typeof m.opts.view === "undefined")
		m.opts.view = 1;
	var percent = 100 / m.opts.view;
	m.items.css('top', '100%').height(percent + '%')
	for (var i = 0; i < (m.opts.view + m.opts.step); i++)
		m.items.eq(i).css('top', 100 - (i + 1) * percent + '%');
	var s = '=' + percent * m.opts.step + '%';
	m.$element.on('moodular.next', function() {
		if (m.opts.view == 1) {
			m.items.eq(m.current).stop().css('top', 0).animate({
				'top': '+' + s
			}, m.opts.speed, m.opts.easing, function() {
				$(this).css('top', '100%');
			});
			m.items.eq(m.next).stop().css('top', '-100%').animate({
				'top': 0
			}, m.opts.speed, m.opts.easing);
		} else if (m.opts.view < m.nbItems) 
			for (var i = (0 - m.opts.step); i < (m.opts.view + m.opts.step); i++)
				m.items.eq((m.current + i) % m.nbItems).stop().css('top', 100 - (i + 1) * percent + '%').animate({
					'top': '+' + s
				}, m.opts.speed, m.opts.easing);
	}).on('moodular.prev', function() {
		if (m.opts.view == 1) {
			m.items.eq(m.current).stop().css('top', 0).animate({
				'top': '-' + s
			}, m.opts.speed, m.opts.easing, function() {
				$(this).css('top', '-100%');
			});
			m.items.eq(m.next).stop().css('top', '100%').animate({
				'top': 0
			}, m.opts.speed, m.opts.easing);
		} else if (m.opts.view < m.nbItems) {
			 for (var i = 0; i < m.opts.view; i++)
				m.items.eq((m.current + i) % m.nbItems).stop().css('top', 100 - (i + 1) * percent + '%').animate({
					'top': '-' + s
				}, m.opts.speed, m.opts.easing);
			for (var i = 1; i <= m.opts.step; i++)
				m.items.eq((m.current - i) % m.nbItems).stop().css('top', 100 + (i - 1) * percent + '%').animate({
					'top': '-' + s
				}, m.opts.speed, m.opts.easing);
		}
	})
},
fade:function(m) {
	m.items.css({
		opacity: 0,
		'z-index': 1
	}).eq(0).css({
		opacity: 1,
		'z-index': 2
	})
	m.$element.on('moodular.prev moodular.next', function() {
		m.items.eq(m.current).stop().animate({
			opacity: 0
		}, m.opts.speed, m.opts.easing, function() {
			$(this).css('z-index', 1);
		});
		m.items.eq(m.next).stop().animate({
			opacity: 1
		}, m.opts.speed, m.opts.easing, function() {
			$(this).css('z-index', 2);
		});
	})
},
slide:function (m) {
	if (typeof m.opts.direction === "undefined")
		m.opts.direction = 'left';
	m.items.css('z-index', 1).eq(0).css('z-index', 2);
	var a = {};
	if (m.opts.direction == 'top')
		a['top'] = '-100%';
	else if (m.opts.direction == 'bottom')
		a['top'] = '100%';
	else if (m.opts.direction == 'right')
		a['left'] = '100%';
	else
		a['left'] = '-100%';
	m.$element.on('moodular.next', function() {
		m.items.eq(m.next).css('z-index', 2);
		m.items.eq(m.current).css('z-index', 3).stop().animate(a, m.opts.speed, m.opts.easing, function() {
			$(this).css({
				'z-index' : 1,
				left: 0,
				top: 0
			});
		});
	});
	m.$element.on('moodular.prev', function() {
		m.items.css('z-index', 1);
		m.items.eq(m.current).css('z-index', 2);
		m.items.eq(m.next).css('z-index', 3).css(a).stop().animate({
			left: 0,
			top: 0
		}, m.opts.speed, m.opts.easing, function () {
			m.items.css('z-index', 1);
			$(this).css('z-index', 2);
		});
	});
},
mosaic:function (m) {
	if (typeof m.opts.slices === "undefined")
		m.opts.slices = [1,1];
	if (typeof m.opts.mode === "undefined")
		m.opts.mode = 'random';
	m.items.hide().eq(0).show();
	var h = m.opts.slices[1],
		v = m.opts.slices[0],
		_w = m.$element.width(),
		_h = m.$element.height(),
		W = _w / v,
		H = _h / h;
	m.$element.on('moodular.prev moodular.next', function() {
		$('#mosaic_wrapper', m.$element).remove();
		m.items.hide().eq(m.next).show().css('z-index', 1);
		var C = m.items.eq(m.current).html();
			c = '';
		for(var i = 0; i < v; i++)
			for(var j = 0; j < h; j++)
				c += '<div style="position:absolute;left:' + (i * W) + 'px;top:' + (j * H) + 'px;width:' + W + 'px;height:' + H + 'px;overflow:hidden;"><div style="margin-left:-' + (i * W) + 'px;margin-top:-' + (j * H) + 'px;width:' + _w + 'px;height:' + _h + 'px">' + C + '</div></div>';
		m.$element.prepend('<' + m.opts.selector + ' id="mosaic_wrapper" style="z-index:2;position:absolute;">' + c + '</div>');
		$('#mosaic_wrapper>div', m.$element).css('opacity', 1).each(function (k) {
			var $this = $(this);
			var n = h * v,
				r;
			if (m.opts.mode == 'random')
				r = m.opts.speed * 0.5 * Math.ceil(Math.random() * (n - 1)) / n;
			else if (m.opts.mode == 'crawler')
				r = m.opts.speed * 0.5 * k / n;
			setTimeout(function () {
				$this.animate({
					opacity: 0
				}, r, m.opts.easing);
			}, r);
		});
		clearTimeout(m.mTimer);
		m.mTimer = setTimeout(function () {
			$('#mosaic_wrapper', m.$element).remove();
		}, m.opts.speed);
	})
},
stripes:function (m) {
	if (typeof m.opts.stripes === "undefined")
		m.opts.stripes = 1;
	if (typeof m.opts.orientation === "undefined")
		m.opts.orientation = 'vertical';
	m.items.hide().eq(0).show();
	var ns = m.opts.stripes,
			_w = 'width',
			_h = 'height',
			o = m.opts.orientation == 'vertical' ? _w : _h,
			__o = o == _w,
			_o = __o ? _h : _w,
			d = __o ? 'left' : 'top',
			_d = __o ? 'top' : 'left',
			s = parseInt(m.$element.css(o)),
			_s = parseInt(m.$element.css(_o)),
			S = s / ns;
	m.$element.on('moodular.prev moodular.next', function() {
		$('#stripes_wrapper', m.$element).remove();
		m.items.hide().eq(m.next).show().css('z-index', 1);
		var C = m.items.eq(m.current).html();
			c = '';
		for(var i = 0; i < ns; i++)
			c += '<div style="position:absolute;' + d + ':' + (i * S) + 'px;' + _d + ':' + '0;' + o + ':' + S + 'px;' + _o + ':' + _s + 'px;overflow:hidden;"><div style="margin-' + d + ':-' + (i * S) + 'px;' + o + ':' + s + 'px;' + _o + ':' + _s + 'px">' + C + '</div></div>';
		m.$element.prepend('<' + m.opts.selector + ' id="stripes_wrapper" style="z-index:2;position:absolute;">' + c + '</div>');
		$('#stripes_wrapper>div', m.$element).each(function (i) {
			var a = {};
			a[_d] = i%2 ? '100%' : '-100%';
			$(this).animate(a, m.opts.speed * 0.75, m.opts.easing);
		});
		clearTimeout(m.mTimer);
		m.mTimer = setTimeout(function () {
			$('#stripes_wrapper', m.$element).remove();
		}, m.opts.speed);
	})
}
})}(window.jQuery);
!function($){$.extend($.fn.moodular.controls, {
keys:function(m) {
	if (typeof m.opts.keyPrev === "undefined")
		m.opts.keyPrev = 37;
	if (typeof m.opts.keyNext === "undefined")
		m.opts.keyNext = 39;
	$(document).on('keydown', function(event) {
		if (event.keyCode == m.opts.keyPrev) {
			m.$element.trigger('moodular.prev');
			return false;
		} else if (event.keyCode == m.opts.keyNext) {
			m.$element.trigger('moodular.next');
			return false;
		}
	});
},
buttons:function(m) {
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
},
touch:function(m) {
	var touchb = null, 
		touche = null;
	m.$element.on('touchstart', function(event) {
		var e = event.originalEvent;
		touchb = e.targetTouches[0].pageX;
	}).on('touchmove', function(event) {
		event.preventDefault();
		var e = event.originalEvent;
		touche = e.targetTouches[0].pageX;
	}).on('touchend', function() {
		if (touchb > touche)
			m.$element.trigger('moodular.next');
		else if (touchb < touche)
			m.$element.trigger('moodular.prev');
		touchb = null;
		touche = null;
		return false;
	});
},
pagination:function(m) {
	var lis = '';
	for (var i = 0; i < m.nbItems; i++)
		lis += '<li><a href="#" data-index="' + i + '">' + (i + 1) + '</a></li>';
	m.opts.pagination.append(lis);
	$('>li>a', m.opts.pagination).on('click', function() {
		if (!$(this).parent().hasClass('active'))
			m.moveTo($(this).data('index'));
		return false;
	});
	$('>li', m.opts.pagination).eq(0).addClass('active')
	m.$element.on('moodular.prev moodular.next', function() {
		$('>li', m.opts.pagination).removeClass('active').eq(m.next).addClass('active');
	})
},
stopOnMouseOver:function (m) {
	m.$element.on('mouseenter', function () {
		m.stop();
	}).on('mouseleave', function () {
		m.start();
	});
},
nav:function(m) {
	if (typeof m.opts.navView === "undefined")
		m.opts.navView = m.nbItems;
	if (typeof m.opts.navEffects === "undefined")
		m.opts.navEffects = "";
	if (typeof m.opts.navControls === "undefined")
		m.opts.navControls = "";
	if (typeof m.opts.navButtonPrev === "undefined")
		m.opts.navButtonPrev = "";
	if (typeof m.opts.navButtonNext === "undefined")
		m.opts.navButtonNext = "";
	if (typeof m.opts.navSelector === "undefined")
		m.opts.navSelector = "li";
	m.opts.navWrapper.moodular({
		timer: m.opts.timer,
		view : m.opts.navView,
		effects : m.opts.navEffects,
		controls : m.opts.navControls,
		buttonPrev : m.opts.navButtonPrev,
		buttonNext : m.opts.navButtonNext,
		speed : m.opts.speed
	});
	m.opts.timer = 0;
	var n = m.opts.navWrapper.data('moodular');
	n.$element.on('moodular.next', function () {
		m.next = n.current;
		m.$element.trigger('moodular.next');
	}).on('moodular.prev', function () {
		m.next = n.current;
		m.$element.trigger('moodular.prev');
	});
	$(m.opts.navSelector, m.opts.navWrapper).each(function(i) {
		$(this).data('index', i);
	}).on('mouseenter', function() {
		n._current = n.current;
		n.stop();
		$('>li', m.opts.navWrapper).removeClass('active');
		$(this).addClass('active');
		m.next = $(this).data('index');
		var _speed = m.opts.speed;
		m.opts.speed = 0;
		m.$element.trigger('moodular.next');
		m.opts.speed = _speed;
	}).on('mouseleave', function() {
		n.current = n._current;
		n.next = -1;
		n.start();
	});
}
})}(window.jQuery);