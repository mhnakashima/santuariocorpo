(function($){
   
	$(document).ready(function(){

		var headerHeightSize = 0;
		var mainFixedMenuScroller = $(".mainFixedMenuScroller");

		var getHeaderVal = function(){
			return $("#header").height();
		}

		var showFixedHeader = function(showHeader){
			if(showHeader){
				mainFixedMenuScroller
									.addClass('show');
			}else{
				mainFixedMenuScroller
									.removeClass('show');
			}
		}

		$(window).on('scroll', function(delta){
			
			if($(window).scrollTop() > headerHeightSize){
				showFixedHeader(true);
			}else{
				showFixedHeader(false);
			}
		})


		$(window).on('resize', function(){
			headerHeightSize = getHeaderVal();
		})

		headerHeightSize = getHeaderVal();

	})

})(jQuery);