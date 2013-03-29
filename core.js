! function($) {
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
			var n = to % this.nbItems;
			if (n != this.current) {
				this.next = n;
				this.$element.trigger('moodular.next');
			}
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
		selector: 'li',
		queue: false
	};
	$.fn.moodular.controls = {};
	$.fn.moodular.effects = {}
}(window.jQuery);