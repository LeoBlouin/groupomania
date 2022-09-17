Pour installer le projet en local, il faut suivre les étapes suivantes :
- Installer Docker.
- Cloner le dépôt.
- Lancer la commande `docker-compose up`.
- Rentrer dans le container du backend avec la commande `docker exec -it groupomania_backend sh`.
- Une fois dans le container, lancer la commande `node ace migration:fresh`.

Une fois cela fait, vous aurez accès au projet en local à l'adresse `http://localhost:3000`
