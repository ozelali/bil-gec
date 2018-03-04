$(document).ready(function() {
	             


    $.post('http://localhost/bilgec/service/service.php', {userId: localStorage.getItem("userId"),mode:"getKullanici"}, function(data, textStatus, xhr) {
        var data = JSON.parse(data); 
                $("#profileName").html(data[0].kAdi);
    });                  

	$.post('http://localhost/bilgec/service/service.php', {userId: localStorage.getItem("userId"),mode:"getPoint"}, function(data, textStatus, xhr) {
		var data = JSON.parse(data); 
		        $("#puan").html(data[0].puan);
                $("#dogru").html(data[0].dogrusayi);
                $("#yanlis").html(data[0].yanlissayi);
	});


});