/**
 * Copyright (c) 2009 Sylvain Gougouzian (sylvain@gougouzian.fr)
 * MIT (http://www.opensource.org/licenses/mit-license.php) licensed.
 * GNU GPL (http://www.gnu.org/licenses/gpl.html) licensed.
 *
 * jQuery moodular effects by Sylvain Gougouzian http://sylvain.gougouzian.fr
 *
 * Requires: jQuery 1.3.2+ 	// http://www.jquery.com
 *			jQuery corner plugin 2.01 // http://jquery.malsup.com/corner/
 *
 * Compatible : Internet Explorer 6+, Firefox 1.5+, Safari 3+, Opera 9+, Chrome 0.9+
 */

jQuery(function($) {
	$.extend($.fn.moodular.effects.init,{
		align: function (moodular) {
			$('> ' + moodular.opts.item + ' > img', moodular.e).load(function () {
				$(this).css('margin-top', parseInt(($(this).parent().height() - $(this).height()) / 2) + "px");
			});
		},
		corner: function (moodular) {
			$.fn.corner.defaults.useNative = false;
			$('> ' + moodular.opts.item, moodular.e).corner("10px");
		},
		reflection: function (moodular) {
			moodular.e.parent().height(parseInt(moodular.e.parent().height()) * 1.33);
			$(moodular.opts.item + ' > img', moodular.e).load(function () {
				reflect(this);
				$(this).parent().height(parseInt($(this).parent().height()) * 1.33);
			});
		},
		fade: function (moodular) {
			$('> ' + moodular.opts.item, moodular.e).each(function(i){
				if (i > (moodular.nbItems / 2)) {
					$(this).remove();
				}
			});
			moodular.opts.scroll = 1;
			moodular.opts.move = function (c, b) {
				c.locked = false;
				c.e.css({
					top: 0,
					left: 0
				});
				setTimeout(function () { 
					clearTimeout(c.timerMoving);
					$('.position_' + c.current, c.e).fadeOut(c.opts.speed); 
					$('.position_' + c._realpos(c.current + c.dep), c.e).fadeIn(c.opts.speed, function () { b(); }); 
				}, c.opts.dispTimeout);
			};
			$('> ' + moodular.opts.item, moodular.e).each(function (i){
				$(this).css('position', 'absolute').addClass('position_' + i);
			});
			$('> ' + moodular.opts.item, moodular.e).not(':first').hide();
		},
		zoom: function (moodular) {
			$('> ' + moodular.opts.item, moodular.e).each(function(i){
				if (i > (moodular.nbItems / 2)) {
					$(this).remove();
				}
			});
			moodular.opts.scroll = 1;
			moodular.opts.move = function (c, b) {
				c.locked = false;
				c.e.css({
					top: 0,
					left: 0
				});
				setTimeout(function () { 
					clearTimeout(c.timerMoving);
					var $c = $('.position_' + c.current, c.e);
					$c.show();
					var w = $c.width();
					var wi = $('> img', $c).width();
					var h = $c.height();
					var hi = $('> img', $c).height();
					$c.hide();
					$c.fadeOut(c.opts.speed).animate({
						width: (2 * parseInt(w)) + 'px',
						height: (2 * parseInt(h)) + 'px',
						top: ( 0 - parseInt(h) / 2) + 'px',
						left: ( 0 - parseInt(w) / 2) + 'px'
					}, c.opts.speed, function () {
						$(this).css({
							top: 0,
							left: 0,
							width: w,
							height: h
						}).hide();
					}); 
					$('> img', $c).animate({
						width: (2 * parseInt(wi)) + 'px',
						height: (2 * parseInt(hi)) + 'px'
					}, c.opts.speed, function () {
						$(this).css({
							width: wi,
							height: hi
						});
					}); 
					$('.position_' + c._realpos(c.current + c.dep), c.e).fadeIn(c.opts.speed, function () { b(); }); 
				}, c.opts.dispTimeout);
			};
			$('> ' + moodular.opts.item, moodular.e).each(function (i){
				$(this).css('position', 'absolute').addClass('position_' + i);
			});
			$('> ' + moodular.opts.item, moodular.e).not(':first').hide();
		}
	});
	$.extend($.fn.moodular.effects.after,{
		fade: function (c) {
			c.e.css({
				top: 0,
				left: 0
			});
			$('> ' + c.opts.item, c.e).css({
				top: 0,
				left: 0
			}); 
		},
		zoom: function (c) {
			c.e.css({
				top: 0,
				left: 0
			});
			$('> ' + c.opts.item, c.e).css({
				top: 0,
				left: 0
			}); 
		}
	});
	$.extend($.fn.moodular.effects.before,{
		fade: function (c) {
			c.e.css({
				top: 0,
				left: 0
			});
			$('> ' + c.opts.item, c.e).css({
				top: 0,
				left: 0
			}); 
		},
		zoom: function (c) {
			c.e.css({
				top: 0,
				left: 0
			});
			$('> ' + c.opts.item, c.e).css({
				top: 0,
				left: 0
			}); 
		}
	});
	
	function reflect(img) {
		var $this = $(img);
		var w = parseInt($this.width());
		var h = parseInt($this.height());
		var r;
		if ($.browser.msie) {
			r = $("<img />").attr('src', $this.attr('src')).css({
				'width': w,
				'height': h,
				'margin-bottom': h - Math.floor(h * 0.33),
				'filter': "flipv progid:DXImageTransform.Microsoft.Alpha(opacity=50, style=1, finishOpacity=0, startx=0, starty=0, finishx=0, finishy=33)"
			})[0];
		}
		else {
			r = $("<canvas />")[0];
			if (!r.getContext) { return; }
			var f = r.getContext("2d");
			try {
				$(r).attr({
					'width': w,
					'height': Math.floor(h * 0.33)
				});
				f.save();
				f.translate(0, h - 1);
				f.scale(1, -1);
				f.drawImage(img, 0, 0, w, h);
				f.restore();
				f.globalCompositeOperation="destination-out";
				var i = f.createLinearGradient(0, 0, 0, Math.floor(h * 0.33));
				i.addColorStop(0, "rgba(255, 255, 255, 0.5)");
				i.addColorStop(1, "rgba(255, 255, 255, 1.0)");
				f.fillStyle = i;
				f.rect(0, 0, w, Math.floor(h * 0.33));
				f.fill();
			}
			catch (e) {
				return;
			}
		}
		$(r).css('display', 'block');
		$this.parent().css({
			width: w,
			height: h + Math.floor(h * 0.33),
			overflow: "hidden"
		}).append($(r));
		return false;
	}
	function unreflect($this) {
		var html = $this.parent().html();
		$this.parent().parent().html(html);
		return false;
	}
});