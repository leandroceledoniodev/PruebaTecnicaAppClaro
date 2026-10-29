# Library Web

Frontend en **Angular 18** + **TailwindCSS** que consume la [Library API](../library-api) (proxy .NET sobre [FakeRestAPI](https://fakerestapi.azurewebsites.net/index.html)) para gestionar libros y autores.

## Requisitos

- Node.js 18.19+ o 20+
- npm 9+
- La API .NET corriendo en `https://localhost:7080` (perfil `https` del backend)

## Instalación y ejecución

```bash
git clone <url-de-este-repo> library-web
cd library-web
npm install
npm start
```

La app queda en `http://localhost:4200`.

Si la API corre en otra URL o puerto, cambia `apiUrl` en:

- `src/environments/environment.development.ts` (usado por `npm start`)
- `src/environments/environment.ts` (usado por `npm run build`)

### Build de producción

```bash
npm run build
```

El resultado queda en `dist/library-web/browser`.

## Funcionalidades

**Libros** (`/books`)
- Listado con título, descripción, búsqueda y paginación
- Crear, editar y eliminar desde diálogos con validaciones
- Detalle (`/books/:id`) con la información del libro y sus autores relacionados

**Autores** (`/authors`)
- Listado con nombre y número de libros publicados
- Crear, editar y eliminar
- Enlace al libro asociado

## Estructura

```
src/app
├── app-routing.module.ts
├── app.module.ts
├── books/
│   ├── components/book-form/
│   ├── pages/book-list/
│   ├── pages/book-detail/
│   ├── models/
│   ├── services/books.service.ts
│   ├── books-routing.module.ts
│   └── books.module.ts
├── authors/
│   ├── components/author-form/
│   ├── pages/author-list/
│   ├── models/
│   ├── services/authors.service.ts
│   ├── authors-routing.module.ts
│   └── authors.module.ts
└── shared/
    ├── components/
    ├── interceptors/
    ├── models/
    ├── pipes/
    ├── services/
    └── utils/
```

### Decisiones

- **NgModules con lazy loading**: `BooksModule` y `AuthorsModule` se cargan solo al navegar a su ruta (se generan como chunks separados en el build). `SharedModule` agrupa lo reutilizable.
- **Servicios por feature**: `BooksService` y `AuthorsService` se proveen en su propio módulo, no en root, así quedan encapsulados en el chunk lazy.
- **Estado con signals**: listas, filtros, paginación y diálogos se manejan con `signal`/`computed`.
- **Respuesta envuelta**: la API devuelve `ApiResponse<T>` (`succeeded`, `message`, `data`, `errors`); el operador `unwrap()` extrae `data` para que los componentes trabajen con modelos limpios.
- **Errores centralizados**: un interceptor funcional muestra el mensaje adecuado (API caída, 404, 502, validaciones) y los componentes solo manejan su estado de carga.

## Nota sobre FakeRestAPI

FakeRestAPI responde correctamente a POST, PUT y DELETE pero **no persiste** los cambios. Por eso, después de cada operación la lista se actualiza localmente para reflejar el resultado. Al recargar la página se vuelve a ver la data original. En el caso de altas, la API externa devuelve el mismo objeto enviado (sin generar id), así que se asigna un id local consecutivo.
