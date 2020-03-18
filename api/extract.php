<?php

include './config.php';

/**
 * Reads a JSON rebus file and extracts all images from the internet
 * to a local directory
 */

if (count($argv) !== 2) {
    fwrite(STDERR, "Usage: " . $argv[0] . " /path/to/rebus_file" . PHP_EOL);
    exit(1);
}

$file = $argv[1];

if (! file_exists($file)) {
    fwrite(STDERR, "File " . $argv[1] . " does not exist" . PHP_EOL);
    exit(2);
}

$fileName = basename($file);
echo "Processing rebus file [" . $fileName . "]" . PHP_EOL;

$data = json_decode(file_get_contents($file), true);
// prepare images directory
$fileParentDir = dirname(realpath($file));
$imagesDirBaseName = $fileName . "_images";
$imagesDir = $fileParentDir . "/" . $imagesDirBaseName;
if (! file_exists($imagesDir)) {
    mkdir($imagesDir);
}

$rootURL = $config["domain_root"] . $config["base_uri"] . "/rebus/" . $imagesDirBaseName;

$processed = 0;
foreach ($data["images"] as $k => $imageURL) {
    $imageName = basename($imageURL);
    // check if image is a URL
    if (strtolower(substr($imageURL, 0, 4)) !== "http") {
        echo "…skipping image that is not a URL [" . $imageName . "]" . PHP_EOL;
        continue;
    }
    // check if image already exists
    $imageFile = $imagesDir . "/" . $imageName;
    if (file_exists($imageFile)) {
        $size = filesize($imageFile);
        if ($size > 5 * 1000) { // @WARNING clodo trick; a real image might weigh only 5 Ko
            echo "…skipping existing image [" . $imageName . "]" . PHP_EOL;
            continue;
        }
    }
    // download image
    $ch = curl_init($imageURL);
    $fp = fopen($imageFile, 'wb');
    curl_setopt($ch, CURLOPT_FILE, $fp);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_exec($ch);
    curl_close($ch);
    fclose($fp);
    // replace path in JSON file
    $data["images"][$k] = $rootURL . "/" . $imageName;
    $processed++;
}

// print_r($data);

if ($processed > 0) {
    echo "$processed images processed, updating rebus file" . PHP_EOL;
    file_put_contents($file, json_encode($data));
}
