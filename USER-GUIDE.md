# Manual y Guía de Usuario del Sistema de Gestión de Reportes Académicos (Frontend - UNET / UNA)

Bienvenido a la guía oficial de usuario del **Sistema de Gestión de Reportes Académicos**. Esta plataforma constituye el producto tecnológico final desarrollado como **Proyecto de Servicio Comunitario** por estudiantes de la carrera de **Ingeniería en Informática** de la **Universidad Nacional Experimental del Táchira (UNET)** en beneficio y apoyo institucional a la **Universidad Nacional Abierta (UNA)**. 

Este documento ha sido diseñado para explicar el funcionamiento paso a paso de cada una de las vistas (pantallas) que componen la aplicación, indicando con exactitud qué muestra cada sección, qué acciones debe realizar el usuario y dónde se deben insertar las imágenes o capturas de pantalla con las flechas y señalizaciones correspondientes para su presentación formal.

---

## 📋 Índice de Vistas del Sistema

1. [Barra de Navegación Principal y Menú de Usuario (Navbar)](#1-barra-de-navegación-principal-y-menú-de-usuario-navbar)
2. [Vista de Inicio de Sesión (Login)](#2-vista-de-inicio-de-sesión-login)
3. [Panel Principal de Bienvenida (Dashboard)](#3-panel-principal-de-bienvenida-dashboard)
4. [Módulo de Carga y Gestión de Reportes Académicos](#4-módulo-de-carga-y-gestión-de-reportes-académicos)
5. [Módulo de Consulta y Búsqueda de Estudiantes](#5-módulo-de-consulta-y-búsqueda-de-estudiantes)
6. [Módulo de Consulta por Periodo Académico](#6-módulo-de-consulta-por-periodo-académico)
7. [Módulo de Administración de Carreras](#7-módulo-de-administración-de-carreras)
8. [Módulo de Gestión de Usuarios del Sistema](#8-módulo-de-gestión-de-usuarios-del-sistema)
9. [Vista de Edición de Perfil de Usuario](#9-vista-de-edición-de-perfil-de-usuario)
10. [Módulo de Auditoría y Trazabilidad (Logs)](#10-módulo-de-auditoría-y-trazabilidad-logs)

---

## 1. Barra de Navegación Principal y Menú de Usuario (Navbar)

### 📌 Propósito del Módulo
La barra de navegación (`Navbar.vue` / `MenuUserLoged.vue`) se encuentra fija en la parte superior de todas las pantallas una vez que el usuario ha iniciado sesión. Su objetivo es permitir un desplazamiento rápido y seguro entre los diferentes módulos de la plataforma según los permisos y roles otorgados (`Admin`, `Editor` o Consulta).

### 👁️ ¿Qué Muestra la Interfaz?
* **Lado Izquierdo:** El logotipo oficial y el título de la institución (**UNET**).
* **Centro / Opciones (`NavbarOptions`):** Enlaces de acceso directo a las vistas del sistema: *Inicio (`Dashboard`)*, *Reportes*, *Buscar Estudiante*, *Buscar Periodo*, *Carreras*, *Usuarios* y *Auditoría* (algunas opciones se ocultan o muestran automáticamente dependiendo del rol de usuario).
* **Lado Derecho (`MenuUserLoged`):** El nombre completo del usuario conectado, su rol actual en un indicador visual de etiqueta (`Tags.vue`) y un ícono desplegable que da acceso al menú de sesión.

### 🛠️ ¿Qué Debe Hacer el Usuario?
1. Para desplazarse a otro módulo, haga clic sobre el enlace correspondiente en la barra central de opciones.
2. Para ver opciones personales o salir del sistema, haga clic sobre su **nombre de usuario** en la esquina superior derecha. Se abrirá un submenú desplegable:
   * **Editar Perfil / Mi Cuenta:** Permite acceder a la modificación de sus datos personales.
   * **Cerrar Sesión (`Log Out`):** Termina la sesión de forma segura, elimina el token de acceso y regresa a la pantalla de Login.

> ### 🖼️ Guía para Captura de Pantalla: Barra de Navegación y Menú Desplegable
> * **`[ESPACIO PARA CAPTURA DE PANTALLA: NAVBAR GENERAL Y MENÚ DE USUARIO DESPLEGADO]`**
> * **Indicadores y flechas a señalar en la imagen:**
>   * ➡️ **Flecha 1 (Logo institucional):** Señalar el logo a la izquierda.
>   * ➡️ **Flecha 2 (Menú central de enlaces):** Encerrar en un recuadro o señalar las opciones disponibles de navegación (*Reportes, Estudiantes, Carreras*, etc.).
>   * ➡️ **Flecha 3 (Etiqueta de Rol del Usuario):** Apuntar al distintivo visual donde aparece el rol (por ejemplo, `[Admin]` o `[Editor]`).
>   * ➡️ **Flecha 4 (Botón "Cerrar Sesión"):** Señalar la opción de salir dentro del menú desplegado a la derecha.

---

## 2. Vista de Inicio de Sesión (Login)

### 📌 Propósito del Módulo
La pantalla de inicio de sesión (`Loginv2.vue`) es la puerta de entrada obligatoria al sistema. Garantiza que únicamente personal autorizado por la UNET pueda ingresar a la gestión académica, encriptando y validando las credenciales a través de tokens de seguridad JWT.

### 👁️ ¿Qué Muestra la Interfaz?
* Un cuadro central limpio con el encabezado institucional y el formulario de autenticación.
* **Campo "Usuario (`username`)":** Entrada de texto para digitar el nombre de usuario asignado.
* **Campo "Contraseña (`password`)":** Entrada de texto protegida para ingresar clave secreta.
* **Botón de Acción "Iniciar Sesión":** Botón principal para procesar la petición.
* **Mensajes de Alerta (`Alerts.vue`):** En caso de error (credenciales incorrectas, usuario inactivo o problemas de red), aparecerá una alerta visual con la explicación del fallo.

### 🛠️ ¿Qué Debe Hacer el Usuario?
1. Escriba su nombre de usuario en el primer campo.
2. Escriba su contraseña de acceso en el segundo campo.
3. Presione la tecla **Enter** o haga clic en el botón azul **"Iniciar Sesión"**.
4. Si los datos son correctos, el sistema lo redirigirá automáticamente a la pantalla de bienvenida (`Dashboard`).

> ### 🖼️ Guía para Captura de Pantalla: Vista de Login
> * **`[ESPACIO PARA CAPTURA DE PANTALLA: PANTALLA DE INICIO DE SESIÓN]`**
> * **Indicadores y flechas a señalar en la imagen:**
>   * ➡️ **Flecha 1 (Campo Usuario):** Señalar la caja de texto para digitar el usuario.
>   * ➡️ **Flecha 2 (Campo Contraseña):** Señalar la caja de texto para la clave.
>   * ➡️ **Flecha 3 (Botón Iniciar Sesión):** Resaltar el botón principal de ingreso.
>   * ➡️ **Flecha 4 (Zona de Alerta de Errores - opcional):** Indicar dónde aparece el recuadro rojo de advertencia en caso de colocar credenciales erróneas.

---

## 3. Panel Principal de Bienvenida (Dashboard)

### 📌 Propósito del Módulo
El `Dashboard.vue` es la primera vista en pantalla que se presenta al iniciar sesión con éxito. Actúa como panel centralizador y resumen de operaciones accesibles para el usuario de acuerdo a su nivel de jerarquía.

### 👁️ ¿Qué Muestra la Interfaz?
* **Sección Hero / Saludo:** Un mensaje de bienvenida personalizado: *"Bienvenido, [Nombre del Usuario]"*.
* **Tarjetas de Opciones Rápidas (`#menu-options`):** Un listado en cuadrícula de tarjetas interactivas con íconos, títulos y descripciones de las tareas más comunes:
  * 🗂️ **Card "Cargar Reporte"** *(Visible únicamente para usuarios con rol `Admin` y `Editor`)*: Acceso directo al módulo de carga de archivos académicos.
  * 👤 **Card "Buscar Estudiante"**: Acceso directo para consultar historiales y notas por cédula.
  * 📅 **Card "Buscar Periodo Académico"**: Acceso directo para auditar semestres completos.

### 🛠️ ¿Qué Debe Hacer el Usuario?
1. Identifique cuál es la operación que desea realizar en la jornada.
2. Haga clic directamente sobre cualquiera de las tarjetas o recuadros para ingresar de inmediato al módulo seleccionado.

> ### 🖼️ Guía para Captura de Pantalla: Dashboard
> * **`[ESPACIO PARA CAPTURA DE PANTALLA: DASHBOARD PRINCIPAL CON TARJETAS]`**
> * **Indicadores y flechas a señalar en la imagen:**
>   * ➡️ **Flecha 1 (Saludo de Bienvenida):** Señalar la sección superior donde aparece el nombre del usuario conectado.
>   * ➡️ **Flecha 2 (Tarjeta "Cargar Reporte"):** Resaltar la tarjeta con el ícono de carpeta para carga de archivos.
>   * ➡️ **Flecha 3 (Tarjeta "Buscar Estudiante"):** Resaltar la tarjeta de búsqueda con ícono de lupa/usuario.
>   * ➡️ **Flecha 4 (Tarjeta "Buscar Periodo Académico"):** Resaltar el recuadro de consulta de lapsos académicos.

---

## 4. Módulo de Carga y Gestión de Reportes Académicos

### 📌 Propósito del Módulo
Esta vista (`Reports.vue` / `UploadArchive.vue`) permite al personal administrativo (`Admin` y `Editor`) alimentar la base de datos subiendo los archivos oficiales de reportes y calificaciones de la universidad, así como administrar el listado de periodos que ya han sido procesados.

### 👁️ ¿Qué Muestra la Interfaz?
* **Encabezado explicativo:** "Reportes Académicos - Información general de los reportes cargados".
* **Zona de Carga de Archivos (`UploadArchive`):** Un recuadro interactivo delineado para arrastrar y soltar archivos (Drag & Drop) con un botón central que dice **"Seleccionar archivo / Explorar"**.
* **Recuadro Azul de Instrucciones (`.instructions`):** Panel informativo con el ícono de ayuda que indica que los archivos obligatoriamente deben cumplir con la extensión y estructura válida **`.rep`**.
* **Tabla de Periodos Académicos (`.wrap-table`):** Tabla que enlista todos los reportes consolidados en la base de datos:
  * **Columna "ID":** Identificador interno del registro.
  * **Columna "Código":** Código oficial del lapso académico (Ej: `2023-1`, `2024-2`).
  * **Columna "Acciones":** Botón de acción **"Eliminar"** en color rojo para depurar reportes antiguos o cargados por error.

### 🛠️ ¿Qué Debe Hacer el Usuario?
#### Para cargar un nuevo archivo oficial:
1. Arrastre el archivo con extensión `.rep` desde el explorador de archivos de su computadora y suéltelo en el recuadro punteado, o bien haga clic en **"Explorar archivo"** para buscarlo en su equipo.
2. Al seleccionar el archivo, el sistema comenzará a subirlo automáticamente (`isReportUploading`).
3. Verifique el mensaje de retroalimentación emergente: si la carga es exitosa, la tabla de abajo se actualizará de inmediato con el nuevo periodo y notas.

#### Para eliminar un reporte existente:
1. Ubique el código del periodo en la tabla inferior.
2. Haga clic en el botón rojo **"Eliminar"**.
3. Confirme la acción en la ventana de advertencia que pregunta: *"¿Está seguro de que desea eliminar este periodo académico y todos sus registros asociados?"*. Al confirmar, las calificaciones asociadas al periodo se desvincularán del sistema.

> ### 🖼️ Guía para Captura de Pantalla: Carga de Reportes y Tabla
> * **`[ESPACIO PARA CAPTURA DE PANTALLA: PANTALLA DE CARGA DE REPORTES Y TABLA INFERIOR]`**
> * **Indicadores y flechas a señalar en la imagen:**
>   * ➡️ **Flecha 1 (Zona de Drag & Drop):** Encerrar el recuadro punteado donde se sueltan los archivos.
>   * ➡️ **Flecha 2 (Caja de Instrucciones .rep):** Apuntar a las instrucciones de formato requerido.
>   * ➡️ **Flecha 3 (Columnas ID y Código):** Resaltar el listado donde aparecen los lapsos activos.
>   * ➡️ **Flecha 4 (Botón rojo "Eliminar"):** Apuntar al botón en la columna de Acciones de la tabla.

---

## 5. Módulo de Consulta y Búsqueda de Estudiantes

### 📌 Propósito del Módulo
La pantalla `SearchStudent.vue` constituye una de las herramientas más consultadas de la plataforma. Permite visualizar la ficha técnica, trayectoria por lapsos y el récord de notas de un estudiante partiendo de su número de cédula o identificación.

### 👁️ ¿Qué Muestra la Interfaz?
* **Formulario de Búsqueda Superior (`IdentificationForm`):** Un recuadro blanco con un campo de texto para escribir la identificación y un botón azul **"Buscar"**.
* **Sección de Estado (Cargando / Errores):** Muestra indicador animado al consultar el servidor o mensajes explicativos en caso de que la cédula no esté registrada ("Estudiante no encontrado").
* **Tarjeta de Datos Personales (`.student-data`):** Al encontrar al estudiante, muestra:
  * Ícono de avatar.
  * **Nombre Completo** y **Número de Cédula/Identificación**.
  * **Carrera Universitaria:** Título de la carrera a la que pertenece (Ej: *Ingeniería en Informática*).
* **Trayectoria y Calificaciones (`.academic-data`):**
  * **Selector de Periodos Académicos:** Lista de pestañas o botones navegables con los códigos de los semestres que el alumno ha cursado en la UNET.
  * **Tabla de Calificaciones (`TableAcademicReport`):** Al hacer clic en un periodo, despliega la tabla con las asignaturas inscritas en ese ciclo: Código de Materia, Nombre, Sección, Calificación numérica obtenida y Estado (Aprobada / Reprobada / Retirada).
  * **Botón de Exportación "Descargar Ficha Académica":** Botón ubicado al pie de la tabla que genera un documento PDF oficial con las notas del lapso seleccionado para impresión o constancia.

### 🛠️ ¿Qué Debe Hacer el Usuario?
1. Escriba el número de cédula del estudiante (sin puntos ni guiones) en la casilla de búsqueda superior.
2. Haga clic en el botón **"Buscar"** o presione **Enter**.
3. Verifique los datos de la carrera y el nombre en el panel izquierdo.
4. En el panel derecho, haga clic sobre la pestaña del **Periodo Académico** (Ej: `2023-1`) que desea auditar.
5. Revise el detalle de las calificaciones y materias en la tabla.
6. Si necesita un respaldo impreso o en documento digital, haga clic en el botón azul **"Descargar Ficha Académica"** para abrir el PDF en una nueva pestaña.

> ### 🖼️ Guía para Captura de Pantalla: Búsqueda y Ficha del Estudiante
> * **`[ESPACIO PARA CAPTURA DE PANTALLA: PANTALLA CON RESULTADOS DE BÚSQUEDA DE UN ESTUDIANTE]`**
> * **Indicadores y flechas a señalar en la imagen:**
>   * ➡️ **Flecha 1 (Campo y Botón de Búsqueda):** Apuntar a la zona donde se ingresa la cédula y se presiona "Buscar".
>   * ➡️ **Flecha 2 (Recuadro de Datos Personales y Carrera):** Resaltar el bloque izquierdo que muestra el nombre y carrera del alumno.
>   * ➡️ **Flecha 3 (Pestañas de Periodos Académicos):** Encerrar en un recuadro las pastillas con los semestres cursados (indicando cuál está activo/seleccionado).
>   * ➡️ **Flecha 4 (Tabla de Materias y Calificaciones):** Apuntar a las filas donde aparecen las notas de cada asignatura.
>   * ➡️ **Flecha 5 (Botón "Descargar Ficha Académica"):** Resaltar el botón final que permite exportar a PDF.

---

## 6. Módulo de Consulta por Periodo Académico

### 📌 Propósito del Módulo
La vista `SearchPeriod.vue` está pensada para la revisión estadística y consulta masiva por ciclo lectivo. Permite filtrar y revisar las cargas de materias dictadas y el rendimiento de alumnos clasificados por Carrera y Periodo.

### 👁️ ¿Qué Muestra la Interfaz?
* **Formulario de Filtro (`PeriodsForm`):**
  * **Selector de Carrera (`Dropdown`):** Menú desplegable para elegir la carrera universitaria.
  * **Selector de Periodo Académico (`Dropdown`):** Menú desplegable para seleccionar el año/ciclo.
  * **Botón de Consulta:** Botón para disparar la consulta al servidor.
* **Resultados en Tarjetas / Tablas (`PeriodsCards`):** Lista el compendio de materias o secciones impartidas durante ese lapso para la carrera seleccionada.

### 🛠️ ¿Qué Debe Hacer el Usuario?
1. Despliegue la primera lista y seleccione la **Carrera**.
2. Despliegue la segunda lista y seleccione el **Periodo Académico** que desea analizar.
3. Haga clic en el botón **"Consultar / Buscar"**.
4. Explore las tarjetas de resultados arrojadas en la parte inferior para verificar el resumen de materias y registros ingresados.

> ### 🖼️ Guía para Captura de Pantalla: Consulta por Periodo
> * **`[ESPACIO PARA CAPTURA DE PANTALLA: FORMULARIO DE FILTROS Y RESULTADOS POR PERIODO]`**
> * **Indicadores y flechas a señalar en la imagen:**
>   * ➡️ **Flecha 1 (Menú de Carrera):** Señalar el selector desplegable con las carreras UNET.
>   * ➡️ **Flecha 2 (Menú de Periodo):** Señalar la lista desplegable de los semestres disponibles.
>   * ➡️ **Flecha 3 (Botón Consultar):** Resaltar el botón que ejecuta el filtro.
>   * ➡️ **Flecha 4 (Tarjetas de Resultados inferiores):** Apuntar a la sección donde se listan las materias encontradas en el periodo.

---

## 7. Módulo de Administración de Carreras

### 📌 Propósito del Módulo
La pantalla `CareersView.vue` es donde el personal directivo o administradores (`Admin` / `Editor`) mantienen actualizado el catálogo maestro de especialidades y carreras que imparte la universidad.

### 👁️ ¿Qué Muestra la Interfaz?
* **Encabezado y Botón Superior:** Botón destacado verde/azul **"+ Agregar Carrera"** en la parte superior derecha.
* **Tabla del Catálogo de Carreras (`TableCaereers`):**
  * **ID:** Número correlativo de base de datos.
  * **Código de Carrera:** Identificador numérico o alfanumérico oficial.
  * **Nombre de la Carrera:** Nombre oficial de la especialidad (Ej: *Ingeniería Civil*, *Licenciatura en Música*).
  * **Columna Acciones:** Botones para **"Editar"** (ícono de lápiz o botón azul) y **"Eliminar"** (ícono de papelera o botón rojo).
* **Modal de Edición / Registro (`ModalEditCaereer.vue`):** Ventana superpuesta que aparece al intentar crear o modificar una carrera con los campos obligatorios de Código y Nombre.

### 🛠️ ¿Qué Debe Hacer el Usuario?
#### Para crear una nueva carrera:
1. Haga clic en el botón superior **"+ Agregar Carrera"**.
2. En la ventana modal que se abre, ingrese el **Código de la Carrera** y el **Nombre Oficial**.
3. Haga clic en **"Guardar"**. La tabla se recargará mostrando la nueva carrera.

#### Para editar o eliminar una carrera:
1. Ubique la carrera en la tabla.
2. Si desea corregir un error en el nombre o código, presione **"Editar"**, modifique el texto en la ventana flotante y guarde los cambios.
3. Si desea remover una carrera obsoleta, haga clic en **"Eliminar"** y confirme la alerta.

> ### 🖼️ Guía para Captura de Pantalla: Gestión de Carreras y Modal
> * **`[ESPACIO PARA CAPTURA DE PANTALLA: TABLA DE CARRERAS CON BOTÓN AGREGAR Y MODAL ABIERTO (OPCIONAL)]`**
> * **Indicadores y flechas a señalar en la imagen:**
>   * ➡️ **Flecha 1 (Botón "+ Agregar Carrera"):** Apuntar al botón superior para insertar carreras.
>   * ➡️ **Flecha 2 (Columnas de la tabla de Carreras):** Resaltar el listado de Códigos y Nombres de Carreras de la UNET.
>   * ➡️ **Flecha 3 (Botón Editar):** Señalar el botón de acción para modificar en una fila específica.
>   * ➡️ **Flecha 4 (Botón Eliminar):** Señalar el botón rojo de borrado de carrera.

---

## 8. Módulo de Gestión de Usuarios del Sistema

### 📌 Propósito del Módulo
La vista `ListUsers.vue` es el centro de control de identidades donde el Administrador (`Admin`) o Editor gestiona los accesos del personal de la UNET (Docentes, Coordinadores, Registradores).

### 👁️ ¿Qué Muestra la Interfaz?
* **Botón Superior:** **"+ Registrar Usuario"** para abrir el formulario de nuevas incorporaciones.
* **Tabla General de Usuarios (`TableUsers`):**
  * **Nombres y Apellidos:** Identificación del funcionario.
  * **Usuario (`Username`) y Correo Electrónico:** Datos de inicio de sesión y contacto institucional.
  * **Etiqueta de Rol (`Role`):** Distintivo visual (`Tags.vue`) que indica los permisos del usuario (`Admin`, `Editor` o Usuario General).
  * **Acciones:** Botón de **"Editar / Asignar Rol"** (`ModalEditUser`) y botón de **"Eliminar"**.
* **Control de Paginación (`Pagination.vue`):** Barra al pie de la tabla con botones de página anterior (`Anterior`), números de página (`1, 2, 3...`) y página siguiente (`Siguiente`) para navegar por el padrón de usuarios sin saturar la pantalla.

### 🛠️ ¿Qué Debe Hacer el Usuario (Administrador)?
1. Para inscribir a un nuevo funcionario en el sistema, haga clic en **"+ Registrar Usuario"**, complete sus nombres, usuario, correo, asigne una contraseña inicial y seleccione su **Rol** en el menú desplegable del modal (`RegisterUserModal.vue`), luego presione **"Registrar"**.
2. Para cambiar los permisos (por ejemplo, promover a alguien de `Editor` a `Admin`), haga clic en **"Editar"** en la fila del funcionario, seleccione el nuevo rol en el modal y guarde.
3. Si el usuario cuenta con muchos registros, utilice los botones de **Anterior / Siguiente** en la barra de paginación inferior para buscar al miembro deseado.

> ### 🖼️ Guía para Captura de Pantalla: Gestión y Listado de Usuarios
> * **`[ESPACIO PARA CAPTURA DE PANTALLA: TABLA DE USUARIOS CON ETIQUETAS DE ROLES Y PAGINACIÓN]`**
> * **Indicadores y flechas a señalar en la imagen:**
>   * ➡️ **Flecha 1 (Botón "+ Registrar Usuario"):** Apuntar al botón superior de creación de cuentas.
>   * ➡️ **Flecha 2 (Etiquetas de Roles en la tabla):** Resaltar la columna donde se aprecian los distintivos `[Admin]`, `[Editor]`.
>   * ➡️ **Flecha 3 (Botón Editar / Cambiar Rol):** Resaltar la acción en la fila de un usuario.
>   * ➡️ **Flecha 4 (Barra de Paginación Inferior):** Resaltar los controles numéricos de páginas al final de la tabla.

---

## 9. Vista de Edición de Perfil de Usuario

### 📌 Propósito del Módulo
La pantalla `EditUser.vue` se ejecuta cuando un usuario necesita actualizar sus propios datos personales desde el menú de usuario, o cuando un administrador abre el perfil extendido de otra cuenta.

### 👁️ ¿Qué Muestra la Interfaz?
* **Formulario de Perfil Completo:**
  * Campos editables para **Nombre** y **Apellido**.
  * Campo para **Nombre de Usuario (`username`)**.
  * Campo para **Correo Electrónico Oficial**.
  * **Selector de Rol (`Role`):** *(Solo modificable si la cuenta que navega tiene permisos administrativos)*.
* **Botón de Envío:** Botón azul **"Guardar Cambios" / "Actualizar Usuario"**.

### 🛠️ ¿Qué Debe Hacer el Usuario?
1. Verifique en las cajas de texto la información precargada de su cuenta.
2. Corrija los campos que requieran actualización (por ejemplo, cambio de correo electrónico institucional).
3. Haga clic en **"Guardar Cambios"**. Un mensaje confirmará la actualización en la base de datos.

> ### 🖼️ Guía para Captura de Pantalla: Edición de Perfil
> * **`[ESPACIO PARA CAPTURA DE PANTALLA: FORMULARIO DE EDICIÓN DE PERFIL DE USUARIO]`**
> * **Indicadores y flechas a señalar en la imagen:**
>   * ➡️ **Flecha 1 (Campos de Datos Personales y Correo):** Apuntar a las casillas editables del formulario.
>   * ➡️ **Flecha 2 (Selector de Rol - si aplica):** Resaltar el menú de asignación de rol.
>   * ➡️ **Flecha 3 (Botón "Guardar Cambios"):** Apuntar al botón de confirmación en la parte inferior del formulario.

---

## 10. Módulo de Auditoría y Trazabilidad (Logs)

### 📌 Propósito del Módulo
El panel de auditoría (`Audit.vue`) es un módulo de alta seguridad reservado para la alta administración (`Admin`). Permite auditar qué operaciones se realizan en la plataforma garantizando transparencia, rendición de cuentas e inmutabilidad histórica.

### 👁️ ¿Qué Muestra la Interfaz?
* **Pestañas o Botones de Sección Superior:** Alternancia entre dos vistas especializadas de registro:
  1. 📄 **Auditoría de Reportes (`TableAuditReports`):** Muestra el historial cronológico de qué archivos de actas académicas fueron cargados, el código de periodo involucrado, fecha exacta y el usuario de la UNET que realizó la importación.
  2. 👥 **Auditoría de Usuarios (`TableAuditUsers`):** Muestra los logs de actividad administrativa: registros de inicios de sesión, altas de cuentas, modificaciones en roles o eliminación de cuentas.
* **Tabla de Logs Detallada:** Columnas con fecha, hora exacta (timestamp), nombre del operador responsable, tipo de acción ejecutada y detalle técnico del evento.
* **Controles de Paginación de Logs:** Para explorar páginas del historial de transacciones.

### 🛠️ ¿Qué Debe Hacer el Usuario (Auditor/Administrador)?
1. Haga clic en la pestaña superior de **"Actividad en Reportes"** o **"Actividad en Usuarios"** según el tipo de auditoría que esté realizando.
2. Examine las filas ordenadas cronológicamente para detectar cambios recientes.
3. Si está buscando un evento anterior, utilice la paginación inferior para avanzar a las páginas de registros pasados.

> ### 🖼️ Guía para Captura de Pantalla: Panel de Auditoría y Logs
> * **`[ESPACIO PARA CAPTURA DE PANTALLA: PANTALLA DE AUDITORÍA CON PESTAÑAS Y TABLA DE LOGS]`**
> * **Indicadores y flechas a señalar en la imagen:**
>   * ➡️ **Flecha 1 (Selector de Pestañas Reportes / Usuarios):** Resaltar los botones superiores para alternar entre tipos de logs.
>   * ➡️ **Flecha 2 (Columna de Fecha/Hora y Usuario Responsable):** Encerrar las columnas que identifican quién y cuándo hizo la acción.
>   * ➡️ **Flecha 3 (Columna Detalle de Acción):** Apuntar a la descripción del evento auditable registrado.
>   * ➡️ **Flecha 4 (Paginación de Auditoría):** Apuntar a la barra de avance de páginas de logs en el pie de página.

---

## ✅ Recomendaciones Finales para Preparar las Imágenes de su Documento

Al momento de tomar las capturas de pantalla de la aplicación para adjuntarlas en su documento final utilizando este archivo `guia.md` como base, le sugerimos seguir estos pasos:

1. **Resolución Limpia:** Maximice la ventana del navegador (preferiblemente a 1080p o superior) para que las tablas, botones y textos se aprecien nítidos y sin recortes.
2. **Uso de Flechas y Recuadros:** Utilice una herramienta de anotación (como *Recortes de Windows*, *ShareX*, *Snagit* o *Canva*) para colocar flechas rojas, amarillas o azules contrastantes y recuadros alrededor de los botones mencionados en cada sección.
3. **Numeración Coherente:** Puede numerar cada flecha en la captura (`[1]`, `[2]`, `[3]`) coincidiendo exactamente con la numeración descrita en el apartado **"Indicadores y flechas a señalar en la imagen"** que hemos proporcionado en los recuadros de cada módulo.

---

## 👥 Autores y Créditos del Proyecto (Servicio Comunitario)

Este manual y la plataforma informática son resultado formal de la ejecución del **Proyecto de Servicio Comunitario** llevado a cabo por estudiantes de la carrera de **Ingeniería en Informática** de la **Universidad Nacional Experimental del Táchira (UNET)** en apoyo institucional y beneficio de la **Universidad Nacional Abierta (UNA)**.

| Rol en el Proyecto | Nombre Completo | Carrera / Especialidad | Correo Institucional |
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

