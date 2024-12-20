// Selecionando o formulário e os campos
const addProductForm = document.getElementById('addProductForm'); // Seleciona o formulário para adicionar um produto
const productPrice = document.getElementById('productPrice'); // Seleciona o campo de preço do produto

// Array para armazenar os produtos no localStorage
let products = JSON.parse(localStorage.getItem('products')) || []; // Recupera os produtos do localStorage, ou inicializa com um array vazio

// Função para converter a imagem em Base64
function convertToBase64(file, callback) { // Função que converte uma imagem para Base64
  const reader = new FileReader(); // Cria um objeto FileReader para ler o arquivo de imagem
  reader.onload = function (event) { // Quando o arquivo for carregado
    callback(event.target.result); // Chama o callback com o resultado (Base64)
  };
  reader.readAsDataURL(file); // Lê o arquivo como um URL de dados (Base64)
}

// Função para formatar o número no estilo de moeda BRL (Real Brasileiro)
function formatPrice(value) { // Função para formatar o preço como moeda BRL
  const number = parseFloat(value.replace(/[^0-9]/g, '')) / 100; // Remove caracteres não numéricos e ajusta as casas decimais
  if (isNaN(number)) return ''; // Se o valor não for um número, retorna uma string vazia
  return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); // Formata o número como moeda BRL
}

// Evento para atualizar o campo de preço com a formatação enquanto o usuário digita
productPrice.addEventListener('input', (event) => { // Adiciona um ouvinte de evento para o campo de preço
  const inputValue = event.target.value; // Captura o valor digitado
  event.target.value = formatPrice(inputValue); // Formata e atualiza o valor do campo
});

// Evento para capturar o envio do formulário
addProductForm.addEventListener('submit', (event) => { // Adiciona um ouvinte de evento para o envio do formulário
  event.preventDefault(); // Previne o comportamento padrão de envio do formulário (não recarregar a página)

  // Captura os valores dos campos do formulário
  const name = document.getElementById('productName').value; // Nome do produto
  const description = document.getElementById('productDescription').value; // Descrição do produto
  const rawPrice = productPrice.value.replace(/[^\d,]/g, '').replace(',', '.'); // Preço, removendo símbolos e ajustando para formato numérico
  const imageFile = document.getElementById('productImage').files[0]; // Imagem selecionada pelo usuário

  if (imageFile) { // Verifica se uma imagem foi selecionada
    // Converte a imagem em Base64 e salva o produto
    convertToBase64(imageFile, (base64Image) => { // Converte a imagem e executa o callback
      const newProduct = { // Cria um novo objeto de produto com os dados do formulário
        name,
        description,
        price: parseFloat(rawPrice).toFixed(2), // Converte o preço para número com 2 casas decimais
        imageUrl: base64Image, // Salva a imagem convertida em Base64
      };

      // Adiciona o produto ao array
      products.push(newProduct); // Adiciona o novo produto ao array de produtos
      localStorage.setItem('products', JSON.stringify(products)); // Atualiza o localStorage com o novo array de produtos

      // Redireciona imediatamente para a listagem de produtos
      window.location.href = '../html/listar_produtos.html?v=2'; // Redireciona para a página de listagem de produtos
    });
  } else {
    alert('Por favor, selecione uma imagem.'); // Exibe um alerta se a imagem não for selecionada
  }
});
