/**
 * Copyright (c) 2012 Sylvain Gougouzian (sylvain@gougouzian.fr) MIT
 * (http://www.opensource.org/licenses/mit-license.php) licensed. GNU GPL
 * (http://www.gnu.org/licenses/gpl.html) licensed.
 */
jQuery(function($) {
	$.fn.moodular = function(options) {
		var el = new Array();
		var opts = $.extend( {}, $.fn.moodular.defaults, options);
		var ctrls = $.extend( {}, $.fn.moodular.controls);
		var effects = $.extend( {}, $.fn.moodular.effects);
		this.each(function(i) {
			el[i] = new $moodular(this, opts, ctrls, effects);
		});
		return opts.api ? (el.length == 1 ? el[0] : el) : null;
	};
	$.moodular = function(e, opts, ctrls, effects) {
		this.e = $(e);
		if (opts.random) {
			var elems = $('>' + opts.item, this.e);
			elems.sort(function() {
				return (Math.round(Math.random()) - 0.5);
			});
			this.e.html('');
			for ( var i = 0; i < elems.length; i++)
				this.e.append(elems[i]);
		}
		$('>' + opts.item, this.e).each(function(i) {
			$(this).attr('data-position', i);
		});
		this.nbItems = $('>' + opts.item, this.e).length;
		this.current = 0;
		this.dir = 1;
		this.locked = false;
		this.temp = new Array();
		this.timerMoving = null;
		this.opts = opts;
		this.controls = ctrls;
		this.effects = effects;
		if (this.nbItems > 1)
			this._init();
	};
	var $moodular = $.moodular;
	$moodular.fn = $moodular.prototype = {
		moodular : '3.1'
	};
	$moodular.fn.extend = $moodular.extend = $.extend;
	$moodular.fn.extend( {
		_init : function() {
			var self = this;
			this.e.wrap('<div class="moodular_wrapper"></div>');
			this.e.parent().css( {
				'position' : 'relative',
				'overflow' : 'hidden',
				'width' : this.e.width(),
				'height' : this.e.height()
			});
			this.e.css( {
				'position' : 'absolute',
				'left' : 0,
				'top' : 0
			});
			this.control = this.opts.controls.split(' ');
			this.effect = this.opts.effects.split(' ');
			this._resize();
			if (this.opts.percentSize != 0) {
				$(window).bind('resize', function() {
					self._resizePercent();
				});
			}
			var i;
			$('>' + this.opts.item + ':first', this.e).addClass('current');
			for (i = 0; i < this.control.length; i++) {
				if ($.isFunction(this.controls.init[this.control[i]]))
					this.controls.init[this.control[i]](this);
			}
			for (i = 0; i < this.effect.length; i++) {
				if ($.isFunction(this.effects.init[this.effect[i]]))
					this.effects.init[this.effect[i]](this);
			}
			if (this.opts.auto) {
				this.timerMoving = setTimeout(function() {
					self.next();
				}, self.opts.dispTimeout);
			}
		},
		_resize : function() {
			var i;
			for (i = 0; i < this.effect.length; i++) {
				if ($.isFunction(this.effects.resize[this.effect[i]]))
					this.effects.resize[this.effect[i]](this);
			}
		},
		_resizePercent : function() {
			var tmp = this.e.parent().parent().width();
			this.e.parent().width(tmp * this.opts.percentSize);
			this._resize();
		},
		_move : function() {
			var i;
			for (i = 0; i < this.control.length; i++) {
				if ($.isFunction(this.controls.before[this.control[i]]))
					this.controls.before[this.control[i]](this);
			}
			for (i = 0; i < this.effect.length; i++) {
				if ($.isFunction(this.effects.before[this.effect[i]]))
					this.effects.before[this.effect[i]](this);
			}
			var self = this;
			if ($.isFunction(this.opts.move)) {
				this.opts.move(this, function() {
					self._afterMoving();
				});
			} else {
				var m = false;
				for (i = 0; i < this.effect.length; i++) {
					if ($.isFunction(this.effects.move[this.effect[i]])) {
						m = true;
						this.effects.move[this.effect[i]](this, function() {
							self._afterMoving();
						});
					}
				}
				if (!m) this._afterMoving();
			}
		},
		_afterMoving : function() {
			var self = this;
			for (i = 0; i < this.control.length; i++) {
				if ($.isFunction(this.controls.after[this.control[i]]))
					this.controls.after[this.control[i]](this);
			}
			for (i = 0; i < this.effect.length; i++) {
				if ($.isFunction(this.effects.after[this.effect[i]]))
					this.effects.after[this.effect[i]](this);
			}
			for (i = 0; i < this.opts.callbacks.length; i++) {
				this.opts.callbacks[i](this);
			}
			$('>' + this.opts.item, this.e).removeClass('current');
			$('>' + this.opts.item + '[data-position=' + this.current + ']', this.e).addClass('current');
			this.locked = false;
			this.dir = 1;
			if (this.opts.auto) {
				this.timerMoving = setTimeout(function() {
					self.next();
				}, this.opts.dispTimeout);
			}
		},
		start : function() {
			this.next();
			return false;
		},
		stop : function() {
			clearTimeout(this.timerMoving);
			return false;
		},
		next : function() {
			this.moveTo(parseInt(this.current) + 1);
			return false;
		},
		prev : function() {
			this.dir = -1;
			this.moveTo(parseInt(this.current) - 1);
			return false;
		},
		moveTo : function(n) {
			if (!this.locked) {
				this.locked = true;
				clearTimeout(this.timerMoving);
				if (n >= this.nbItems)
					n -= this.nbItems;
				if (n < 0)
					n += this.nbItems;
				this.current = n;
				this._move();
			}
		}
	});
	$.fn.moodular.defaults = {
		item : 'li',
		controls : '',
		effects : 'left',
		easing : '',
		auto : true,
		speed : 1000,
		dispTimeout : 3000,
		callbacks : [],
		random : false,
		percentSize : 0,
		api : false
	};
	$.fn.moodular.controls = {
		callback : {}
	};
	$.fn.moodular.effects = {
		init : {},
		move : {
			left: function (c, b) {
				c.e.animate( {
					left : (c.dir == 1 ? '-=' : '+=') + c.size + 'px'
				}, c.opts.speed, c.opts.easing, function() {
					b();
				});
			}
		},
		before : {
			left : function(m) {
				if (m.dir == -1) {
					m.e.prepend($('> ' + m.opts.item + ':last', m.e));
					m.e.css('left', '-' + m.size + 'px');
				} else {
					$('>' + m.opts.item + '[data-position=' + m.current + ']', m.e).insertAfter($('>' + m.opts.item + ':first', m.e));
				}
			}
		},
		after : {
			left : function(m) {
				if (m.dir == 1) {
					m.e.append($('> ' + m.opts.item + ':first', m.e));
					m.e.css('left', 0);
				}
			}
		},
		resize : {
			left: function (m) {
				m.size = parseInt(m.e.parent().width());
				m.e.width(2 * m.size + 'px');
				$('> ' + m.opts.item, m.e).width(m.size);
			}
		}
	};
	$.fn.moodular.controls = {
		init : {},
		before : {},
		after : {}
	};
});
