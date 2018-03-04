
$(document).ready(function() {
    $('.button-collapse').sideNav();
 
    $("#giris").click(function(event) {

        if(document.getElementById("girisform").checkValidity() ) {

          
            var kAdi = $("#username").val();
            var kPw = $("#password").val();



            

            $.post('http://localhost/bilgec/service/service.php', {kAdi: kAdi , kPw : kPw , mode :"login"}, 
                function(data, textStatus, xhr)
                {

                var data = JSON.parse(data);

                if(data.status)
                {

                    localStorage.setItem("userId",data.userId); 
                    window.location = "view/main.html";
                }
                else
                {
                    alert("Kullanıcı Bulunamadı");
                }


            });

        }
    });


});


