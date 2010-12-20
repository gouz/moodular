/**
 * Copyright (c) 2010 Sylvain Gougouzian (sylvain@gougouzian.fr)
 * MIT (http://www.opensource.org/licenses/mit-license.php) licensed.
 * GNU GPL (http://www.gnu.org/licenses/gpl.html) licensed.
 *
 * jQuery moodular controls by Sylvain Gougouzian http://sylvain.gougouzian.fr
 *
 * Requires: jQuery 1.3.2+ 	// http://www.jquery.com
 * 			jQuery moodular plugin
 *	 		jQuery Mouse Wheel Plugin v3.0.2 // Copyright (c) 2009 [Brandon Aaron] (http://brandonaaron.net)
 *			jQuery UI 1.7.2
 *
 * Compatible : Internet Explorer 6+, Firefox 1.5+, Safari 3+, Opera 9+, Chrome 0.9+
 */
jQuery(function($){
	$.extend($.fn.moodular.controls, {
		keys: function(moodular){
			$(document).keydown(function(event){
				if ((event.keyCode == 39) || (event.keyCode == 40)) {
					moodular._animate('next');
				}
				if ((event.keyCode == 37) || (event.keyCode == 38)) {
					moodular._animate('prev');
				}
			});
			return false;
		},
		click: function(moodular){
			for (var i = 0; i < moodular.nbItems; i++) {
				$('> ' + moodular.opts.item, moodular.e).css('cursor', 'pointer').attr('rel', moodular._realpos(i)).click(function(){
					moodular.locked = false;
					moodular.moveTo($(this).attr('rel'));
					return false;
				});
			}
		},
		stopOver: function (moodular) {
			moodular.e.parent().bind("mouseenter", function(){
				moodular.stop();
			}).bind("mouseleave", function () {
				if (!moodular.locked) { 
					moodular.reanimate();
				} else { 
					moodular.locked = false;
				}
			});
		},
		index: function(moodular){
			moodular.e.parent().parent().append('<ul class="moodular_itemList"></ul>');
			var h = "";
			for (var i = 0; i < (moodular.nbItems / 2); i++) {
				h += '<li class="moodular_itemList_li" rel="' + i + '">' + (i + 1) + '</li>';
			}
			$('.moodular_itemList', moodular.e.parent().parent()).html(h);
			$('li.moodular_itemList_li', moodular.e.parent().parent()).css('cursor', 'pointer').click(function(){
				if(!moodular.locked) {
					moodular.moveTo($(this).attr('rel'));
				} else { 
					moodular.locked = false;
				}
				return false;
			});
			$('.moodular_itemList_li:first').addClass('active');
		},
		tabs: function(moodular){
			if (moodular.opts.tabs) {
				$('a', moodular.opts.tabs).bind('click', function () {
					moodular.moveTo($('> ' + moodular.opts.item, moodular.e).index($($(this).attr('href'))));
				});
				if (window.location.hash.length) {
					moodular.moveTo($('> ' + moodular.opts.item, moodular.e).index($(window.location.hash)));
				}
			}
		},
		wheel: function(moodular){
			moodular.e.parent().parent().bind("mousewheel", function(event, delta){
				var dir = delta > 0 ? 'Up' : 'Down';
				if (dir == 'Up') {
					moodular.next();
				}
				else {
					moodular.prev();
				}
				return false;
			});
		},
		mouseover: function(moodular){
			moodular.opts.callbacks[moodular.opts.callbacks.length] = function(moodular){
				if (moodular.isMouseOver) {
					moodular._animate(mouseDirection(moodular));
				}
			};
			moodular.e.parent().parent().bind("mousemove", function(evt){
				moodular.mouseX = evt.pageX;
				moodular.mouseY = evt.pageY;
			});
			moodular.e.parent().parent().bind("mouseenter", function(evt){
				moodular.isMouseOver = true;
				moodular.mouseX = evt.pageX;
				moodular.mouseY = evt.pageY;
				moodular._animate(mouseDirection(moodular));
				return false;
			});
			moodular.e.parent().parent().bind("mouseleave", function(){
				moodular.isMouseOver = false;
				return false;
			});
		},
		touch: function(moodular){
			moodular.touchBPosX = null;
			moodular.touchBPosY = null;
			moodular.touchEPosX = null;
			moodular.touchEPosY = null;
			moodular.e.parent().bind('touchstart', function (event) {
				var e = event.originalEvent;
				moodular.touchBPosX = e.targetTouches[0].pageX;
				moodular.touchBPosY = e.targetTouches[0].pageY;
			}).bind('touchmove', function (event) {
				event.preventDefault();
				var e = event.originalEvent;
				moodular.touchEPosX = e.targetTouches[0].pageX;
				moodular.touchEPosY = e.targetTouches[0].pageY;
			}).bind('touchend', function(e) {
				if (moodular.vertical) {
					if (moodular.opts.direction == 'top') {
						if (moodular.touchEPosY < moodular.touchBPosY)
							moodular.next();
						else
							moodular.prev();
					}
					else {
						if (moodular.touchEPosY > moodular.touchBPosY)
							moodular.next();
						else
							moodular.prev();
					}
				}
				else {
					if (moodular.opts.direction == 'left') {
						if (moodular.touchEPosX < moodular.touchBPosX)
							moodular.next();
						else
							moodular.prev();
					}
					else {
						if (moodular.touchEPosX > moodular.touchBPosX)
							moodular.next();
						else
							moodular.prev();
					}
				}
				moodular.touchBPosX = null;
				moodular.touchBPosY = null;
				moodular.touchEPosX = null;
				moodular.touchEPosY = null;
				return false;
			});
		},
		slider: function (moodular) {
			moodular.e.parent().parent().append('<div id="' + moodular.id + '_slider"></div>');
			$("#" + moodular.id + "_slider", moodular.e.parent().parent()).slider({
				range: "max",
				min: 0,
				max: ((moodular.nbItems) / 2) - 1,
				value: 0,
				stop: function(event, ui) {
					moodular.moveTo(ui.value);
				}
			});
		}
	});

	$.extend($.fn.moodular.controls.callback, {
		index: function (moodular) {
			$('.moodular_itemList li.active').removeClass('active');
			$('.moodular_itemList li').eq(moodular._realpos(moodular.current)).addClass('active');
		},
		slider: function (moodular) {
			$("#" + moodular.id + "_slider", moodular.e.parent().parent()).slider('value', moodular.current);
		}
	});

	function mouseDirection(moodular){
		var offset = moodular.e.parent().parent().offset();
		if (moodular.vertical) {
			if ((moodular.mouseY >= parseInt(offset.top)) && (moodular.mouseY <= parseInt((parseInt(offset.top) + parseInt(moodular.e.parent().parent().height())) / 2))) {
				return 'prev';
			}
			else {
				return 'next';
			}
		}	
		else {
			if ((moodular.mouseX >= parseInt(offset.left)) && (moodular.mouseX <= parseInt((parseInt(offset.left) + parseInt(moodular.e.parent().parent().width())) / 2))) {
				return 'prev';
			}
			else {
				return 'next';
			}
		}
	}
});