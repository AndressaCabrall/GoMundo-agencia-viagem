<?php
// conexao.php - ESTE ARQUIVO NÃO DEVE TER "INCLUDE" DELE MESMO

$host = "localhost";
$user = "root";
$pass = "";
$db   = "agencia_viagens";

// 1. Desativa alertas que podem sujar o JSON
mysqli_report(MYSQLI_REPORT_OFF); 

// 2. Tenta a conexão
$conn = new mysqli($host, $user, $pass, $db);

// 3. Verifica erro de forma simples
if ($conn->connect_error) {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'erro', 'mensagem' => 'Falha na conexão']);
    exit;
}

// 4. Define o charset
$conn->set_charset("utf8mb4");

