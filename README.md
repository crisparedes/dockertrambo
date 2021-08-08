# Proyecto final del módulo de Docker del curso DevToDevOps

Contenedores utilizados

* **NodeJS:** aplicación web
* **MySql:** base de datos SQL
* **Redis:** base de datos en caché

Instrucciones para levantar el ambiente

* Acceder por medio de la terminal a la carpeta secrets y ejecutar el comando "./secrets.sh" para darle permisos a los archivos que se utilizaran para guardar los secretos

* Habilitar las variables que permiten utilizar los secretos de docker con los siguientes comandos en la terminal:

    * export DOCKER_BUILDKIT=1
    * export COMPOSE_DOCKER_CLI_BUILD=1

* Correr el comando "docker-compose up" en la raíz del proyecto, si todo está correcto se podrá vizualizar la web en la dirección http://localhost:3000/

    * **NOTA:** el proceso de creación de los contenedores puede tardar unos minutos la primera vez ya que hay que esperar a que el contenedor de MySQL esté listo para que el contenedor de NodeJS pueda levantar la aplicación web