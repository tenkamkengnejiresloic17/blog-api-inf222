API backend pour gérer un blog simple.



\## Auteur

\- Nom : TENKAM KENGNE JIRES LOIC

\- MATRICULE: 24F2729

\- UE : INF222 - EC1



\## Technologies utilisées

\- Node.js avec Express

\- Base de données : fichier JSON

\- Documentation : Swagger UI



\## Installation



\### 1. Cloner le dépôt

git clone https://github.com/TON\_USERNAME/blog-api-inf222.git

cd blog-api-inf222



\### 2. Installer les dépendances

npm install



\### 3. Démarrer le serveur

node app.js



\### 4. Accéder à l'API

\- API : http://localhost:3000

\- Documentation Swagger : http://localhost:3000/api-docs



\## Endpoints



| Méthode | Endpoint | Description |

| GET | /api/articles | Récupérer tous les articles |

| POST | /api/articles | Créer un article |

| GET | /api/articles/:id | Lire un article par ID |

| PUT | /api/articles/:id | Modifier un article |

| DELETE | /api/articles/:id | Supprimer un article |

| GET | /api/articles/search?query=texte | Rechercher des articles |



\## Exemples d'utilisation



\### Créer un article (POST)

URL : http://localhost:3000/api/articles

Body :

{

&nbsp; "titre": "Introduction à Node.js",

&nbsp; "contenu": "Node.js est un environnement JavaScript côté serveur.",

&nbsp; "auteur": "TENKAM KENGNE JIRES LOIC",

&nbsp; "categorie": "Technologie",

&nbsp; "tags": \["javascript", "backend"]

}



Réponse (201) :

{

&nbsp; "message": "Article créé avec succès !",

&nbsp; "id": 1

}



\### Récupérer tous les articles (GET)

URL : http://localhost:3000/api/articles

Réponse (200) :

{

&nbsp; "articles": \[...]

}



\### Récupérer un article par ID (GET)

URL : http://localhost:3000/api/articles/1

Réponse (200) : l'article correspondant

Réponse (404) : article introuvable



\### Modifier un article (PUT)

URL : http://localhost:3000/api/articles/1

Body :

{

&nbsp; "titre": "Nouveau titre",

&nbsp; "contenu": "Nouveau contenu"

}



\### Supprimer un article (DELETE)

URL : http://localhost:3000/api/articles/1

Réponse (200) :

{

&nbsp; "message": "Article 1 supprimé avec succès."

}



\### Rechercher des articles (GET)

URL : http://localhost:3000/api/articles/search?query=Node

Réponse (200) : articles dont le titre ou contenu contient "Node"



\## Codes HTTP utilisés

\- 200 : Succès

\- 201 : Création réussie

\- 400 : Requête mal formée

\- 404 : Article introuvable

\- 500 : Erreur serveur



\## Structure du projet

blog-api/

├── src/

│   ├── models/

│   │   └── db.js

│   ├── routes/

│   │   └── articles.js

│   └── controllers/

│       └── articlesController.js

├── app.js

├── data.json

├── package.json

└── README.md

