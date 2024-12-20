// Recupera os produtos armazenados no localStorage
let products = JSON.parse(localStorage.getItem('products')) || [];

// Seleciona o container onde os produtos serão exibidos
const productList = document.getElementById('productList');

function displayProducts() {
    productList.innerHTML = ''; // Limpa o conteúdo anterior

    if (products.length === 0) {
        productList.innerHTML = '<p>Sem produtos cadastrados.</p>';
        return;
    }

    products.forEach((product, index) => {
        // Cria a estrutura do card de produto
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <div class="info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">R$ ${product.price}</p>
                <div class="actions">
                    <button class="edit" onclick="editProduct(${index})">Editar</button>
                    <button class="delete" onclick="deleteProduct(${index})">Excluir</button>
                </div>
            </div>
        `;

        productList.appendChild(productCard);
    });
}

// Função para excluir produto
function deleteProduct(index) {
    products.splice(index, 1); // Remove o produto da lista
    localStorage.setItem('products', JSON.stringify(products)); // Atualiza o localStorage
    displayProducts(); // Re-renderiza a lista
}

// Função para editar produto
function editProduct(index) {
    const product = products[index];
    // Redireciona para a página de edição ou abre um modal de edição
    // Neste exemplo, vamos redirecionar para uma página de edição com o id do produto na URL
    window.location.href = `../html/editar_produto.html?id=${index}`;
}

// Inicializa a lista de produtos
displayProducts();

// Botão de redirecionamento para adicionar item
document.getElementById('addItemBtn').addEventListener('click', () => {
    window.location.href = '../html/adicionar_produto.html?v=2';
});


// Proteger a página para administradores
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (!loggedInUser || loggedInUser.role !== "admin") {
  alert("Acesso negado!");
  window.location.href = "../html/login.html?v=2"; // Redireciona para a página de login
}

// Adicionar funcionalidade de logout
document.getElementById('logoutButton').addEventListener('click', () => {
  localStorage.removeItem('loggedInUser');
  window.location.href = "../html/login.html?v=2";
});


