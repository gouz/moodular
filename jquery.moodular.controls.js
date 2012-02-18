/**
 * Copyright (c) 2012 Sylvain Gougouzian (sylvain@gougouzian.fr)
 * MIT (http://www.opensource.org/licenses/mit-license.php) licensed.
 * GNU GPL (http://www.gnu.org/licenses/gpl.html) licensed.
 *
 * jQuery moodular controls by Sylvain Gougouzian http://sylvain.gougouzian.fr
 */
jQuery(function($){
	$.extend($.fn.moodular.controls.init, {
		keys: function(m){
			$(document).keydown(function(event){
				if ((event.keyCode == 39) || (event.keyCode == 40)) {
					m.next();
					return false;
				}
				if ((event.keyCode == 37) || (event.keyCode == 38)) {
					m.prev();
					return false;
				}
			});
		},
		index: function(m){
			var h = "";
			for (var i = 0; i < m.nbItems; i++) {
				h += '<li class="moodular_itemList_li" rel="' + i + '"><span>' + (i + 1) + '</span></li>';
			}
			m.opts.indexElement.html(h);
			$('.moodular_itemList_li', m.opts.indexElement).css('cursor', 'pointer').click(function(){
				if(!m.locked && !$(this).hasClass('active')) {
					$('.moodular_itemList_li.active', m.opts.indexElement).removeClass('active');
					$(this).addClass('active');
					m.moveTo(parseInt($(this).attr('rel')));
				}
				return false;
			});
			$('.moodular_itemList_li:first', m.opts.indexElement).addClass('active');
		},
		wheel: function(m){
			m.e.parent().parent().bind("mousewheel", function(event, delta){
				var dir = delta > 0 ? 'Up' : 'Down';
				if (dir == 'Up') {
					m.next();
				}
				else {
					m.prev();
				}
				return false;
			});
		},
		touch: function(m){
			m.touchBPosX = null;
			m.touchBPosY = null;
			m.touchEPosX = null;
			m.touchEPosY = null;
			m.e.parent().bind('touchstart', function (event) {
				var e = event.originalEvent;
				m.touchBPosX = e.targetTouches[0].pageX;
				m.touchBPosY = e.targetTouches[0].pageY;
			}).bind('touchmove', function (event) {
				event.preventDefault();
				var e = event.originalEvent;
				m.touchEPosX = e.targetTouches[0].pageX;
				m.touchEPosY = e.targetTouches[0].pageY;
			}).bind('touchend', function(e) {
				if (m.vertical) {
					if (m.dir == 1) {
						if (m.touchEPosY < m.touchBPosY)
							m.next();
						else
							m.prev();
					}
					else {
						if (m.touchEPosY > m.touchBPosY)
							m.next();
						else
							m.prev();
					}
				}
				else {
					if (m.dir == 1) {
						if (m.touchEPosX < m.touchBPosX)
							m.next();
						else
							m.prev();
					}
					else {
						if (m.touchEPosX > m.touchBPosX)
							m.next();
						else
							m.prev();
					}
				}
				m.touchBPosX = null;
				m.touchBPosY = null;
				m.touchEPosX = null;
				m.touchEPosY = null;
				return false;
			});
		},
		buttons: function (m) {
			jQuery(m.opts.bt_prev, m.e.parent().parent()).bind('click', function () {
				m.prev();
				return false;
			});
			jQuery(m.opts.bt_next, m.e.parent().parent()).bind('click', function () {
				m.next();
				return false;
			});
		},
		stopOver: function (m) {
			$(m.e).bind('mouseenter', function () {
				clearTimeout(m.timerMoving);
				m.stop();
			}).bind('mouseleave', function () {
				m.timerMoving = setTimeout(function() {
					m.start();
				}, m.opts.dispTimeout);
			});
		},
		thumbs: function (m) {
			m.tC = m.opts.thumbsContainer.moodular({
				effects: 'multiple',
				api: true,
				auto: false,
				speed: m.opts.speed
			});
			m.thumbsClicked = false;
			$('>'+m.opts.thumbsItem, m.opts.thumbsContainer).bind('click', function () {
				if (!m.tC.locked && !$(this).hasClass('current')) {
					m.thumbsClicked = true;
					var t = $(this).data('position');
						n = t - m.tC.current;
					if (n >= m.nbItems)
						n -= m.nbItems;
					if (n < 0)
						n += m.nbItems;
					m.tC.nb_move = n;
					m.moveTo(t);
					m.tC.next();
				}
				return false;
			}).css('cursor', 'pointer');
		}
	});

	$.extend($.fn.moodular.controls.before, {
		index: function (m) {
			$('.moodular_itemList_li.active', m.e.parent().parent()).removeClass('active');
			$('.moodular_itemList_li', m.e.parent().parent()).eq(m.current).addClass('active');
		},
		thumbs: function (m) {
			if (!m.thumbsClicked) {
				if (m.dir == 1)
					m.tC.next();
				else
					m.tC.prev();
			}
		}
	});

	$.extend($.fn.moodular.controls.after, {
		thumbs: function (m) {
			m.thumbsClicked = false;
		}
	});
	
});
