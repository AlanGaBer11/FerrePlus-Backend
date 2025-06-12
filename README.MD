# FerrePlus

Este proyecto es una API RESTful construida con **Node.js** y **Express**, con una base de datos **PostgreSQL**. A continuación se describe la estructura del proyecto y su funcionamiento.

# Estructura del Proyecto

- **`/config`**: Aquí se encuentra la configuración general del proyecto, como la conexión a la base de datos.

- **`/models`**: Este directorio contiene los modelos de datos, que definen los esquemas para la base de datos.

- **`/services`**: En este directorio se encuentra la lógica de negocio que interactúa con los modelos. Los servicios contienen las funciones que realizan operaciones sobre los datos, como consultas, inserciones o actualizaciones.

- **`/controller`**: Este directorio contiene los controladores que gestionan la lógica de cada ruta. Los controladores reciben las solicitudes, interactúan con los servicios y devuelven las respuestas adecuadas.

- **`/routes`**: En este directorio se encuentran los archivos que definen las rutas o endpoints de la API. Cada archivo de ruta está vinculado a un controlador o conjunto de funcionalidades específicas.

- **`/middlewares`**: En este directorio se encuentran los middlewares personalizados que se pueden usar para validar o autenticar las solicitudes antes de que lleguen a los controladores.

- **`/validators`**: En este directorio se encuentran los validators personalizados que se utilizan para validar los datos de entrada de las solicitudes HTTP. Estos validators definen las reglas de validación para los campos de formularios, parámetros de consulta y datos del cuerpo de las peticiones, asegurando que cumplan con los formatos, tipos y restricciones requeridas antes de ser procesados por los controladores.

- **`server.js`**: Este es el archivo principal donde se inicializa el servidor de Express y se configuran las rutas y la conexión a la base de datos.

## Dependecias

En la terminal de este proyecto hacer `npm install` para instalar las dependencias del proyecto para así obtener su funcionamiento.

- `npm express` - Framework web para Node.js (GET, POST, DELETE, PUT, PATCH)
- `npm cors` - Permite solicitudes desde distintos dispositivos
- `npm nodemon -D` - Recarga automáticamente el servidor en desarrollo
- `npm pg` - Para hacer la conexión a la base de datos
- `npm body-parser` - Convierte datos a JSON
- `npm dotenv --save` - Manejo de variables de entorno
- `npm bcryptjs` - Encriptación de contraseñas
- `npm crypto-js` - Cifrado de datos sensibles
- `npm jsonwebtoken` - Generación de tokens JWT
- `npm express-validator` - Validaciones de datos
- `npm express-rate-limit` - Limita el número de peticiones a la API
- `npm helmet` - Protege la APP de vulnerabilidades de XSS
- `npm standard --save-dev` - Asegura la consistncia y calidad del código
- `npm nodemailer` - Enviar correos electrónicos

# Endpoints

## Users

| Método | Endpoint                   | Descripción                |
| ------ | -------------------------- | -------------------------- |
| GET    | `/api/user/getUsers`       | Obtiene todos los usuarios |
| GET    | `/api/user/getUser/:id`    | Obtiene un usuario por ID  |
| POST   | `/api/user/register`       | Registra un nuevo usuario  |
| POST   | `/api/user/login`          | Logea un usuario           |
| PATCH  | `/api/user/updateUser/:id` | Actualiza un usuario       |
| DELETE | `/api/user/deleteUser/:id` | Elimina un usuario         |

## Suppliers

## Products

## Movements
