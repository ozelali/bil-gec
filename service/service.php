<?php

class BilgiService{
	private $gelenpuan;
	private $gelendsayi;
	private $gelenysayi;
	private $puan;
	private $dogrusayi;
	private $yanlissayi;
	private $userId;
	private $kAdi;
	private $kPw;
	private $soruTur;
	private $soruSeviye;
	private $sorutxt;
	private $scnkA;
	private $scnkB;
	private $scnkC;
	private $scnkD;
	private $dogrusecenek;
	private $db;
	private $getData;
	private $json = array();
	private $mode;
	public $returnData;



	public function BilgiService($gelenpuan ='', $gelendsayi= '', $gelenysayi='', $userId='',$soruSeviye='',$soruTur='',$sorutxt='',$scnkA='',$scnkB='',$scnkC='',$scnkD='',$kAdi='',$kPw='',$puan='',$dogrusayi = '', $yanlissayi= '',$mode='')
	{
		$this->gelenpuan = $gelenpuan;
		$this->gelendsayi = $gelendsayi;
		$this->gelenysayi = $gelenysayi;
		$this->puan = $puan;
		$this->dogrusayi = $dogrusayi;
		$this->yanlissayi = $yanlissayi;
		$this->userId = $userId;
		$this->sorutxt = $sorutxt;
		$this->soruTur = $soruTur;
		$this->soruSeviye = $soruSeviye;
		$this->scnkA = $scnkA;
		$this->scnkB = $scnkB;
		$this->scnkC = $scnkC;
		$this->scnkD = $scnkD;
		$this->dogrusecenek = $scnkA;
		$this->connectDB();
		$this->kAdi = $kAdi;
		$this->kPw = $kPw;
		$this->mode = $mode;
		$this->{$this->mode}();
	}

	private function connectDB()
	{
		$dsn = "mysql:host=localhost;dbname=bilgec";
		$user = "root";
		$password = "";

		try{

			$this->db = new PDO($dsn , $user ,$password);
			$this->db->exec("set names UTF8");

		}catch(PDOException $e){
			echo "connection failed : " .$e->getMessage();

		}

	}

	private function getKullanici()
	{
		$array = array('kAdi' => "", "kPw" => "" );
		
		$getData = $this->db->query("SELECT * From kullanici WHERE kId = '{$this->userId}'");

		foreach ($getData as $row) {

			$array["kAdi"] = $row["kAdi"];
			$array["kPw"] = $row["kPw"];
			array_push($this->json, $array);
		} 

		$this->returnData = json_encode($this->json);
	}


	private function getSorular()
	{

		$array = array("soruSeviye" => "","soruTur" => "", "sorutxt" => "","scnkA" => "","scnkB" => "","scnkC" => "","scnkD"=>"" , "dogrusecenek"=>"");

		$getData = $this->db->query("SELECT * From sorular");

		foreach ($getData as $row) {
			$array["soruSeviye"] = $row["soruSeviye"];
			$array["soruTur"] = $row["soruTur"];
			$array["sorutxt"] = $row["soru"];
			$array["scnkA"] = $row["a"];
			$array["scnkB"] = $row["b"];
			$array["scnkC"] = $row["c"];
			$array["scnkD"] = $row["d"];
			$array["dogrusecenek"] = $row["dogru"];
			array_push($this->json, $array);
		} 

		$this->returnData = json_encode($this->json);
	}

	public function siralama () {
		$this->db->beginTransaction();
		$array = array('puan' => "", 'dogrusayi' => "", 'yanlissayi' => "",'kAdi' => "" );

		$getData = $this->db->query("SELECT * From puan ORDER BY puan DESC");
		foreach ($getData as $row) {

			$getad = $this->db->query("SELECT * FROM kullanici WHERE kId = '{$row["kId"]}'");

			foreach ($getad as $key) {
				$array["kAdi"] = $key["kAdi"];
			}

			$array["puan"] = $row["puan"];
			$array["dogrusayi"] = $row["dSayi"];
			$array["yanlissayi"] = $row["ySayi"];
			array_push($this->json, $array);
		} 

		$this->returnData = json_encode($this->json);

	}

