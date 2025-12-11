# MyTasks Project

## 🚀 Tecnologías

- **Frontend**: React 19, Vite, TailwindCSS v4, React Router v7, Zustand/Context API, Framer Motion.
- **Backend**: Node.js, Express v5, Mongoose v9 (MongoDB), TypeScript, Zod (Validación), JWT.

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- MongoDB (Instancia local o Atlas)

## 🛠️ Instalación y Ejecución

Sigue estos pasos para levantar el proyecto completo:

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd MyTasks
```

### 2. Configurar el Backend

```bash
cd my-tasks-backend
npm install
```

Cambia el archvo `.env.example` a `.env` en `my-tasks-backend/` con las siguientes variables:

```env
NODE_ENV=tu_node_env
PORT=tu_port
DOMAIN=tu_domain
MONGO_URI=tu_mongo_uri

# EmailJS configuration
EMAIL_JS_SERVICE_ID=tu_service_id_emailjs
EMAIL_JS_WELCOME_TEMPLATE_ID=tu_welcome_template_id_emailjs
EMAIL_JS_LOGIN_TEMPLATE_ID=tu_login_template_id_emailjs
EMAIL_JS_PUBLIC_KEY=tu_public_key_emailjs
EMAIL_JS_PRIVATE_KEY=tu_private_key_emailjs
EMAIL_JS_URL="https://api.emailjs.com/api/v1.0/email/send"

#JWT Configuration
JWT_SECRET=tu_secret_jwt
JWT_REFRESH_SECRET=tu_refresh_secret_jwt
TWO_FA_EXPIRATION_MINUTES=tu_two_fa_expiration_minutes
JWT_EXPIRES_IN=tu_jwt_expires_in
JWT_REFRESH_EXPIRES_IN=tu_jwt_refresh_expires_in
```

Ejecutar servidor:

```bash
npm run dev
```

### 3. Configurar el Frontend

En una nueva terminal:

```bash
cd my-tasks-front
npm install
```

Cambia el archvo `.env.example` a `.env` en `my-tasks-front/` (o usa las variables de entorno de Vite):

```env
VITE_API_URL=tu_api_url
VITE_ACCESS_KEY=tu_access_key
VITE_EMAIL_CONTACT_URL=https://api.web3forms.com/submit
VITE_TOKEN_STORAGE_KEY=tu_token_storage_key
VITE_USER_STORAGE_KEY=tu_user_storage_key
VITE_REFRESH_TOKEN_STORAGE_KEY=tu_refresh_token_storage_key
```

Ejecutar cliente:

```bash
npm run dev
```

## 🌟 Funcionalidades Principales

1.  **Autenticación Robusta**: Login, Registro, Verificación de 2 Pasos (código por email).
2.  **Gestión de Tareas (CRUD)**: Crear, leer, editar y eliminar tareas con prioridades y etiquetas.
3.  **Roles y Permisos**: Panel de administración para gestionar usuarios (solo Admin).
4.  **UI/UX Premium**: Diseño moderno con TailwindCSS, animaciones suaves y feedback visual (Toasts).

## 📄 Estructura del Proyecto

- `/my-tasks-backend`: API RESTful con arquitectura modular (Controllers, Services, Models).
- `/my-tasks-front`: SPA con React, estructurada por módulos (Auth, Tasks, Admin).

---

Desarrollado para la Evaluación Final de Fullstack.
