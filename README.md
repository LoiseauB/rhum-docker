# Instructions pour lancer l'application

Pour lancer l'application, suivez ces étapes :

1. **Configurer les fichiers d'environnement :**
   - Copiez les fichiers `.example` pour créer les fichiers `.env` correspondants.
   - Assurez-vous de remplir toutes les variables nécessaires dans ces fichiers `.env`.

2. **Lancer les conteneurs Docker :**
   - Exécutez la commande suivante pour construire et lancer les conteneurs en arrière-plan :
     ```bash
     docker compose up -d --build
     ```

3. **Accéder aux informations de connexion par défaut :**
   - Les identifiants de connexion par défaut pour la démonstration se trouvent dans le fichier `./rhum-back/src/fixtures/data/usersData.ts`.

4. **Accéder à l'application :**
   - Une fois les conteneurs lancés, ouvrez votre navigateur et rendez-vous sur [http://localhost](http://localhost).

   

# Déploiement avec Jenkins

Pour déployer l'application sur une instance EC2 en utilisant Jenkins, suivez ces étapes :

1. **Préparer le fichier `docker-compose.yaml` :**
   - Décommentez les lignes `env_file` dans le fichier `docker-compose.yaml` pour vous assurer que les fichiers d'environnement nécessaires sont pris en compte.

2. **Configurer Jenkins :**
   - **Configurer les identifiants Docker Hub :** Ajoutez vos identifiants Docker Hub dans Jenkins pour permettre la publication des images Docker.
   - **Configurer la clé SSH pour EC2 :** Ajoutez votre clé SSH dans Jenkins pour permettre les connexions à votre instance EC2.

3. **Configurer le `Jenkinsfile` :**
   - Le `Jenkinsfile` définit le pipeline qui automatise le déploiement sur EC2. Assurez-vous qu'il est correctement configuré pour construire les images Docker, les publier sur Docker Hub, et déployer l'application sur votre instance EC2.

4. **Configurer le Webhook GitHub :**
   - Pour automatiser le pipeline, configurez un webhook dans votre dépôt GitHub qui déclenchera le pipeline Jenkins à chaque `push` sur la branche `main`.

5. **Processus de déploiement :**
   - Lors d'un `push` sur la branche `main`, le pipeline Jenkins :
     - Construit les images Docker.
     - Publie les images sur Docker Hub.
     - Copie le fichier `docker-compose.yaml` et les fichiers d'environnement sur l'instance EC2 via SSH.
     - Exécute `docker compose up -d` sur l'instance EC2 via SSH pour lancer les conteneurs.

6. **Remarque sur les performances de l'instance EC2 :**
   - Le pipeline fonctionne correctement, mais l'instance EC2 gratuite n'était pas suffisamment puissante pour l'application. Après le déploiement, le serveur rencontrait des problèmes de performance, rendant impossible la connexion via SSH, même après un redémarrage.
