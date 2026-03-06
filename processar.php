<?php
include 'conexao.php';
header('Content-Type: application/json; charset=utf-8');

// Captura os dados
$nome    = trim($_POST['nome'] ?? '');
$email   = trim($_POST['email'] ?? '');
$destino = trim($_POST['destino'] ?? '');

// Validação
if (empty($nome) || empty($email) || empty($destino)) {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Preencha todos os campos.']);
    exit;
}

// Inserção
$sql = "INSERT INTO contatos (nome, email, destino) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("sss", $nome, $email, $destino);
    if ($stmt->execute()) {
        echo json_encode(['status' => 'sucesso', 'mensagem' => 'Enviado com sucesso!']);
    } else {
        echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao salvar dados.']);
    }
    $stmt->close();
} else {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Erro interno no servidor.']);
}
$conn->close();