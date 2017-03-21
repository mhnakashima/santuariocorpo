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

		if($('.owl-carousel').length != 0){
			$('.owl-carousel').owlCarousel({
			    loop:true,
			    margin:10,
			    autoPlay: 1000,
			    responsive:{
			        0:{
			            items:1
			        },
			        768:{
			            items:3
			        },
			        991:{
			            items:4
			        }
			    }
			})
		}	

		if($("#contactForm").length != 0){

			var contactForm = $("#contactForm");

			contactForm.validate({
				rules: {
					contactName: {
						required: true,
						minlength: 2
					},
					contactEmail: {
						required: true,
						email: true
					},
					contactMessage: {
						required: true,
						minlength: 2
					},					
				},

				messages:{
					contactName: {
						required: "Preencha o campo de nome"
					},

					contactEmail: {
						required: "Preencha o campo de email"
					},

					contactMessage: {
						required: "Preencha o campo de mensagem"
					}
				}
			});
		}

		if($("#agendeContainerForm").length != 0){

			var contactForm = $("#agendeContainerForm");

			var phone = $("#contactPhone");

			console.log(phone);

			phone
				.mask("(99) 9999-9999?9")
				.focusout(function(evt){
					
					var target, phone, element;  
		            target = (event.currentTarget) ? event.currentTarget : event.srcElement;  
		            phone = target.value.replace(/\D/g, '');
		            element = $(target);  
		            element.unmask();  

		            console.log("???");

		            if(phone.length > 10) {  
		                element.mask("(99) 99999-999?9");  
		            } else {  
		                element.mask("(99) 9999-9999?9");  
		            }   
				})


			contactForm.validate({
				rules: {
					contactName: {
						required: true,
						minlength: 2
					},
					contactEmail: {
						required: true,
						email: true
					},
					contactMessage: {
						required: true,
						minlength: 2
					},		
					contactPhone: {
						required: true,
					}			
				},

				messages:{
					contactName: {
						required: "Preencha o campo de nome"
					},

					contactEmail: {
						required: "Preencha o campo de email"
					},

					contactMessage: {
						required: "Preencha o campo de mensagem"
					},

					contactPhone: {
						required: "Preencha o campo de telefone"
					}
				}
			});
		}

		headerHeightSize = getHeaderVal();

	})

})(jQuery);