// Recupera o carrinho do localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Seleciona o container onde o carrinho será exibido
const cartList = document.getElementById('cartList');

// Função para exibir os itens no carrinho
function displayCart() {
    cartList.innerHTML = ''; // Limpa o conteúdo anterior
    let total = 0; // Variável para armazenar o total da compra

    if (cart.length === 0) {
        cartList.innerHTML = '<p>O carrinho está vazio.</p>';
        return;
    }

    cart.forEach((item) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        const itemTotal = item.price * item.quantity; // Calcula o total para o item

        cartItem.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="price">R$ ${item.price}</p>
                <div class="cart-actions">
                    <div>
                        <label for="quantity-${item.id}">Quantidade:</label>
                        <input type="number" id="quantity-${item.id}" value="${item.quantity}" min="1">
                    </div>
                    <button class="remove-button" data-id="${item.id}">🗑️</button>
                </div>
            </div>
            <div class="total-price">R$ ${itemTotal.toFixed(2)}</div>
        `;

        // Adiciona o evento para atualizar a quantidade
        const quantityInput = cartItem.querySelector(`#quantity-${item.id}`);
        quantityInput.addEventListener('input', (e) => updateQuantity(item.id, e.target.value));

        // Adiciona o evento para remover o item do carrinho
        const removeButton = cartItem.querySelector('.remove-button');
        removeButton.addEventListener('click', () => removeFromCart(item.id));

        cartList.appendChild(cartItem);

        // Atualiza o total geral
        total += itemTotal;
    });

    // Não exibe mais o total fora do quadro de cada item
}

// Função para atualizar a quantidade de um item no carrinho
function updateQuantity(id, newQuantity) {
    const product = cart.find(item => item.id === id);
    if (product) {
        product.quantity = parseInt(newQuantity, 10);
        localStorage.setItem('cart', JSON.stringify(cart)); // Salva no localStorage
        displayCart(); // Atualiza a exibição do carrinho
    }
}

// Função para remover o produto do carrinho
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id); // Remove o item do carrinho
    localStorage.setItem('cart', JSON.stringify(cart)); // Atualiza o localStorage
    displayCart(); // Atualiza a exibição do carrinho
}

// Função para verificar se o carrinho está vazio e redirecionar para a página de dados de compra
document.getElementById('checkoutButton').addEventListener('click', () => {
    // Verifica se o carrinho está vazio
    if (cart.length === 0) {
        alert("O carrinho está vazio!");
        return;
    }

    // Redireciona para a página de dados de compra
    window.location.href = "../html/checkout.html?v=2";
});

// Inicializa a exibição do carrinho
displayCart();
