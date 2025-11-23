# Evaluación: CRUD en SvelteKit con JSONPlaceholder

Este proyecto implementa una aplicación CRUD (Create, Read, Update, Delete) utilizando **SvelteKit** y la API ficticia de **JSONPlaceholder**, cumpliendo con los requerimientos de la evaluación.

## 📋 Características

- **Listar (Read):** Obtención de datos desde el servidor (`+page.server.js`) usando `fetch`.
- **Crear (Create):** Formulario con validación y `use:enhance` para actualizaciones optimistas.
- **Editar (Update):** Edición en línea (inline) sin redirigir a otra página.
- **Eliminar (Delete):** Eliminación de posts mediante Form Actions.
- **Validación:** Manejo de errores 400 y mensajes visuales si faltan campos.

## 🚀 Instalación y Ejecución

Sigue estos pasos para descargar y correr el proyecto localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/Sebastian1com/evaluacion-sveltekit-crud.git](https://github.com/Sebastian1com/evaluacion-sveltekit-crud.git)
   cd evaluacion-sveltekit-crud