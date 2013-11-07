/**
 * Moodular - Controls / Pagination
 * Copyright (c) 2013 Sylvain "GouZ" Gougouzian (sylvain@gougouzian.fr)
 * MIT (http://www.opensource.org/licenses/mit-license.php) licensed.
 * GNU GPL (http://www.gnu.org/licenses/gpl.html) licensed.
 */
!function($) {
	$.extend($.fn.moodular.controls, {
		pagination : function(m) {
			var lis = '';
			for (var i = 0; i < m.nbItems; i++)
				lis += '<li><a href="#" data-index="' + i + '">' + (i + 1) + '</a></li>';
			m.opts.pagination.append(lis);
			$('>li>a', m.opts.pagination).on('click', function() {
				if (!$(this).parent().hasClass('active'))
					m.moveTo($(this).data('index'), 'next');
				return false;
			});
			$('>li', m.opts.pagination).eq(0).addClass('active');
			m.$element.on('moodular.prev moodular.next', function() {
				$('>li', m.opts.pagination).removeClass('active').eq(m.next).addClass('active');
			});
		}
	});
}(window.jQuery);