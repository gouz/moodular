/**
 * Moodular - Carousel Framework
 * Copyright (c) 2014 Sylvain "GouZ" Gougouzian (sylvain@gougouzian.fr)
 * MIT (http://www.opensource.org/licenses/mit-license.php) licensed.
 * GNU GPL (http://www.gnu.org/licenses/gpl.html) licensed.
 */
!function($) {
	'use strict';
	var Moodular = function(content, opts, ctrls, fxs) {
		this.version = '4.4';
		this.opts = opts;
		this.ctrls = ctrls;
		this.fxs = fxs;
		this.$element = $(content);
		this.init();
	};
	Moodular.prototype = {
		init : function() {
			this.current = 0;
			this.next = -1;
			this.items = $('>' + this.opts.selector, this.$element);
			this.nbItems = this.items.length;
			this.$element.css('position', 'relative');
			this.items.css({
				position : 'absolute',
				top : 0,
				left : 0
			});
			var that = this;
			this.$element.on('moodular.prev', function() {
				if (that.next == -1) {
					that.next = that.current - that.opts.step;
					if (that.next < 0)
						that.next += that.nbItems;
				}
			}).on('moodular.next', function() {
				if (that.next == -1)
					that.next = (that.current + that.opts.step) % that.nbItems;
			}).on('moodular.prev moodular.next', function() {
				that.stop();
				that.items.removeClass('active').eq(that.next).addClass('active');
			}).on('moodular.end', function() {
				if (that.opts.timer)
					that.timer = setTimeout(function() {
						that.start();
					}, that.opts.timer);
			});
			var fxs = this.opts.effects.split(' ');
			for (var i in fxs)
				if ($.isFunction(this.fxs[fxs[i]]))
					this.fxs[fxs[i]](this);
			var ctrls = this.opts.controls.split(' ');
			for (var i in ctrls)
				if ($.isFunction(this.ctrls[ctrls[i]]))
					this.ctrls[ctrls[i]](this);
			this.$element.on('moodular.prev moodular.next', function() {
				that.current = that.next;
				that.next = -1;
				that.speedTimer = setTimeout(function() {
					that.$element.trigger('moodular.end');
				}, that.opts.speed);
			});
			this.items.eq(0).addClass('active');
			if (this.opts.timer)
				this.timer = setTimeout(function () {
					that.start();
				}, this.opts.timer);
		},
		start : function() {
			this.$element.trigger('moodular.next');
		},
		stop : function() {
			clearTimeout(this.timer);
			clearTimeout(this.speedTimer);
		},
		moveTo : function(to, pn) {
			var n = to % this.nbItems;
			if (n != this.current) {
				this.next = n;
				this.$element.trigger('moodular.' + (pn == 'prev' ? 'prev' : 'next'));
			}
		}
	};
	$.fn.moodular = function(option, param1, param2) {
		return this.each(function() {
			var $this = $(this), 
				data = $this.data('moodular');
			if (!data)
				$this.data('moodular', (data = new Moodular(this, $.extend({}, $.fn.moodular.defaults, $this.data(), typeof option == 'object' && option), $.extend({}, $.fn.moodular.controls), $.extend({}, $.fn.moodular.effects))));
			if (typeof option == 'string')
				data[option](param1, param2);
		});
	};
	$.fn.moodular.defaults = {
		speed : 500,
		timer : 0,
		step : 1,
		effects : '',
		controls : '',
		easing : '',
		selector : 'li',
		queue : false
	};
	$.fn.moodular.controls = {};
	$.fn.moodular.effects = {};
}(window.jQuery); 