	public function getPoint () {
		$array = array('puan' => "", 'dogrusayi' => "", 'yanlissayi' => "");

		$getData = $this->db->query("SELECT * From puan WHERE kId = '{$this->userId}'");
		foreach ($getData as $row) 
		{
			$array["puan"] = $row["puan"];
			$array["dogrusayi"] = $row["dSayi"];
			$array["yanlissayi"] = $row["ySayi"];
			array_push($this->json, $array);
		} 

		$this->returnData = json_encode($this->json);

	}

	public function updatePoint(){
		$query = $this->db->query("UPDATE puan SET puan = puan + {$this->puan},dSayi =dSayi + {$this->dogrusayi},ySayi = ySayi + {$this->yanlissayi} WHERE kId = {$this->userId}");
		
		if($query)
		{
			$this->json["status"] = true;
		}
		else 
		{
			$this->json["status"] = false;
		}

		$this->returnData = json_encode($this->json);
	}


	public function login()
	{

		$query = $this->db->query("SELECT * From kullanici 
			WHERE 
			kAdi = '{$this->kAdi}' && 
			kPw = '{$this->kPw}'")->fetch(PDO::FETCH_ASSOC);

		if($query){

			$this->json["status"] = true;
			$this->json["userId"] = $query["kId"];


		}else{

			$this->json["status"] = false;

		}

		$this->returnData = json_encode($this->json);
		
	}

	public function kullaniciKayit()
	{
		$this->db->beginTransaction();

		$query = $this->db->query("INSERT INTO kullanici(kAdi, kPw)
			VALUES (
			'{$this->kAdi}',
			'{$this->kPw}')				
			");


		$this->userId = $this->db->lastInsertId();
		$query2 = $this->db->query("INSERT INTO puan(kId, puan, dSayi, ySayi)
			VALUES (
			'{$this->userId}', 
			0, 
			0, 
			0)				
			");
		if($query && $query2){
			$this->db->commit();
			$this->json["status"] = true;
		}else{
			$this->db->rollback();
			$this->json["status"] = false;
		}

		$this->returnData = json_encode($this->json);
	}

	public function puankayit()
	{
		$query = $this->db->query("INSERT INTO puan(kId)
			VALUES ('{$this->userId}'");
		if($query)
		{
			$this->json["status"] = true;
		}
		else 
		{
			$this->json["status"] = false;
		}

		$this->returnData = json_encode($this->json);
	}

	public function kayitEt()
	{	$this->sorutxt = addslashes(urldecode($this->sorutxt));

		$query = $this->db->query("INSERT INTO sorular(soruSeviye, soruTur, soru , a , b , c , d , dogru ) 
			VALUES (
			'{$this->soruSeviye}',
			'{$this->soruTur}',
			'{$this->sorutxt}',
			'{$this->scnkA}',
			'{$this->scnkB}',
			'{$this->scnkC}',
			'{$this->scnkD}',
			'{$this->dogrusecenek}')");

		if($query)
		{
			$this->json["status"] = true;
		}
		else
		{
			$this->json["status"] = false;
		}

		$this->returnData = json_encode($this->json);
	}
}

$bilgiyarisma = new BilgiService(@$_REQUEST["gelenpuan"],@$_REQUEST["gelendsayi"],@$_REQUEST["gelenysayi"],@$_REQUEST["userId"],@$_REQUEST["soruSeviye"],@$_REQUEST["soruTur"],@$_REQUEST["sorutxt"],@$_REQUEST["scnkA"],@$_REQUEST["scnkB"],@$_REQUEST["scnkC"],@$_REQUEST["scnkD"],@$_REQUEST["kAdi"],@$_REQUEST["kPw"],@$_REQUEST["puan"],@$_REQUEST["dogrusayi"],@$_REQUEST["yanlissayi"],@$_REQUEST["mode"]);


echo $bilgiyarisma->returnData;

?>	