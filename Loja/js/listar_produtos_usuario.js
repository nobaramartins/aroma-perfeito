// Recupera os produtos armazenados no localStorage
let products = JSON.parse(localStorage.getItem('products')) || [];

// Recupera o carrinho de compras, se existir
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Seleciona o container onde os produtos serão exibidos
const productList = document.getElementById('productList');

// Função para exibir os produtos
function displayProducts() {
    productList.innerHTML = ''; // Limpa o conteúdo anterior

    if (products.length === 0) {
        productList.innerHTML = '<p>Sem produtos cadastrados.</p>';
        return;
    }

    products.forEach((product) => {
        // Cria a estrutura do card de produto
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <div class="info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">R$ ${product.price}</p>
                <i class="fas fa-cart-plus add-to-cart-icon" data-id="${product.id}"></i>
            </div>
        `;

        // Adiciona o evento de adicionar ao carrinho
        const addToCartIcon = productCard.querySelector('.add-to-cart-icon');
        addToCartIcon.addEventListener('click', () => addToCart(product));

        productList.appendChild(productCard);
    });
}


// Função para adicionar o produto ao carrinho
function addToCart(product) {
    // Verifica se o produto já está no carrinho
    const productInCart = cart.find(item => item.id === product.id);
    if (productInCart) {
        // Se o produto já estiver no carrinho, incrementa a quantidade
        productInCart.quantity++;
    } else {
        // Se não estiver no carrinho, adiciona o produto com quantidade 1
        cart.push({ ...product, quantity: 1 });
    }

    // Armazena o carrinho atualizado no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Exibe o alerta e redireciona para o carrinho
    alert(`${product.name} foi adicionado ao carrinho.`);
    window.location.href = "../html/carrinho.html"; // Página onde o carrinho é exibido
}

// Atualiza o contador de itens no carrinho
function updateCartCounter() {
    const cartCounter = document.getElementById('cartCounter');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.textContent = totalItems;
}

// Inicializa o contador ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updateCartCounter();
    displayProducts();
});

// Listener para abrir o carrinho ao clicar no ícone
document.getElementById('cartIcon').addEventListener('click', () => {
    window.location.href = "../html/carrinho.html?v=2";
});
