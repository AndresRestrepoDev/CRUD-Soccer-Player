# ⚽ CRUD Soccer Player

Aplicación web tipo SPA (Single Page Application) para gestionar jugadores de fútbol. Implementa operaciones CRUD, autenticación de usuarios con roles y navegación dinámica sin recarga de página.

## 🛠️ Tecnologías usadas

- HTML5
- CSS3 (con diseño responsive)
- JavaScript (puro, sin frameworks)
- JSON Server (API REST falsa)

## 📌 Funcionalidades

- Login con rol de **admin** o **usuario**
- Navegación SPA sin recargas usando rutas hash (`/#/admin`, `/#/usuario`)
- Rol **admin** puede:
  - Crear, leer, actualizar y eliminar jugadores
- Rol **usuario** solo puede:
  - Visualizar la lista de jugadores
- Protección de rutas: no puedes acceder sin iniciar sesión
- Datos persistidos en `db.json` vía JSON Server

## 🚀 Cómo usar el proyecto

1. Clona el repositorio:
   ```bash
   git clone https://github.com/AndresRestrepoDev/CRUD-Soccer-Player.git
   cd CRUD-Soccer-Player
   ```

2. Instala JSON Server si no lo tienes:
   ```bash
   npm install -g json-server
   ```

3. Ejecuta el servidor:
   ```bash
   json-server --watch db.json
   ```

4. Abre `index.html` en tu navegador.

## 📁 Estructura del proyecto

```
📦 CRUD-Soccer-Player
├── db.json              # Base de datos falsa (jugadores y usuarios)
├── index.html           # Punto de entrada
├── style.css            # Estilos del proyecto
├── main.js              # Lógica de la SPA y funcionalidades
└── README.md            # Este archivo
```

## 🔐 Usuarios de prueba

Puedes usar estos datos en el login:

**Admin:**
- Usuario: `admin`
- Contraseña: `1234`

**Usuario:**
- Usuario: `user`
- Contraseña: `1234`

---

Desarrollado por **Andres Restrepo**
