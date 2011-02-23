/**
 * Copyright (c) 2010 Sylvain Gougouzian (sylvain@gougouzian.fr)
 * MIT (http://www.opensource.org/licenses/mit-license.php) licensed.
 * GNU GPL (http://www.gnu.org/licenses/gpl.html) licensed.
 *
 * jQuery moodular version: 2.5
 *
 * Requires: jQuery 1.3.2+ 	// http://www.jquery.com
 * Compatible : Internet Explorer 6+, Firefox 1.5+, Safari 3+, Opera 9+, Chrome 0.9+
 */
jQuery(function($){
	$.fn.moodular = function(options){
		var el = null;
		var opts = $.extend({}, $.fn.moodular.defaults, options);
		var ctrls = $.extend({}, $.fn.moodular.controls);
		var effects = $.extend({}, $.fn.moodular.effects);
		this.each(function(){
			el = new $moodular(this, opts, ctrls, effects);
			$(window).bind('resize', function () { el._resize(); });
		});
		return opts.api ? el : null;
	};
	$.moodular = function(e, opts, ctrls, effects){
		this.e = $(e);
		this.backup = $(e).parent().html();
		if (opts.random) {
			var elems = this.e.children($('> ' + opts.item));
			elems.sort(function() { return (Math.round(Math.random())-0.5); });
			this.e.remove($('> ' + opts.item));
			for(var i=0; i < elems.length; i++)
				this.e.append(elems[i]);
		}
		if (opts.continuous) $(e).html($(e).html() + $(e).html());
		this.aItems = null;
		this.nbItems = 0;
		this.current = 0;
		this.locked = false;
		this.dep = 0;
		this.timerMoving = null;
		this.opts = opts;
		this.controls = ctrls;
		this.effects = effects;
		this.direction = ((opts.direction == 'left') || (opts.direction == 'top') ? 'next' : 'prev');
		this.pos = ((opts.direction == 'left') || (opts.direction == 'right') ? 'left' : 'top');
		this.dir = ((opts.direction == 'right') || (opts.direction == 'bottom') ? -1 : 1);
		this.vertical = (this.pos == 'left' ? false : true);
		this._init();
	};
	var $moodular = $.moodular;
	$moodular.fn = $moodular.prototype = {
		moodular: '2.5'
	};
	$moodular.fn.extend = $moodular.extend = $.extend;
	$moodular.fn.extend({
		_init: function(){
			var self = this;
			this._resize();
			this.e.wrap('<div></div>');
			this.e.parent().css({
				'position' : 'relative',
				'overflow' : 'hidden',
				'width'	: this.e.width(),
				'height' : this.e.height()
			});
			this.e.css({
				'position' : 'absolute'
			});
			s = 0;
			$('> ' + this.opts.item, this.e).each(function() {
				if (this.vertical) {
					s += parseInt($(this).outerHeight(true));
				}
				else {
					s += parseInt($(this).outerWidth(true));
				}
			});
			this.e.css(this.vertical ? 'height' : 'width', s + 'px');
			if (this.e.css(this.pos) == 'auto') this.e.css(this.pos, 0);
			this.aItems = $('> ' + this.opts.item, this.e);
			this.nbItems = this.aItems.length;
			if (!this.opts.continuous) this.nbItems = this.nbItems * 2;
			var control = this.opts.controls.split(' ');
			var i;
			for (i = 0; i < control.length; i++) {
				if ($.isFunction(this.controls[control[i]]))
					this.controls[control[i]](this);
			}
			var effect = this.opts.effects.split(' ');
			for (i = 0; i < effect.length; i++) {
				if ($.isFunction(this.effects.init[effect[i]]))
					this.effects.init[effect[i]](this);
			}
			if (this.opts.startOn) {
				this.speed = this.opts.speed;
				this.opts.speed = 1;
				this.moveTo(this.opts.startOn);
			}
			if (this.opts.auto) {
				setTimeout(function(){
					self._animate('next');
				}, self.opts.dispTimeout);
			}
		},
		_animate: function(dir){
			dir = (dir == undefined ? this.direction : dir);
			if (!this.locked) {
				this.locked = true;
				clearTimeout(this.timerMoving);
				this.dep = this.dep == 0 ? this.opts.scroll : this.dep;
				if (this.dir == -1) {
					if (dir == "next") {
						dir = "prev";
					}
					else if (dir == "prev") {
						dir = "next";
					}
				}
				if (dir != 'next') {
					this.dep *= -1;
				}
				var cont = true;
				if (!this.opts.continuous) {
					if (dir == 'next') {
						if (this.current >= ((this.nbItems / 2) - 1)) {
							cont = false;
							this.locked = false;
						}
					}
					else {
						if (this.current <= 0) {
							cont = false;
							this.locked = false;
						}
					}
				}
				if (cont) {
					this._beforeMoving();
				}
			}
		},
		_beforeMoving: function(){
			var effect = this.opts.effects.split(' ');
			var i;
			for (i = 0; i < effect.length; i++) {
				if ($.isFunction(this.effects.before[effect[i]]))
					this.effects.before[effect[i]](this, (this.dep < 0 ? -1 : 1));
			}
			if (this.dep < 0 && this.opts.continuous) {
				var size = 0;
				for (i = 0; i < Math.abs(this.dep); i++) {
					var item = $('> ' + this.opts.item + ':last', this.e);
					size += parseInt(this.vertical ? item.outerHeight(true) : item.outerWidth(true));
					$('> ' + this.opts.item + ':last', this.e).remove();
					this.e.prepend(item);
				}
				this.e.css(this.pos, -size);
			}
			this._move();
		},
		_move: function(){
			var self = this;
			if ($.isFunction(this.opts.move)) {
				this.opts.move(this, function(){
					self._afterMoving();
				});
			}
			else {
				var size = 0;
				var i;
				if (this.dep > 0) {
					for (i = 0; i < this.dep; i++) {
						if (this.vertical) {
							size += parseInt(this.aItems.eq(this._realpos(this.current) + i).height());
						}
						else {
							size += parseInt(this.aItems.eq(this._realpos(this.current) + i).width());
						}
					}
				}
				else {
					if (!this.opts.continuous && this.current <=0) {}
					else {
						for (i = 0; i < Math.abs(this.dep); i++) {
							if (this.vertical) {
								size += parseInt(this.aItems.eq(this._realpos(this.current) - i).height());
							}
							else {
								size += parseInt(this.aItems.eq(this._realpos(this.current) - i).width());
							}
						}
					}
				}

				var dest = parseInt(this.e.css(this.pos)) + (this.dep > 0 ? -1 : 1) * size;
				if (!this.opts.continuous) {
					if (dest > 0) dest = 0;
					if (this.vertical) {
						if ((parseInt(this.e.height()) + dest) < parseInt(this.e.parent().height())) {
							dest = parseInt(this.e.parent().height()) - parseInt(this.e.height());
						}
					}
					else {
						if ((parseInt(this.e.width()) + dest) < parseInt(this.e.parent().width())) {
							dest = parseInt(this.e.parent().width()) - parseInt(this.e.width()) ;
						}
					}
				}
				if (this.vertical) {
					this.e.stop(true, true).animate({
						top: parseInt(dest) + 'px'
					}, this.opts.speed, this.opts.easing, function(){
						self._afterMoving();
					});
				}
				else {
					this.e.stop(true, true).animate({
						left: parseInt(dest) + 'px'
					}, this.opts.speed, this.opts.easing, function(){
						self._afterMoving();
					});
				}
			}
		},
		_afterMoving: function(){
			var i;
			if (this.dep > 0 && this.opts.continuous) {
				for (i = 0; i < this.dep; i++) {
					var item = $('> ' + this.opts.item + ':first', this.e);
					$('> ' + this.opts.item + ':first', this.e).remove();
					this.e.append(item);
				}
				this.e.css(this.pos, 0);
			}
			var self = this;
			this.current = this.current + this.dep;
			if (this.current == -1) {
				if (this.opts.continuous)
					this.current = this.nbItems - 1;
				else
					this.current = 0;
			}
			else {
				if (this.current == this.nbItems) {
					this.current = 0;
				}
				else {
					this.current = this._realpos(this.current);
				}
			}
			this.dep = 0;
			this.locked = false;
			var effect = this.opts.effects.split(' ');
			for (i = 0; i < effect.length; i++) {
				if ($.isFunction(this.effects.after[effect[i]]))
					this.effects.after[effect[i]](this);
			}
			for (i = 0; i < this.opts.callbacks.length; i++) {
				this.opts.callbacks[i](this);
			}
			var control = this.opts.controls.split(' ');
			for (i = 0; i < control.length; i++) {
				if ($.isFunction(this.controls.callback[control[i]]))
					this.controls.callback[control[i]](this);
			}
			if (this.opts.startOn) {
				this.opts.speed = this.speed;
			}
			if (this.opts.auto) {
				this.timerMoving = setTimeout(function(){
					self._animate('next');
				}, this.opts.dispTimeout);
			}
		},
		_realpos: function(i){
			if (i < 0) i = (this.nbItems / 2) - i;
			return (i < (this.nbItems / 2) ? i : (i - (this.nbItems / 2)));
		},
		_resize: function () {
			var s = $('> ' + this.opts.item, this.e).css(this.vertical ? 'height' : 'width');
			$('> ' + this.opts.item, this.e).each(function() {
				if (this.vertical) {
					$(this).height($(this).height());
				}
				else {
					$(this).width($(this).width());
				}
			});
		},
		reanimate: function() {
			if (!this.opts.auto) {
				this.locked = false;
				this.opts.auto = true;
				var self = this;
				this.timerMoving = setTimeout(function(){
					self._animate('next');
				}, this.opts.dispTimeout);
			}
		},
		start: function(){
			if (!this.opts.auto) {
				this.locked = false;
				this.opts.auto = true;
				this._animate('next');
			}
			return false;
		},
		stop: function(){
			clearTimeout(this.timerMoving);
			this.opts.auto = false;
			return false;
		},
		next: function(){
			this._animate('next');
			return false;
		},
		prev: function(){
			this._animate('prev');
			return false;
		},
		getCurrent: function(){
			return this._realpos(this.current);
		},
		moveTo: function(i){
			if (i > (this.nbItems / 2)) {
				i = (this.nbItems / 2) - 1;
			}
			this.dep = parseInt(i) - parseInt(this.current);
			if (this.dep != 0) {
				this._animate('next');
			}
			return false;
		},
		destroy: function () {
			this.stop();
			this.e.unwrap().parent().html(this.backup); // barbarious
		}
	});
	$.fn.moodular.defaults = {
		item: 'li',
		controls: '',
		effects: '',
		easing: '',
		auto: true,
		continuous: true,
		speed: 2000,
		direction: 'left',
		scroll: 1,
		startOn: 0,
		dispTimeout: 1000,
		callbacks: [],
		random: false,
		api: false
	};
	$.fn.moodular.controls = {
		callback: {}
	};
	$.fn.moodular.effects = {
		init: {},
		before: {},
		after: {}
	};
});