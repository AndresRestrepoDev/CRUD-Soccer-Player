# ⚽ CRUD de Jugadores de Fútbol

Este proyecto es una aplicación web simple que permite **crear, leer, actualizar y eliminar (CRUD)** jugadores de fútbol. Está construido con **HTML, CSS y JavaScript puro**, y utiliza `json-server` para simular una API REST local.

---

## 🛠 Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (vanilla)
- [json-server](https://github.com/typicode/json-server) para simular el backend

---

## 📂 Estructura del proyecto

```
/CRUD
├── index.html         # Página principal
├── style.css          # Estilos básicos
├── main.js            # Lógica de interacción (fetch, eventos)
├── db.json            # Base de datos simulada para json-server
└── README.md          # Este archivo
```

---

## 🚀 ¿Cómo ejecutar el proyecto?

### 1. Clona el repositorio

```bash
git clone https://github.com/tuusuario/CRUD.git
cd CRUD
```

### 2. Instala json-server (si no lo tienes)

```bash
npm install -g json-server
```

### 3. Crea el archivo `db.json` con contenido inicial como este:

```json
{
  "players": []
}
```

### 4. Ejecuta el servidor

```bash
json-server --watch db.json --port 3000
```

La API estará disponible en:  
📍 `http://localhost:3000/players`

### 5. Abre el proyecto en el navegador

Abre `index.html` en tu navegador (puedes usar Live Server en VS Code o doble clic).

---

## ✨ Funcionalidades

- ✅ Agregar nuevos jugadores
- 📋 Listar todos los jugadores
- 📝 Editar datos existentes
- ❌ Eliminar jugadores
- 🔄 Recarga automática de la tabla después de cada operación

---

## 💡 Mejoras futuras

- Validación más avanzada del formulario
- Filtrado o búsqueda por nombre o posición
- Alerta personalizada con SweetAlert2
- Diseño responsive con media queries

---

## 📸 Vista previa

*(Puedes incluir una captura de pantalla del formulario y la tabla aquí si deseas)*

---

## 🧑‍💻 Autor

**Tu nombre aquí**  
GitHub: [@tuusuario](https://github.com/tuusuario)
