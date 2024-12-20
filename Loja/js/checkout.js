// Validação de campos de texto
document.getElementById('nome').addEventListener('input', function(event) {
    // Esta função é executada sempre que há alteração no campo 'nome'.
    // Ela remove caracteres que não são letras ou espaços (a-z, A-Z, acentos e cedilha).
    event.target.value = event.target.value.replace(/[^a-zA-Záàâãéèêíïóôõúüç\s]/g, ''); 
});

document.getElementById('bairro').addEventListener('input', function(event) {
    // Similar à validação do campo 'nome', mas aplicada ao campo 'bairro'.
    event.target.value = event.target.value.replace(/[^a-zA-Záàâãéèêíïóôõúüç\s]/g, ''); 
});

document.getElementById('rua').addEventListener('input', function(event) {
    // Similar à validação do campo 'bairro', mas para o campo 'rua'.
    event.target.value = event.target.value.replace(/[^a-zA-Záàâãéèêíïóôõúüç\s]/g, ''); 
});

document.getElementById('numero').addEventListener('input', function(event) {
    // Este evento é para o campo 'numero', permitindo apenas números (de 0 a 9).
    event.target.value = event.target.value.replace(/[^0-9]/g, ''); 
});

document.getElementById('cidade').addEventListener('input', function(event) {
    // Similar à validação dos campos 'nome', 'bairro' e 'rua', mas para o campo 'cidade'.
    event.target.value = event.target.value.replace(/[^a-zA-Záàâãéèêíïóôõúüç\s]/g, ''); 
});

document.getElementById('estado').addEventListener('input', function(event) {
    // Similar à validação dos campos 'nome', 'bairro', 'rua' e 'cidade', mas para o campo 'estado'.
    event.target.value = event.target.value.replace(/[^a-zA-Záàâãéèêíïóôõúüç\s]/g, ''); 
});

document.getElementById('cep').addEventListener('input', function(event) {
    // Valida o campo 'cep', permitindo apenas números (0-9).
    event.target.value = event.target.value.replace(/[^0-9]/g, ''); 
});

// Máscara de telefone
const telefoneInput = document.getElementById('telefone');
telefoneInput.addEventListener('input', function (e) {
    // A função remove qualquer caractere não numérico do telefone e formata o número para o padrão (XX) XXXXX-XXXX.
    let value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

    // Formata o número com máscara de telefone
    if (value.length > 0) value = '(' + value;
    if (value.length > 2) value = value.slice(0, 3) + ') ' + value.slice(3);
    if (value.length > 9) value = value.slice(0, 10) + '-' + value.slice(10);

    e.target.value = value; // Aplica o valor formatado ao campo de telefone
});

// Envio do formulário
document.getElementById('dadosCompraForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o envio do formulário, permitindo processar os dados de forma personalizada

    // Captura os valores dos campos do formulário e armazena em um objeto 'dadosCompra'.
    const dadosCompra = {
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value,
        cep: document.getElementById('cep').value,
        bairro: document.getElementById('bairro').value,
        rua: document.getElementById('rua').value,
        numero: document.getElementById('numero').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        formaPagamento: document.getElementById('formaPagamento').value
    };

    // Salva os dados de compra no localStorage para persistência (pode ser útil em outra parte do site ou em navegações subsequentes).
    localStorage.setItem('dadosCompra', JSON.stringify(dadosCompra));

    // Exibe um alerta informando que a compra foi finalizada com sucesso.
    alert("Compra finalizada! Agradecemos pela sua compra.");

    // Redireciona o usuário para uma página de confirmação da compra.
    window.location.href = "../html/confirmacao_compra.html?v=2"; // Página de confirmação
});
