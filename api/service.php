<?php

require_once './vendor/autoload.php';

include './config.php';

class RebusService extends BaseRestServiceTB {

	protected $dossierRacine;

	public function __construct() {
		global $config;
		parent::__construct($config);
		$this->dossierRacine = $config["data_dir"];
	}

	protected function get() {
		global $config;
		header("Access-Control-Allow-Origin: " . $config["access_control_allow_origin"]);
		array_shift($this->resources); // service.php

		if (count($this->resources) > 0) {
			$ressource = array_shift($this->resources);
			switch ($ressource) {
				case "rebus": {
					if (count($this->resources) > 0) {
						// un rébus
						$nom = array_shift($this->resources);
						$filename = $this->dossierRacine . '/' . $nom;
						$contenu = file_get_contents($filename);
						$this->sendJson(json_decode($contenu));
					} else {
						// liste
						$rebusParDate = array();
						$dr = opendir($this->dossierRacine);
						while ($f = readdir($dr)) {
							if (substr($f, 0, 1) != '.' && substr($f, -7) != '_images') {
								$filename = $this->dossierRacine . '/' . $f;
								// date du système
								$date = filectime($filename) * 1000; // milliseconds
								array_push($rebusParDate, array(
									"date" => $date,
									"key" => $f
								));
							}
						}
						// tri par date décroissante
						usort($rebusParDate, function($a, $b) {
							if ($a['date'] == $b['date']) return 0;
							if ($a['date'] > $b['date']) return -1;
							else return 1;
						});
						$this->sendJson($rebusParDate);
					}
					break;
				}
				default: {
					echo "coucou !";
				}
			}
		}
	}

	protected function post() {
		global $config;
		header("Access-Control-Allow-Origin: " . $config["access_control_allow_origin"]);
		$contenu = $this->readRequestBody();
		//echo $contenu;
		$nom = md5(microtime());
		$filename = $this->dossierRacine . '/' . $nom;
		if (file_put_contents($filename, $contenu)) {
			http_response_code(201);
			$this->sendJson($nom);
		} else {
			http_response_code(500);
		}
	}

	protected function put() {}
	protected function patch() {}
	protected function delete() {}

	protected function options() {
		global $config;
		header("Access-Control-Allow-Origin: " . $config["access_control_allow_origin"]);
		header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	}
}

$svc = new RebusService();
$svc->run();
