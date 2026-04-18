<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type");

// --- NETHELYES ADATOK --- ;)
$servername = "localhost";
$username = "szab1234"; 
$password = "szab1234";
$dbname = "szab1234";

$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8");

if ($conn->connect_error) {
    die(json_encode(["error" => "Kapcsolódási hiba"]));
}

    $method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET': // Lekérés
        $sql = "SELECT * FROM szerelo";
        $result = $conn->query($sql);
        $data = [];
        while($row = $result->fetch_assoc()) { $data[] = $row; }
        echo json_encode($data);
        break;

    case 'POST': // Új felvétele
        $input = json_decode(file_get_contents('php://input'), true);
        $nev = $input['nev'];
        $kezdev = $input['kezdev'];
        $sql = "INSERT INTO szerelo (nev, kezdev) VALUES ('$nev', $kezdev)";
        if($conn->query($sql)) echo json_encode(["status" => "ok"]);
        break;

    case 'DELETE': // Törlés
        $az = $_GET['id'];
        $sql = "DELETE FROM szerelo WHERE az = $az";
        if($conn->query($sql)) echo json_encode(["status" => "ok"]);
        break;
}

$conn->close();
?>
