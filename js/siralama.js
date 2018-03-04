$(document).ready(function() {

    $.post('http://localhost/bilgec/service/service.php', {mode :"siralama"}, 
        function(data, textStatus, xhr)
        {
            var data = JSON.parse(data);
            for (var i = 0; i < data.length; i++)
            {
               $("#siralama").append('<tr>\
                <td id="isim" style="color:black">'+data[i].kAdi+'</td>\
                <td id="dogrusayi" style="color:black">'+data[i].dogrusayi+'</td>\
                <td id="yanlissayi" style="color:black">'+data[i].yanlissayi+'</td>\
                <td id="Puan" style="color:black">'+data[i].puan+'</td>\
                </tr>')
           }

       });
});