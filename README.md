# MyTasks Project

Proyecto Fullstack de Gestión de Tareas y Usuarios desarrollado con el stack MERN (MongoDB, Express, React, Node.js).
Este proyecto incluye funcionalidades completas de autenticación (JWT, 2FA), roles de usuario (Admin/User), y un CRUD completo de tareas con una interfaz moderna y responsiva.

## 🚀 Tecnologías

- **Frontend**: React 19, Vite, TailwindCSS v4, React Router v7, Zustand/Context API, Framer Motion.
- **Backend**: Node.js, Express v5, Mongoose v9 (MongoDB), TypeScript, Zod (Validación), JWT.
- **Herramientas**: GitKraken (Gestión de versiones), Swagger (Documentación API).

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

Crea un archivo `.env` en `my-tasks-backend/` con las siguientes variables (ejemplo):

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/mytasks
JWT_SECRET=tu_secreto_super_seguro
JWT_REFRESH_SECRET=tu_secreto_refresh
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_password_aplicacion
frontend_URL=http://localhost:5173
email_contact_url=https://api.emailjs.com/api/v1.0/email/send-form
access_key=tu_key_emailjs
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

Crea un archivo `.env` en `my-tasks-front/` (o usa las variables de entorno de Vite):

```env
VITE_API_URL=http://localhost:3000/api
VITE_EMAIL_JS_SERVICE_ID=service_id
VITE_EMAIL_JS_TEMPLATE_ID=template_id
VITE_EMAIL_JS_PUBLIC_KEY=public_key
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
