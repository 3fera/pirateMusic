$(document).bind("mobileinit", function () {
    $.mobile.pushStateEnabled = true;
});
 



$(function () {
    var menuStatus;
 
    // Show menu
    $("a.showMenu").click(function () {
        if (menuStatus != true) {
            $(".ui-page-active").animate({
                marginLeft: "165px",
            }, 300, function () {
                menuStatus = true
            });
            return false;
        } else {
            $(".ui-page-active").animate({
                marginLeft: "0px",
            }, 300, function () {
                menuStatus = false
            });
            return false;
        }
    });
 
 
    $('#menu, .pages').live("swipeleft", function () {
        if (menuStatus) {
            $(".ui-page-active").animate({
                marginLeft: "0px",
            }, 300, function () {
                menuStatus = false
            });
        }
    });
 
    $('.pages').live("swiperight", function () {
        if (!menuStatus) {
            $(".ui-page-active").animate({
                marginLeft: "165px",
            }, 300, function () {
                menuStatus = true
            });
        }
    });
 
    $('div[data-role="page"]').live('pagebeforeshow', function (event, ui) {
        menuStatus = false;
        $(".pages").css("margin-left", "0");
    });
 
    // Menu behaviour
    $("#menu li a").click(function () {
        var p = $(this).parent();
        if ($(p).hasClass('active')) {
            $("#menu li").removeClass('active');
        } else {
            $("#menu li").removeClass('active');
            $(p).addClass('active');
        }
    });

    

    
    
    $(".navigate").live('click', 
		function() {	
			
			
			
			$(this).changerPage();
			
			//return navigate(location);
	        return false;
		});
    
});

( function($) {
    $.fn.changerPage = function(options){

        // Ponemos la variable de opciones antes de la iteración (each) para ahorrar recursos
        opc = $.extend( $.fn.changerPage.opc_default, options );

        var location = $(this).attr("data-href").replace("//", "/");
		urlAjax=$.fn.changerPage.getPathAjax(location).replace("//", "/");
        
        $(opc.destino).html(opc.loadingHtml);
    	
    	
    	console.log('Peticion a: '+'http://www.piratecloud.tv/'+urlAjax)
    	
		$.ajax({
            type: 'get',
            url: 'http://www.piratecloud.tv/'+urlAjax,
            dataType: 'json',
            success: function(data){
            	console.dir(data);
            	if(data['html']){
            		$(opc.destino).html(data['html']).trigger('create');
            	}
            	if(data['titulo'])
            		$(opc.titulo).html(data['titulo']);

            }
        });
        
        
        //Recargamos eventos
	  $(".song").live('click', function() {
	        // Note: two ways to access media file: web and local file   
	        var src;
	        console.log("click en cancion");
	        $.ajax({
	            type: 'get',
	            url: "http://piratecloud.tv/m/play/"+$(this).attr("data-id"),
	            dataType: 'json',
	            success: function(data){
	            	console.dir(data);
	            	src = data['file'];
	            }
	        });
	        
	        
	         console.log(src);        
	        // local (on device): copy file to project's /assets folder:
	        //var src = '/android_asset/spittinggames.m4a';
	        
	        playAudio(src);
	    });
	
	    $("#pauseaudio").live('tap', function() {
	        pauseAudio();
	    });
	    
	    $("#stopaudio").live('tap', function() {
	        stopAudio();
	    });
	
	

        
         return false;
        

    };

    $.fn.changerPage.opc_default = {
        destino : "#content",
        titulo : "#titulo",
        loadingHtml : "<div id='uz-discover-feedback' class='loadingDiv'></div>",
        urlInit : "http://piratecloud.tv/m" 
    };
    
    $.fn.changerPage.getPathAjax = function(location1) {
	    	console.log("location1"+location1)
	    	if(location1) {
		    	urlBase=window.location.href;
		    	console.log("urlBase: "+urlBase)
		    	console.log("opc.urlInit: "+opc.urlInit)
				var url=location1.substring(location1.lastIndexOf(opc.urlInit)+ opc.urlInit.length);
				
				
				console.log("url: "+location1)
				return location1;
	    	}
	    	else
	    		return urldecode(window.location.hash.replace('#', ''));
	    	
    	};

   
})(jQuery);




 
