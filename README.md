<div align="center">
  <h1>
    <br>
    <a href=""><img src="server.jpg" alt="Favicon" width="200"></a>
    <br>
    Formulaire d'authentification basique
    <br>
  </h1>
</div>

<div align="center">
  <a href="#a-propos">A propos</a> •
  <a href="#installation">Installation</a> 
</div>

# A propos

Ce repository est composé d'un serveur et d'un client.
Le but de ce code est de créer un formulaire d'authentification simple avec un peu de sécurité

## Technologie utilisé

##### Client

Rien

##### Server

Environnement : NodeJS
Package : 
  - expressJS
  - cors
  - helmet
  - express-rate-limit
  - bcrypt

## Installation

Depuis votre terminal de commande : 

```bash
# Cloner le repertoire
$ git clone https://github.com/Andy-d-g/Form-Authentification.git

# Aller dans le repertoire
$ cd Form-Authentification

# Installer les packages (server) [ / ]
$ cd Server
$ npm i

# Lancer le server en hotload [ /Server ]
$ npm run start

# Ouvrir la page web [ /Client ]
$ open index.html (macOS)

```
## Contributeurs

@Andy-d-g
