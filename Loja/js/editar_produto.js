// Recupera o índice do produto da URL (parâmetro 'id')
const urlParams = new URLSearchParams(window.location.search); // Obtém os parâmetros da URL
const productIndex = urlParams.get('id'); // Extrai o valor do parâmetro 'id'

// Recupera os produtos armazenados no localStorage ou inicializa com um array vazio
let products = JSON.parse(localStorage.getItem('products')) || [];

// Seleciona os elementos do formulário que serão manipulados no código
const productName = document.getElementById('productName'); // Campo de nome do produto
const productDescription = document.getElementById('productDescription'); // Campo de descrição do produto
const productPrice = document.getElementById('productPrice'); // Campo de preço do produto
const productImage = document.getElementById('productImage'); // Campo de URL da imagem do produto
const productImageUpload = document.getElementById('productImageUpload'); // Campo de upload de imagem
const imagePreview = document.getElementById('imagePreview'); // Elemento de visualização da imagem
const editProductForm = document.getElementById('editProductForm'); // Formulário de edição de produto

// Função para formatar o preço no estilo de moeda BRL (Real Brasileiro)
function formatPrice(value) {
  const number = parseFloat(value.replace(/[^0-9]/g, '')) / 100; // Remove caracteres não numéricos e ajusta as casas decimais
  if (isNaN(number)) return ''; // Retorna vazio se o valor não for um número válido
  return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); // Formata o preço em moeda BRL
}

// Função para converter o valor de um preço formatado para número
function parsePrice(value) {
  return parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.')); // Remove símbolos e converte para número
}

// Verifica se o índice do produto é válido e está dentro do intervalo de produtos disponíveis
if (productIndex !== null && productIndex >= 0 && productIndex < products.length) {
    const product = products[productIndex]; // Obtém o produto com base no índice

    // Preenche os campos do formulário com os dados do produto
    productName.value = product.name;
    productDescription.value = product.description;
    productPrice.value = formatPrice(product.price); // Aplica a formatação no preço
    productImage.value = product.imageUrl;

    // Atualiza a pré-visualização da imagem, se disponível
    if (product.imageUrl) {
        imagePreview.src = product.imageUrl; // Exibe a imagem existente
        imagePreview.style.display = 'block'; // Mostra a imagem
    }

    // Evento para quando o usuário faz upload de uma nova imagem
    productImageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0]; // Recupera o arquivo de imagem selecionado
        if (file) {
            const reader = new FileReader(); // Cria um novo FileReader
            reader.onload = (e) => {
                imagePreview.src = e.target.result; // Exibe a imagem carregada
                imagePreview.style.display = 'block'; // Torna a imagem visível
                productImage.value = ''; // Limpa o campo de URL da imagem
            };
            reader.readAsDataURL(file); // Lê o arquivo e o converte para um formato Base64
        }
    });

    // Evento para quando o usuário altera a URL manualmente
    productImage.addEventListener('input', () => {
        imagePreview.src = productImage.value; // Atualiza a pré-visualização com a nova URL
        imagePreview.style.display = productImage.value ? 'block' : 'none'; // Mostra ou esconde a imagem com base na URL
    });

    // Evento para formatar o preço enquanto o usuário digita no campo de preço
    productPrice.addEventListener('input', (event) => {
        const inputValue = event.target.value; // Obtém o valor digitado pelo usuário
        event.target.value = formatPrice(inputValue); // Aplica a formatação de preço
    });

    // Evento de submissão do formulário de edição
    editProductForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o comportamento padrão de envio do formulário

        // Verifica se os campos obrigatórios estão preenchidos
        if (!productName.value || !productDescription.value || !productPrice.value) {
            alert('Por favor, preencha todos os campos obrigatórios.'); // Exibe um alerta se algum campo estiver vazio
            return;
        }

        // Usa a imagem da pré-visualização como a imagem final
        const finalImageUrl = imagePreview.src;

        // Verifica se uma imagem foi fornecida (URL ou upload)
        if (!finalImageUrl || finalImageUrl === '') {
            alert('Por favor, forneça uma imagem (URL ou upload).'); // Exibe um alerta se não houver imagem
            return;
        }

        // Atualiza os dados do produto com as novas informações do formulário
        products[productIndex] = {
            name: productName.value,
            description: productDescription.value,
            price: parsePrice(productPrice.value).toFixed(2), // Converte o preço para número com 2 casas decimais
            imageUrl: finalImageUrl // Usa a imagem da pré-visualização
        };

        // Salva os produtos atualizados no localStorage
        localStorage.setItem('products', JSON.stringify(products));

        // Redireciona para a lista de produtos após a edição
        window.location.href = '../html/listar_produtos.html?v=2'; // Atualiza a URL para a lista de produtos
    });
} else {
    alert('Produto não encontrado!'); // Exibe um alerta se o produto não for encontrado
    window.location.href = '../html/listar_produtos.html?v=2'; // Redireciona para a lista de produtos
}
