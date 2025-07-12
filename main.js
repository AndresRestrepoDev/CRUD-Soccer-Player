// ============================
// 🔗 CONSTANTES DE API
// ============================
const API_URL_JUGADORES = 'http://localhost:3000/jugadores';
const API_URL_USUARIOS = 'http://localhost:3000/usuarios';

// ============================
// 🔐 FUNCIONES DE AUTENTICACIÓN
// ============================

// Verifica si el usuario está autenticado
function isAuth() {
    const result = localStorage.getItem("Auth") || null;
    const resultBool = result == "True";
    return resultBool;
}

// Configura el formulario de login
function setupLoginForm() {
    const login = document.getElementById('login-form');

    login.addEventListener('submit', async (e) => {
        e.preventDefault();

        const users = await getUsers();
        const user = document.getElementById('user').value;
        const pass = document.getElementById('password').value;

        const foundUser = users.find(
            (userDB) => userDB.user == user && String(userDB.password) == pass
        );

        if (foundUser) {
            localStorage.setItem("Auth", "True");
            localStorage.setItem("role", foundUser.role);
            if(foundUser.role == "admin"){
                navigate("/admin");
            } else {
                navigate("/usuario");
            }
            
        } else {
            alert("Usuario o contraseña son incorrectos");
        }
    });
}

// Configura el botón de cerrar sesión
function cerrarSesion() {
    const buttonClose = document.getElementById('close-sesion');

    buttonClose.addEventListener('click', () => {
        localStorage.setItem("Auth", "False");
        localStorage.removeItem("role");
        navigate("/");
    });
}

// ============================
// 🌐 FETCH DE USUARIOS
// ============================
async function getUsers() {
    const res = await fetch(API_URL_USUARIOS);
    const data = await res.json();
    return data;
}

// ============================
// 🔀 SPA - NAVEGACIÓN Y RUTAS
// ============================
const routes = {
    '/': 'login.html',
    '/admin': 'admin.html',
    '/usuario': 'usuario.html'
};

async function navigate(pathName) {
    if (!isAuth()) {
        pathName = "/";
    }

    const route = routes[pathName] || '/';
    const html = await fetch(route).then((res) => res.text());
    document.getElementById('contenedor-main').innerHTML = html;
    history.pushState({}, '', pathName);

    if (pathName == "/usuario" || pathName == "/admin") cerrarSesion();
    if (pathName == "/usuario") {
        setupUsers();
        mostrarTablaUsuario()
    }
    if (pathName == "/") setupLoginForm();
    if (pathName == "/admin") {
        guardarDatos();
        mostrarDatos();
    }
}

// ============================
// 👥 USUARIO Y ROL
// ============================
function setupUsers() {
    const userRole = localStorage.getItem('role');
    const isAdmin = userRole == "admin";
}

// ============================
// 📝 CRUD - CREAR Y ACTUALIZAR
// ============================
function guardarDatos() {
    const formulario = document.getElementById('formulario');

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const posicion = document.getElementById('posicion').value.trim();
        const pais = document.getElementById('pais').value.trim();
        const pie = document.getElementById('pie').value.trim();

        if (name === '' || posicion === '' || pais === '' || pie === '') {
            alert("Por favor llena todos los campos del formulario");
            return;
        }

        const player = { name, posicion, pais, pie };
        const editingId = formulario.dataset.editingId;
        const url = editingId ? `${API_URL_JUGADORES}/${editingId}` : API_URL_JUGADORES;
        const method = editingId ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
        })
        .then(res => res.json())
        .then(data => {
            alert(editingId ? "Jugador actualizado con éxito" : "Jugador guardado con éxito");
            formulario.reset();
            delete formulario.dataset.editingId;
            mostrarDatos();
        })
        .catch(error => console.error("Error al guardar o actualizar jugador:", error));
    });
}

// ============================
// 📋 CRUD - LEER, ELIMINAR Y PINTAR TABLA
// ============================
function mostrarDatos() {
    fetch(API_URL_JUGADORES)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('cuerpo-tabla');
            tbody.innerHTML = "";

            data.forEach(jugador => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${jugador.name}</td>
                    <td>${jugador.posicion}</td>
                    <td>${jugador.pais}</td>
                    <td>${jugador.pie}</td>
                    `;

                const celdaAcciones = document.createElement("td");
                const buttonEdit = document.createElement("button");
                const buttonDelete = document.createElement("button");

                buttonEdit.classList.add("buttonDisplay");
                buttonEdit.textContent = "Editar";
                buttonDelete.classList.add("buttonDisplay");
                buttonDelete.textContent = "Eliminar";

                // Eliminar jugador
                buttonDelete.addEventListener('click', () => {
                    if (confirm("¿Deseas eliminar este jugador?")) {
                        fetch(`${API_URL_JUGADORES}/${jugador.id}`, {
                            method: "DELETE"
                        })
                        .then(() => mostrarDatos())
                        .catch(error => console.error("Error al eliminar jugador", error));
                    }
                });

                // Editar jugador
                buttonEdit.addEventListener('click', () => {
                    document.getElementById('name').value = jugador.name;
                    document.getElementById('posicion').value = jugador.posicion;
                    document.getElementById('pais').value = jugador.pais;
                    document.getElementById('pie').value = jugador.pie;
                    document.getElementById('formulario').dataset.editingId = jugador.id;
                });

                celdaAcciones.appendChild(buttonDelete);
                celdaAcciones.appendChild(buttonEdit);
                row.appendChild(celdaAcciones);
                tbody.appendChild(row);
            });
        });
}

// ============================
// 📋 CRUD - LEER, PINTAR TABLA
// ============================
function mostrarTablaUsuario(){
    fetch(API_URL_JUGADORES)
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById('cuerpo-tabla');
            tbody.innerHTML = "";

            data.forEach(jugador => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${jugador.name}</td>
                    <td>${jugador.posicion}</td>
                    <td>${jugador.pais}</td>
                    <td>${jugador.pie}</td>
                    `;

                tbody.appendChild(row);
            });
        });
}



// ============================
// 🚀 EVENTOS DE INICIO Y SPA
// ============================

// Navegación con botones SPA
document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        const path = e.target.getAttribute("href");
        navigate(path);
    }
});

// Cargar la vista actual al iniciar
document.addEventListener('DOMContentLoaded', () => {
    navigate(location.pathname);
});

// SPA con historial (botón atrás/adelante)
window.addEventListener("popstate", () => {
    navigate(location.pathname);
});
