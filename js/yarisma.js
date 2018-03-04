    var puan =0;
    var dogrusayi = 0;
    var yanlissayi = 0;
    var dogru;
    var secenekler = new Array();
    var data;
    var gelendata;
    var secenekler;
    var data2;
$(document).ready(function() {
/*

      var countdown =  $("#countdown").countdown360({
          radius      : 30,
          seconds     : 30,
          fontColor   : '#FFFFFF',
          autostart   : false,
          onComplete  : function () { 
         alert("Süre Doldu Malesef... -5 Puan");
                    puan = -5;
                    dogrusayi = 0;
                    yanlissayi = 1;
                  updatePoint(puan,dogrusayi,yanlissayi);
        location.reload();
           }
       });
      countdown.start();
      console.log('countdown360 ',countdown);
      $(document).on("click","button",function(e){
        e.preventDefault();
        var type = $(this).attr("data-type");
        
      
      });
  */  
    if(document.getElementById("soruGetirme").checkValidity() ) 
      {        


            $.post('http://localhost/bilgec/service/service.php', {mode :"getSorular"}, 
                function(data, textStatus, xhr)
                {
                  // secenekler diye bir dizi oluşturduk.
                data = JSON.parse(data);  
                gelendata = Math.floor(Math.random() * data.length);

                secenekler = [data[gelendata].scnkA , data[gelendata].scnkB , data[gelendata].scnkC , data[gelendata].scnkD];
                secenekler = Shuffle(secenekler);
                function Shuffle(o)  // Seçeneklerin yerlerini her seferinde değiştiren fonksiyon.
                {
                  for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
                  return o;
                };
                
                $("#soruicerik").html(data[gelendata].sorutxt);
                $("#secenekA").html(secenekler[0]);
                $("#secenekB").html(secenekler[1]);
                $("#secenekC").html(secenekler[2]);
                $("#secenekD").html(secenekler[3]);
                dogru = data[gelendata].dogrusecenek;

                $("[name = secenek]").click(function(event) {
                  if($(this).find("span").html() == dogru){
                    if (data[gelendata].soruSeviye == 0) {
                  alert("Soru kolay, Cevabınız DOĞRU idi. +2 Puan :)"); 

                  puan = 2;
                  dogrusayi= 1;
                  yanlissayi = 0;
                  updatePoint(puan,dogrusayi,yanlissayi);
                    }
                    else if (data[gelendata].soruSeviye == 1) {
                  alert("Soru orta, Cevabınız DOĞRU idi. +5 Puan :)"); 
                  puan = 5;
                  dogrusayi= 1;
                  yanlissayi = 0;
                  updatePoint(puan,dogrusayi,yanlissayi);
                    }
                    else if (data[gelendata].soruSeviye == 2) {
                  alert("Soru ZOR, Cevabınız DOĞRU idi. +10 Puan Tebrikler :)"); 
                  puan = 10;
                  dogrusayi= 1;
                  yanlissayi = 0;
                  updatePoint(puan,dogrusayi,yanlissayi);
                    }

                  }
                  else{                 
                    alert("Yanlış Cevap :( -5 Puan");
                    puan = -5;
                    dogrusayi = 0;
                    yanlissayi = 1;
                  updatePoint(puan,dogrusayi,yanlissayi);

                  }
                  
                });
            });
      }
/*
  $("#bitir").click(function(event) {

      function updatePoint(){
        $.post('http://localhost/bilgec/service/service.php', {mode:"updatePoint",dogrusayi:dogrusayi,yanlissayi:yanlissayi,userId:localStorage.getItem("userId") }, function(data, textStatus, xhr) {
        var data = JSON.parse(data);

        });
        window.location = "view/main.html";
      }


  }); 

*/

    });


      function updatePoint(puan,dSayi,ySayi){


        $.post('http://localhost/bilgec/service/service.php', {mode:"updatePoint",dogrusayi:dSayi,yanlissayi:ySayi,userId:localStorage.getItem("userId"), puan:puan }, 
        function(data, textStatus, xhr) {
        var data = JSON.parse(data);
        if(data.status)
        { 
        location.reload();
        }
        else
        {
          alert("hata..");
        location.reload();

        }

        });
      }