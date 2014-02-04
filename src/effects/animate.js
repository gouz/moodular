/**
 * Moodular - Effect / Animate
 * Copyright (c) 2013 Sylvain "GouZ" Gougouzian (sylvain@gougouzian.fr)
 * MIT (http://www.opensource.org/licenses/mit-license.php) licensed.
 * GNU GPL (http://www.gnu.org/licenses/gpl.html) licensed.
 */
!function($) {
	$.extend($.fn.moodular.effects, {
		animate : function(m) {
			var a = function(k) {
				var n = $("[data-mood]", m.items.eq(k));
				n.css("margin", 0).each(function() {
					var $t = $(this), b = $t.data("mood-animation"), ml, mt;
					$t.data("mood-ghost").css("opacity", 0);
					if (typeof b.distance == 'undefined')
						b.distance = '100%';
					if (b.effects.indexOf("left") >= 0)
						ml = b.distance;
					if (b.effects.indexOf("right") >= 0)
						ml = "-" + b.distance;
					if (b.effects.indexOf("top") >= 0)
						mt = b.distance;
					if (b.effects.indexOf("bottom") >= 0)
						mt = "-" + b.distance;
					var p = $t.data("mood-ghost").position();
					$t.stop().show().css({
						left : p.left,
						top : p.top,
						opacity : b.effects.indexOf("fade") >= 0 ? 0 : 1,
						"margin-left" : ml,
						"margin-top" : mt
					}).data("mood-ghost").css("visibility", "hidden");
					clearTimeout($t.data("mood-timer"));
					$t.data("mood-timer", setTimeout(function() {
						$t.animate({
							margin : 0,
							opacity : 1
						}, m.opts.speed * b.speed, b.easing, function() {
							$t.hide();
							$t.data("mood-ghost").css("visibility", "visible").css("opacity", 1);
							;
						});
					}, b.delay));
				});
			};
			$("[data-mood]", m.$element).each(function() {
				var $t = $(this), $c = $t.clone(), to = $t.position(), b = $t.data("mood").split(";"), c = {};
				$t.removeAttr("data-mood");
				for (var i in b) {
					var d = b[i].split(":");
					c[$.trim(d[0])] = $.trim(d[1]);
				}
				if ( typeof c.speed === "undefined")
					c.speed = 1;
				if (c.speed <= 0)
					c.speed = 1;
				if ( typeof c.effects === "undefined")
					c.effects = "left";
				if ( typeof c.easing === "undefined")
					c.easing = "";
				if ( typeof c.delay === "undefined")
					c.delay = 0;
				$c.css({
					position : "absolute",
					margin : 0
				}).data({
					"mood-animation" : c,
					"mood-ghost" : $t,
					"mood-timer" : null
				});
				$t.parent().append($c);
			});
			a(m.current);
			m.$element.on("moodular.prev moodular.next", function() {
				a(m.next);
			});
		}
	});
}(window.jQuery);
