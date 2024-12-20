// Simulação de banco de dados com usuários
const users = [
  { username: "admin", password: "123asd", role: "admin" }, // Administrador
];

// Selecionar o formulário e a mensagem de erro
const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

// Evento de login
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('senha').value;

  // Verificar se o usuário existe
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Armazenar o papel do usuário no localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    
    // Redirecionar com base no papel
    if (user.role === "admin") {
      window.location.href = "../html/listar_produtos.html?v=2"; // Página do administrador
    } else {
      window.location.href = "../html/listar_produtos_usuario.html?v=2"; // Página de usuários
    }
  } else {
    // Redireciona automaticamente para a página de administração em caso de erro
    window.location.href = "../html/listar_produtos_usuario.html?v=2"; // Página do administrador
  }
});

// Alterna entre exibir/ocultar a senha
const togglePassword = document.getElementById('togglePassword');
togglePassword.addEventListener('click', function () {
    const passwordInput = document.getElementById('senha');
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;

    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});
