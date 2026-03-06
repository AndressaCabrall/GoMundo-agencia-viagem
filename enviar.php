<?php
include 'conexao.php';
header('Content-Type: application/json');

$nome    = $_POST['nome'] ?? '';
$email   = $_POST['email'] ?? '';
$destino = $_POST['destino'] ?? '';

if (empty($nome) || empty($email) || empty($destino)) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Preencha todos os campos.']);
    exit;
}

$sql = "INSERT INTO contatos (nome, email, destino) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("sss", $nome, $email, $destino);
    if ($stmt->execute()) {
        echo json_encode(['status' => 'sucesso', 'mensagem' => 'Dados enviados com sucesso!']);
    } else {
        echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao salvar dados.']);
    }
    $stmt->close();
} else {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Erro interno no servidor.']);
}

$conn->close();