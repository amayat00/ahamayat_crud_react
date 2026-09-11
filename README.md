# mi-crud-react

Frontend en React + Vite que consume la API de usuarios (`users-api`) corriendo en Docker.
Hecho para el taller "CRUD con la API en Docker usando React + Vite".

## Requisitos previos

- Node.js 18+ y npm
- Docker y Docker Compose
- El backend clonado y corriendo:

  ```bash
  git clone https://github.com/JGarcia55/users-api
  cd users-api
  docker compose up --build
  ```

  Verifica que responda en `http://localhost:8080/health` con `{ "ok": true }`.

## Instalación del frontend

```bash
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173` (puerto por defecto de Vite).

Si tu API corre en otro puerto o host, actualiza `BASE_URL` en `src/services/api.js`.

## Estructura del proyecto

```
src/
├─ main.jsx            # Punto de entrada, monta BrowserRouter
├─ App.jsx              # Layout, navegación y definición de rutas
├─ services/api.js       # Todas las llamadas fetch al backend (GET/POST/PUT/DELETE)
├─ hooks/useUsers.js     # Estado de la lista de usuarios + acciones CRUD
├─ pages/
│  ├─ Home.jsx           # Landing page
│  ├─ Users.jsx          # Lista de usuarios, eliminar con confirmación
│  ├─ CreateUser.jsx     # Formulario de creación (POST)
│  └─ EditUser.jsx       # Carga un usuario y permite editarlo (PUT)
└─ components/
   ├─ UserList.jsx        # Tabla de usuarios con acciones editar/eliminar
   ├─ UserForm.jsx         # Formulario controlado y validado (crear y editar)
   └─ Alert.jsx            # Componente de feedback (éxito/error)
```

## Funcionalidad implementada

- **Crear** usuario (`POST /api/users`) con validación de nombre, email y contraseña (mín. 6 caracteres).
- **Leer** usuarios (`GET /api/users`) con estado de carga y manejo de errores.
- **Actualizar** usuario (`PUT /api/users/:id`), contraseña opcional al editar.
- **Eliminar** usuario (`DELETE /api/users/:id`) con modal de confirmación.
- Mensajes de éxito/error visibles tras cada operación.
- Estilado con TailwindCSS 4, diseño responsivo.

## Notas

- El login/autenticación es opcional según el enunciado del taller y **no** está incluido en esta entrega.
- Los errores devueltos por la API (p. ej. correo duplicado) se muestran directamente en el formulario.
