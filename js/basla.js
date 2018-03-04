$(document).ready(function() {


	$("#soruGetir").click(function(event) {
		              $.ajaxPrefilter(function (options) 
                {
                    if (options.crossDomain && jQuery.support.cors) 
                    {
                        var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
                        options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
                    }
                });


			var countdown =  $("#countdown").countdown360({
       	 	radius      : 30,
         	seconds     : 30,
         	fontColor   : '#FFFFFF',
         	autostart   : false,
         	onComplete  : function () { 
         		alert("oYUN BİTTİ");
         	 }
		   });
			countdown.start();
			console.log('countdown360 ',countdown);
		 	$(document).on("click","button",function(e){
		 		e.preventDefault();
		 		var type = $(this).attr("data-type");
		 		
		 	
		 	});
	});
});