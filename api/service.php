<?php

require_once './vendor/autoload.php';


class RebusService extends BaseRestServiceTB {

	protected $dossierRacine  = '/home/mathias/www/rebus-helper/api/rebus';

	public function __construct() {
		$config = array(
			"domain_root" => "http://localhost",
			"base_uri" => "/rebus-helper/api",
			"first_resource_separator" => "/"
		);
		parent::__construct($config);
	}

	protected function get() {
		header("Access-Control-Allow-Origin: *");
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
							if (substr($f, 0, 1) != '.') {
								$filename = $this->dossierRacine . '/' . $f;
								// date du système
								$date = filectime($filename);
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
	protected function options() {}
}

$svc = new RebusService();
$svc->run();
