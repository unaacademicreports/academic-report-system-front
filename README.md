# Sistema de Gestión y Consulta de Reportes Académicos (Frontend - UNA)

[![Vue 3](https://img.shields.io/badge/Vue%203-3.5.32-4FC08D?style=for-the-badge&logo=vuedotjs)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0.10-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Pinia](https://img.shields.io/badge/Pinia-3.0.4-FFE000?style=for-the-badge&logo=vuedotjs)](https://pinia.vuejs.org/)
[![Vue Router](https://img.shields.io/badge/Vue%20Router-5.0.6-35495E?style=for-the-badge&logo=vuedotjs)](https://router.vuejs.org/)

Plataforma frontend de una sola página (SPA) desarrollada en **Vue 3 (Composition API & `<script setup>`)** y **Vite**, diseñada para la administración, validación, consulta y auditoría de reportes académicos, historiales de estudiantes y carreras de la **Universidad Nacional Abierta (UNA)**.

> [!NOTE]
> **Proyecto de Servicio Comunitario** desarrollado por estudiantes de la carrera de **Ingeniería en Informática** de la **Universidad Nacional Experimental del Táchira (UNET)** en beneficio de la **Universidad Nacional Abierta (UNA)**.

> [!TIP]
> **📚 Manual y Guía de Usuario (`USER-GUIDE.md`):** Para consultar las instrucciones operativas paso a paso, descripción visual de la interfaz de cada módulo e indicaciones para capturas de pantalla, consulte el **[Manual Oficial de Usuario (USER-GUIDE.md)](./USER-GUIDE.md)**.

---

## 📋 Tabla de Contenidos

1. [Manual y Guía de Usuario (`USER-GUIDE.md`)](./USER-GUIDE.md) *(Instrucciones operativas e interfaz)*
2. [Descripción del Proyecto y Especificaciones](#descripción-del-proyecto-y-especificaciones)
3. [Arquitectura y Stack Tecnológico](#arquitectura-y-stack-tecnológico)
4. [Seguridad y Control de Acceso (RBAC & JWT)](#seguridad-y-control-de-acceso-rbac--jwt)
5. [Estructura del Proyecto y Módulos](#estructura-del-proyecto-y-módulos)
6. [Especificación de Módulos y Funcionalidades](#especificación-de-módulos-y-funcionalidades)
   - [6.1 Autenticación y Gestión de Usuarios](#61-autenticación-y-gestión-de-usuarios)
   - [6.2 Carga y Gestión de Reportes Académicos](#62-carga-y-gestión-de-reportes-académicos)
   - [6.3 Consulta de Historial de Estudiantes](#63-consulta-de-historial-de-estudiantes)
   - [6.4 Consulta por Periodos Académicos](#64-consulta-por-periodos-académicos)
   - [6.5 Administración de Carreras](#65-administración-de-carreras)
   - [6.6 Módulo de Auditoría y Trazabilidad](#66-módulo-de-auditoría-y-trazabilidad)
7. [Integración con Backend (API REST)](#integración-con-backend-api-rest)
8. [Guía de Instalación y Configuración](#guía-de-instalación-y-configuración)
9. [Scripts del Proyecto y Despliegue](#scripts-del-proyecto-y-despliegue)

---

## 🚀 Descripción del Proyecto y Especificaciones

El sistema permite a la comunidad académica y administrativa de la UNA gestionar de forma unificada el flujo de calificaciones, actas y reportes periódicos. Se rige bajo estrictas normas de validación de usuario, roles multinivel (`Admin`, `Editor`, y usuarios de consulta) y ofrece una experiencia fluida y reactiva en tiempo real.

### Especificaciones Técnicas Principales:
* **Enfoque Reactivo:** Construido al 100% bajo **Vue 3 Composition API** utilizando Single File Components (SFCs) con la directiva `<script setup>`.
* **Gestión de Estado Centralizada:** Implementación de stores modulares en **Pinia (`useAuthStore`, `useUnaStore`, `useStudentStore`, `useAuditStore`)** para desacoplar la lógica de datos y llamadas de red de los componentes de la interfaz.
* **Manejo Dinámico de Red y Tokens:** Interceptor personalizado `apiFetch` que inyecta automáticamente el token JWT Bearer y maneja códigos `401 Unauthorized` ejecutando una renovación invisible mediante un endpoint de `refresh-token` antes de reintentar la petición original.
* **Diseño UI/UX:** Interfaz moderna, accesible y altamente responsiva utilizando estilos CSS nativos modulares, animaciones suaves y variables de diseño coherentes.

---

## 🛠 Arquitectura y Stack Tecnológico

| Tecnología / Librería | Versión | Propósito en el Proyecto |
| :--- | :--- | :--- |
| **Vue** | `^3.5.32` | Núcleo del frontend, renderizado reactivo y sistema de componentes SFC. |
| **Vite** | `^8.0.10` | Entorno de desarrollo ultrarrápido y empaquetador de producción. |
| **Pinia** | `^3.0.4` | Almacenamiento de estado global reactivo (Reemplazo oficial de Vuex). |
| **Vue Router** | `^5.0.6` | Enrutamiento del lado del cliente y guardias de navegación de seguridad (`beforeEach`). |
| **Vanilla CSS** | — | Sistema de estilos nativo con variables globales (`src/style.css`) y estilos scoped por componente. |

---

## 🔐 Seguridad y Control de Acceso (RBAC & JWT)

La seguridad del sistema está estructurada en tres capas de defensa:

### 1. Enrutamiento Protegido (Navigation Guards)
En `src/router/index.js`, cada ruta define metadatos (`meta`) de seguridad:
```javascript
{
    path: '/reports',
    name: 'Reports',
    component: () => import('../views/Reports.vue'),
    meta: { requiresAuth: true, role: ['Admin', 'Editor'] }
}
```
* **Guardia `beforeEach`:** 
  1. Extrae el token en `localStorage`.
  2. Descodifica el payload de forma nativa (`atob`) y verifica el tiempo de expiración (`exp`).
  3. Si el token está expirado o próximo a expirar en el cambio de ruta, solicita un nuevo token via `useAuthStore().renewToken()` sin interrumpir la navegación del usuario.
  4. Valida que los roles asignados al usuario en el JWT coincidan con los requeridos (`to.meta.role` o `to.meta.roles`). Si no tiene permisos, redirige al `Dashboard`.
* **Guardia de Perfil Personal (`EditUser`):** Valida en `beforeEnter` que un usuario autenticado solo pueda editar su propio ID, o redirige en caso de intento de acceso no autorizado a perfiles ajenos.

### 2. Renovación Automática en Interceptor HTTP (`src/services/api.js`)
Todas las peticiones a endpoints protegidos pasan por `apiFetch()`. Si el servidor responde con un status `401 Unauthorized`, el interceptor pausa la petición, invoca `authStore.renewToken()` usando el `refresh_token`, actualiza la cabecera `Authorization: Bearer <nuevo_token>` y reintenta la solicitud fallida de manera totalmente transparente.

---

## 📁 Estructura del Proyecto y Módulos

```text
academic-report-sys-front/
├── public/
│   └── favicon.svg                  # Icono de la aplicación
├── src/
│   ├── assets/                      # Imágenes, fuentes e íconos estáticos
│   ├── components/                  # Componentes reutilizables de la UI
│   │   ├── Alerts.vue               # Componente para mensajes de alerta y feedback
│   │   ├── IdentificationForm.vue   # Formulario de búsqueda rápida por identificación
│   │   ├── LogoUnaComponent.vue     # Componente SVG del logo institucional UNA
│   │   ├── MenuUserLoged.vue        # Menú desplegable del usuario activo
│   │   ├── ModalEditCaereer.vue     # Modal para edición y alta de carreras
│   │   ├── ModalEditUser.vue        # Modal de modificación de datos y roles de usuario
│   │   ├── Navbar.vue               # Barra de navegación principal del sistema
│   │   ├── NavbarOptions.vue        # Opciones y enlaces contextuales de navegación
│   │   ├── NavbarSecondary.vue      # Submenú superior para módulos específicos
│   │   ├── Pagination.vue           # Componente de paginación sincronizada para tablas
│   │   ├── PeriodsCards.vue         # Tarjetas para visualizar periodos académicos
│   │   ├── PeriodsForm.vue          # Formulario para filtrado por periodo/carrera
│   │   ├── RegisterUserModal.vue    # Modal de registro administrativo de usuarios
│   │   ├── TableAcademicReport.vue  # Tabla de reportes académicos cargados
│   │   ├── TableAuditReports.vue    # Tabla de logs y auditoría sobre reportes
│   │   ├── TableAuditUsers.vue      # Tabla de trazabilidad de acciones de usuarios
│   │   ├── TableCaereers.vue        # Tabla de gestión del catálogo de carreras
│   │   ├── TableInfo.vue            # Tabla multiuso para mostrar historiales y resúmenes
│   │   ├── TableUsers.vue           # Tabla de listado e indexación de usuarios
│   │   ├── Tags.vue                 # Componente visual para roles e indicadores de estado
│   │   └── UploadArchive.vue        # Interfaz de arrastrar y soltar (drag & drop) para actas/reportes
│   ├── router/
│   │   └── index.js                 # Configuración de Vue Router y Navigation Guards (RBAC)
│   ├── services/
│   │   └── api.js                   # Interceptor HTTP con manejo de tokens y BASE_URL
│   ├── stores/                      # Módulos del estado global (Pinia Stores)
│   │   ├── audit.js                 # Store de trazabilidad y logs (reportes y usuarios)
│   │   ├── auth.js                  # Store de sesión, JWT, renovación y ABM de usuarios
│   │   ├── data-una.js              # Store de periodos académicos, reportes y carreras
│   │   └── student.js               # Store de consulta de historial académico de estudiantes
│   ├── views/                       # Vistas / Páginas vinculadas a las rutas
│   │   ├── Audit.vue                # Panel de auditoría para administradores
│   │   ├── CareersView.vue          # Vista del catálogo y administración de carreras
│   │   ├── Dashboard.vue            # Página principal de bienvenida y accesos rápidos
│   │   ├── EditUser.vue             # Vista y formulario de edición del perfil de usuario
│   │   ├── ListUsers.vue            # Vista de administración y listado general de usuarios
│   │   ├── Loginv2.vue              # Pantalla de inicio de sesión
│   │   ├── Register.vue             # Pantalla de registro para nuevos usuarios
│   │   ├── Reports.vue              # Vista de carga de archivos y consulta de reportes
│   │   ├── SearchPeriod.vue         # Vista de exploración por periodos académicos
│   │   └── SearchStudent.vue        # Vista de consulta individual de estudiantes
│   ├── App.vue                      # Componente raíz de la aplicación
│   ├── main.js                      # Punto de entrada de Vue 3, registro de Pinia y Router
│   └── style.css                    # Hoja de estilos global, resets y diseño base
├── index.html                       # Documento HTML principal con soporte para SPA en GitHub Pages
├── package.json                     # Dependencias y scripts de construcción
└── vite.config.js                   # Configuración de construcción de Vite y plugins Vue
```

---

## 🔍 Especificación de Módulos y Funcionalidades

> [!TIP]
> **💡 ¿Buscas el manual de uso visual?** Esta sección documenta la arquitectura de código e implementación técnica en las tiendas de **Pinia** (`auth.js`, `data-una.js`, `student.js`, `audit.js`). Si necesitas ver **cómo utilizar cada vista paso a paso, dónde hacer clic y las indicaciones para capturar imágenes**, dirígete al **[Manual Oficial de Usuario (USER-GUIDE.md)](./USER-GUIDE.md)**.

### 6.1 Autenticación y Gestión de Usuarios (`auth.js`)
* **`logIn(username, password)`:** Envía credenciales al backend, procesa la respuesta e inicializa `localStorage` y el estado de Pinia con los claims del JWT.
* **`signUp(...)` / `getUsers(page)`:** Creación de nuevos usuarios con rol específico (requiere permisos administrativos) y listado paginado para el módulo de administración (`ListUsers.vue`).
* **`updateUser` & `updateUserRole`:** Permite modificar la información personal o la asignación de roles de cualquier miembro en el panel administrativo (`ModalEditUser.vue`).
* **`renewToken()`:** Envía el `refresh_token` almacenado a `/auth/refresh-token` para extender de manera segura la sesión sin requerir nuevo ingreso de contraseña.

### 6.2 Carga y Gestión de Reportes Académicos (`data-una.js` -> `Reports.vue`)
* **`uploadReportFile(file)`:** Construye un `FormData` e inyecta el archivo de reporte (`/reports` en método `POST`). Mantiene estados reactivos de `isReportUploading`, `reportUploadStatus` y `reportUploadMessage` para retroalimentación visual en `UploadArchive.vue`.
* **`listReports()` / `deleteReport(code)`:** Obtiene y elimina reportes consolidados o periodos académicos.

### 6.3 Consulta de Historial de Estudiantes (`student.js` -> `SearchStudent.vue`)
* **`fetchStudent(identification)`:** Consulta el endpoint `/students/:identification`. Si el estudiante existe, formatea en `TableInfo.vue` toda su trayectoria por semestre, asignaturas cursadas, calificaciones obtenidas y situación académica actual. Maneja errores como `404 Not Found` informando al usuario limpiamente a través de `Alerts.vue`.

### 6.4 Consulta por Periodos Académicos (`data-una.js` -> `SearchPeriod.vue`)
* **`fetchAcademicPeriods()`:** Obtiene el listado de todos los periodos y ciclos formativos de la UNA para alimentar selectores y filtros (`PeriodsForm.vue`).
* Permite explorar de manera global el comportamiento académico segmentando por carrera y año lectivo en `PeriodsCards.vue`.

### 6.5 Administración de Carreras (`data-una.js` -> `CareersView.vue`)
* **`fetchCareers()`, `fetchCreateCareers(careers)`, `updateCareer(id, payload)`, `deleteCareer(id)`:** Operaciones completas CRUD para mantener sincronizado el catálogo universitario de carreras (`TableCaereers.vue`).

### 6.6 Módulo de Auditoría y Trazabilidad (`audit.js` -> `Audit.vue`)
* **`fetchActivitiesReports(page)`:** Consulta `/reports?page=...` o `/reports/audit/reports` para exponer la bitácora de documentos subidos, fechas de validación y responsables.
* **`fetchActivities(page)`:** Consulta `/reports/audit/users` para listar el historial de operaciones de los usuarios (ingresos, cambios de roles, modificaciones en los registros), garantizando transparencia en la gestión institucional.

---

## 🌐 Integración con Backend (API REST)

El sistema está preconfigurado para conectarse mediante `BASE_URL` (`src/services/api.js`). La URL del backend se encuentra apuntando al servidor de producción en la nube o entorno local:

```javascript
// Configuración en src/services/api.js
// const API_URL = "http://127.0.0.1:5000";
const API_URL = "https://newsletter-generator-una.onrender.com";
const struct_api = "/api/v1";
export const BASE_URL = `${API_URL}${struct_api}`;
```

### Endpoints Clave del Sistema:
| Módulo | Endpoint | Método | Descripción |
| :--- | :--- | :--- | :--- |
| **Auth** | `/auth/login` | `POST` | Autenticación y expedición de JWT (`token` y `refresh_token`). |
| **Auth** | `/auth/refresh-token` | `POST` | Renovación de token de acceso expirado. |
| **Auth** | `/auth/user` | `GET` / `POST` | Obtener listado paginado o registrar un nuevo usuario. |
| **Auth** | `/auth/user/:id` | `PUT` / `DELETE`| Actualizar datos de un usuario o eliminarlo. |
| **Auth** | `/auth/user/:id/role` | `POST` | Modificar rol (`Admin`, `Editor`, etc.) de un usuario. |
| **Estudiantes**| `/students/:id` | `GET` | Obtener datos e historial completo de un estudiante por identificación. |
| **Reportes** | `/reports` | `GET` / `POST` | Consultar reportes subidos o adjuntar archivo mediante `FormData`. |
| **Periodos** | `/academic-periods` | `GET` | Listar periodos académicos disponibles. |
| **Periodos** | `/academic-periods/:code`| `DELETE` | Eliminar un reporte / periodo académico. |
| **Carreras** | `/careers` | `GET` / `POST` | Consultar catálogo o registrar una nueva carrera. |
| **Carreras** | `/careers/:id` | `PUT` / `DELETE`| Modificar o eliminar una carrera específica. |
| **Auditoría** | `/reports/audit/users` | `GET` | Obtener logs de actividad administrativa del sistema. |

---

## 💻 Guía de Instalación y Configuración

### Prerrequisitos
* **Node.js**: Versión 18.x o superior.
* **NPM**: Versión 9.x o superior (incluido en Node.js).

### Paso 1: Clonar el repositorio e ingresar al directorio
```bash
git clone <url-del-repositorio>
cd academic-report-sys-front
```

### Paso 2: Instalar las dependencias del proyecto
```bash
npm install
```

### Paso 3: Configuración del Entorno de Desarrollo
Por defecto, la URL de la API se gestiona en `src/services/api.js`. Si deseas ejecutar el frontend apuntando a tu backend local (`http://127.0.0.1:5000`), edita las primeras líneas de `src/services/api.js`:
```javascript
const API_URL = "http://127.0.0.1:5000";
// const API_URL = "https://newsletter-generator-una.onrender.com";
```

---

## ⚡ Scripts del Proyecto y Despliegue

El archivo `package.json` incluye los comandos esenciales ejecutados a través de Vite:

```bash
# 1. Iniciar servidor de desarrollo en modo recarga activa (Hot Module Replacement)
npm run dev

# 2. Compilar el proyecto para producción en la carpeta dist/
npm run build

# 3. Previsualizar de manera local la versión compilada para producción
npm run preview
```

### Soporte para Single Page Applications (SPA) en GitHub Pages / Servidores Estáticos
El archivo `index.html` cuenta con el script de enrutamiento **Single Page Apps for GitHub Pages (`l.search.slice(1).split('&')`)** que intercepta redirecciones de subrutas y las convierte adecuadamente a rutas interpretables por el `createWebHistory` de **Vue Router** cuando el proyecto se publica en servidores estáticos sin un backend con redirección de comodín (`/* -> index.html`).

---

## 👥 Autores y Créditos del Proyecto (Servicio Comunitario)

Este proyecto fue concebido y desarrollado como cumplimiento del **Proyecto de Servicio Comunitario** por estudiantes de la carrera de **Ingeniería en Informática** de la **Universidad Nacional Experimental del Táchira (UNET)**, destinado al beneficio de la comunidad académica y administrativa de la **Universidad Nacional Abierta (UNA)**.

| Rol en el Proyecto | Nombre y Apellido | Carrera / Especialidad | Correo Institucional |
| :--- | :--- | :--- | :--- |
| **Estudiante Autor / Creador** | **Héctor David Ramírez** | Ingeniería en Informática (UNET) | [hectordavid.ramirez@unet.edu.ve](mailto:hectordavid.ramirez@unet.edu.ve) |
| **Estudiante Autor / Creador** | **Oscar G. Zambrano** | Ingeniería en Informática (UNET) | [oscarg.zambrano@unet.edu.ve](mailto:oscarg.zambrano@unet.edu.ve) |
| **Institución Desarrolladora** | **UNET** | Universidad Nacional Experimental del Táchira | — |
| **Institución Beneficiaria** | **UNA** | Universidad Nacional Abierta | — |

---

<p align="center">
  <b>Universidad Nacional Experimental del Táchira (UNET) & Universidad Nacional Abierta (UNA)</b><br>
  <i>Proyecto de Servicio Comunitario - Sistema de Gestión de Reportes Académicos</i>
</p>

