Bienvenidos a FakeStore App

A continuación, les daré unas indicaciones para poder correr el store en su entorno local

Requisitos:

Docker


La aplicacion esta completamente dockerizada, por lo cual es necesario contar con Docker.

Lo primero que hay que hacer es abrir la terminal y utilizar el siguiente comando

```docker compose up --build```

Esto hara que se levante la base de datos Postgresql, el backend NestJS y el frontend NextJS

El mismo backend seedea la base de datos con los datos obtenidos de FakeStoreApi.

En el caso que llegue a fallar el seed, hay un endpoint que se puede utilizar.

Backend:

## Resumen de Rutas

| Método HTTP | Ruta                  | Descripción                          |
|-------------|-----------------------|--------------------------------------|
| `GET`      | `/products`           | Obtener todos los productos          |
| `POST`     | `/products/seed`      | Inicializar la base de datos         |
| `GET`      | `/products/:id`       | Obtener un producto por ID           |
| `POST`     | `/products`           | Crear un nuevo producto              |
| `PUT`      | `/products/:id/stock` | Actualizar el stock de un producto   |
| `DELETE`   | `/products/:id`       | Eliminar un producto por ID          |

En la carpeta del mismo se encuentra un file llamado `openapi.yaml` que puede ser utilizado en [Swagger](https://editor.swagger.io/) donde cuenta con una descripcion mas detallada de cada endpoint