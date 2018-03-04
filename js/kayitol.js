$(document).ready(function() {


	$("#loginform").submit(function(event) {
		return false;
	});
	
	$("#kayit").click(function(event) {

		if(document.getElementById("loginform").checkValidity() ) 
		{
      
			var kAdi = $("#username").val();
			var kPw = $("#password").val();
			var rePw = $("#password1").val();

		

			if (kPw == rePw) {
			$.post('http://localhost/bilgec/service/service.php', {kAdi: kAdi,kPw : kPw,mode:"kullaniciKayit"}, 
				function(data, textStatus, xhr) {
				var data = JSON.parse(data);
				
				if(data.status)
				{

					$("#status").html("Kayıt Başarılı").show().fadeOut( 2000 );
					 window.location = "../index.html";
				}
				else
				{
					$("#status").html("Kayıt olurken bir sorun oluştu lütfen daha sonra tekrar deneyiniz !!!").show().fadeOut( 2000 );
					window.location.reload();
				}
			});
			}
			else
			{
				alert("Şifreleriniz uyuşmuyor.")
			}

		}
	});		
});

