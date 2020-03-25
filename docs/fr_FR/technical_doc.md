# Documentation technique

Cette documentation présente le fonctionnement de l'application décentralisée (DApp) `MonkeyVotingDapp`.

- [Stack technique](#stack-technique)
- [Architecture technique](#architecture-technique)
  - [Environnement de developpement](#environnement-de-developpement)
  - [Environnement de test](#environnement-de-test)
- [Architecture logicielle](#architecture-logicielle)

## Stack technique

La stack technique diverge suivant l'environnement d'exécution. Ainsi, pour chaque composant nous distinguerons l'environnement par ces badges:

- ![badge_dev](https://img.shields.io/badge/env-dev-lightgrey?style=flat) environnement de développement
- ![badge_test](https://img.shields.io/badge/env-test-9cf?style=flat) déploiement sur un réseau de test
- ![badge_prod](https://img.shields.io/badge/env-prod-blue?style=flat) déploiement sur un réseau de production

### Truffle

<img align="right" height="50" src="https://camo.githubusercontent.com/7240582453539ece449f39250a2b063427c83375/68747470733a2f2f74727566666c656672616d65776f726b2e636f6d2f696d672f74727566666c652d6c6f676f2d6461726b2e737667">

![badge_dev](https://img.shields.io/badge/env-dev-lightgrey?style=flat) ![badge_test](https://img.shields.io/badge/env-test-9cf?style=flat) ![badge_prod](https://img.shields.io/badge/env-prod-blue?style=flat)

Ce composant permet le déploiement des contrats solidity sur la blockchain. Pour ce faire, son utilisation conduit à la génération d'une Application Binary Interface (ABI). Cette dernière apporte une façon:

- d'encoder les appels de contrats solidity pour l'Ethereum Virtual Machien (EVM)
- de lire la données issue des transactions

Pour ce faire, cette interface permet l'interaction entre les composants au travers d'un fichier JSON qui contient:

- une représentation des contrats
- les informations sur le réseau utilisé

Ce fichier JSON est généré dans `src/app/contracts`.

Cet élément est primordial car il nous permet, avec l'aide de web3.js, d'aider à la résolution de l'addresse du contrat dans la blockchain actuelle. En effet, puisque plusieurs réseau de déploiement sont possibles, il faut pouvoir avoir un moyen de récupérer facilement cette information.

Dans ce projet, la fonction `initElectionContract()` du *contract service* est en charge de ce déploiement.

### Ganache

<img align="right" height="50" src="https://www.trufflesuite.com/img/ganache-logo-dark.svg">

![badge_dev](https://img.shields.io/badge/env-dev-lightgrey?style=flat)

Ganache offre une blockchain Ethereum personnelle. Il permet ainsi d'avoir un environnement de développement plus souple. Il est possible d'importer le workspace Truffle pour tester notre application sans avoir à la publier sur un vrai réseau décentralisé.

Ce composant apporte également la possibilité de visualiser l'état sur smart contract et l'état des différentes variables au travers d'une interface graphique.

### Geth

<img align="right" height="50" src="https://geth.ethereum.org/static/images/mascot.png">

![badge_test](https://img.shields.io/badge/env-test-9cf?style=flat) ![badge_prod](https://img.shields.io/badge/env-prod-blue?style=flat)

Go Ethereum (Geth) est une implémentation du protocol Ethereum. Il est ainsi possible d'être un noeud dans le réseau Ethereum.

Ce composant est utilisé afin de publier les *smart contracts* sur le réseau Goerli test net.

Utilisé dans le cadre d'un déploiement vers un réseau de test, Geth offre également la possibilité de publier le blockchain sur un réseau principal.

### Swarm

<img align="right" height="50" src="https://d1mjtvp3d1g20r.cloudfront.net/2020/01/10110746/swarm-eth-1004x1024.jpg">

![badge_test](https://img.shields.io/badge/env-test-9cf?style=flat) ![badge_prod](https://img.shields.io/badge/env-prod-blue?style=flat)

Swarm est une plateforme de stockage distribuée. Ce composant est utilisé afin de stocker la webapp sur la blockchain Ethereum.

### web3.js
<img align="right" height="50" src="https://github.com/ethereum/web3.js/raw/1.x/web3js.jpg">

![badge_dev](https://img.shields.io/badge/env-dev-lightgrey?style=flat) ![badge_test](https://img.shields.io/badge/env-test-9cf?style=flat) ![badge_prod](https://img.shields.io/badge/env-prod-blue?style=flat)

Cette collection de librairies Javascript permet l'interaction avec le contrat.

Elle requiert l'ABI du contrat généré avec Truffle. De plus, l'addresse du contrat récupéré avec Truffle doit lui être fournie.

Ce composant permet d'exposer toutes les méthodes du contrat solidity.

web3.js assure également la gestion des autorisation pour les transactions avec MetaMask. Entre autre, l'envoi de requête et le calcul du coût du gas est géré par cette librarie.

### MetaMask

<img align="right" height="50" src="https://insidebitcoins.com/wp-content/uploads/2019/06/metamask.png">

![badge_dev](https://img.shields.io/badge/env-dev-lightgrey?style=flat)

MetaMask est un wallet Ethereum. Dans ce projet, il est utilisé en développement afin d'accéder à la Daap au travers de plusieurs identitées. Ce composant permet de tester le vote avec des comptes différents.

### Solidity

<img align="right" height="50" src="https://solidity.readthedocs.io/en/v0.6.4/_images/logo.svg">

![badge_dev](https://img.shields.io/badge/env-dev-lightgrey?style=flat) ![badge_test](https://img.shields.io/badge/env-test-9cf?style=flat) ![badge_prod](https://img.shields.io/badge/env-prod-blue?style=flat)

Le langage Solidity est utilisé afin de créér le *smart contract*.

### Angular

<img align="right" height="50" src="https://angular.io/assets/images/logos/angular/angular.png">

![badge_dev](https://img.shields.io/badge/env-dev-lightgrey?style=flat) ![badge_test](https://img.shields.io/badge/env-test-9cf?style=flat) ![badge_prod](https://img.shields.io/badge/env-prod-blue?style=flat)

Angular est utilisé pour créér la webapp. Son adhérence au TypeScript permet de bénéficier de toutes les qualités liées à ce langage. C'est une excellente solution pour réaliser du frontend.

## Architecture technique

### Environnement de developpement

[![](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVERcblxuICB0cnVmZmxlW1RydWZmbGVdXG4gIGdhbmFjaGVbR2FuYWNoZSBtb2NrZWQgYmxvY2tjaGFpbl1cbiAgd2ViM1t3ZWIzLmpzIGxpYnJhaXJpZV1cbiAgbWV0YW1hc2tbTWV0YU1hc2tdXG4gIHNvbGlkaXR5W1NvbGlkaXR5IHNtYXJ0IGNvbnRyYWN0XVxuICBhbmd1bGFyW0FuZ3VsYXIgZnJvbnRlbmRdXG5cblx0c3ViZ3JhcGggRGV2IGVudmlyb25tZW50XG5cdHRydWZmbGVcblxuXHRzdWJncmFwaCBXZWJhcHBcblx0XHRhbmd1bGFyXG5cdFx0d2ViM1xuXHRlbmRcblxuXHRzdWJncmFwaCBFdGhlcmV1bSBlbnZpcm9ubWVudFxuXHRcdGdhbmFjaGVcblx0XHRtZXRhbWFza1xuXHRcdHNvbGlkaXR5XG5cdGVuZFxuXG5cdGFuZ3VsYXIgLS0gR2V0IHNtYXJ0IGNvbnRyYWN0IGRhdGEgZnJvbSAtLT4gd2ViM1xuXHR3ZWIzIC0tIHB1bGwgZGF0YSBmcm9tIC0tPiBnYW5hY2hlXG5cdGFuZ3VsYXIgLS4tICBtZXRhbWFza1xuXHR0cnVmZmxlIC0tIDEtIHB1Ymxpc2guLiAtLT4gc29saWRpdHlcblx0c29saWRpdHkgLS0gMi0gLi5vbiAtLT4gZ2FuYWNoZVxuXHRtZXRhbWFzayAtLSBtYWtlIHRyYW5zYWN0aW9uIG9uIC0tPiBnYW5hY2hlXG5lbmQiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVERcblxuICB0cnVmZmxlW1RydWZmbGVdXG4gIGdhbmFjaGVbR2FuYWNoZSBtb2NrZWQgYmxvY2tjaGFpbl1cbiAgd2ViM1t3ZWIzLmpzIGxpYnJhaXJpZV1cbiAgbWV0YW1hc2tbTWV0YU1hc2tdXG4gIHNvbGlkaXR5W1NvbGlkaXR5IHNtYXJ0IGNvbnRyYWN0XVxuICBhbmd1bGFyW0FuZ3VsYXIgZnJvbnRlbmRdXG5cblx0c3ViZ3JhcGggRGV2IGVudmlyb25tZW50XG5cdHRydWZmbGVcblxuXHRzdWJncmFwaCBXZWJhcHBcblx0XHRhbmd1bGFyXG5cdFx0d2ViM1xuXHRlbmRcblxuXHRzdWJncmFwaCBFdGhlcmV1bSBlbnZpcm9ubWVudFxuXHRcdGdhbmFjaGVcblx0XHRtZXRhbWFza1xuXHRcdHNvbGlkaXR5XG5cdGVuZFxuXG5cdGFuZ3VsYXIgLS0gR2V0IHNtYXJ0IGNvbnRyYWN0IGRhdGEgZnJvbSAtLT4gd2ViM1xuXHR3ZWIzIC0tIHB1bGwgZGF0YSBmcm9tIC0tPiBnYW5hY2hlXG5cdGFuZ3VsYXIgLS4tICBtZXRhbWFza1xuXHR0cnVmZmxlIC0tIDEtIHB1Ymxpc2guLiAtLT4gc29saWRpdHlcblx0c29saWRpdHkgLS0gMi0gLi5vbiAtLT4gZ2FuYWNoZVxuXHRtZXRhbWFzayAtLSBtYWtlIHRyYW5zYWN0aW9uIG9uIC0tPiBnYW5hY2hlXG5lbmQiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ)

### Environnement de test

[![](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVERcbiAgdHJ1ZmZsZVtUcnVmZmxlXVxuICB3ZWIzW3dlYjMuanMgbGlicmFpcmllXVxuICBhbmd1bGFyW0FuZ3VsYXIgZnJvbnRlbmRdXG4gIHNvbGlkaXR5W1NvbGlkaXR5IHNtYXJ0IGNvbnRyYWN0XVxuICBibG9ja2NoYWluW0dvZXJsaSBibG9ja2NoYWluXVxuXG4gIHN1YmdyYXBoIERldiBlbnZpcm9ubWVudFxuICAgIHRydWZmbGVcbiAgZW5kXG5cbiAgc3ViZ3JhcGggRXRoZXJldW0gdGVzdCBlbnZpcm9ubWVudFxuICAgIHN1YmdyYXBoIFdlYmFwcCBob3N0ZWQgaW4gc3dhcm1cbiAgICAgIGFuZ3VsYXJcbiAgICAgIHdlYjNcbiAgICBlbmRcblxuICAgIHN1YmdyYXBoIEdldGggZ29lcmxpXG4gICAgICBzb2xpZGl0eVxuICAgICAgYmxvY2tjaGFpblxuICAgIGVuZFxuXG4gIGVuZFxuXG4gIGFuZ3VsYXIgLS0gR2V0IHNtYXJ0IGNvbnRyYWN0IGRhdGEgZnJvbSAtLT4gd2ViM1xuICB3ZWIzIC0tIHB1bGwgZGF0YSBmcm9tIC0tPiBibG9ja2NoYWluXG4gIHRydWZmbGUgLS0gMS0gcHVibGlzaC4uIC0tPiBzb2xpZGl0eVxuICBzb2xpZGl0eSAtLSAyLSAuLm9uIC0tPiBibG9ja2NoYWluXG4gIHRydWZmbGUgLS0gMS0gcHVibGlzaC4uIC0tPiBhbmd1bGFyIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVERcbiAgdHJ1ZmZsZVtUcnVmZmxlXVxuICB3ZWIzW3dlYjMuanMgbGlicmFpcmllXVxuICBhbmd1bGFyW0FuZ3VsYXIgZnJvbnRlbmRdXG4gIHNvbGlkaXR5W1NvbGlkaXR5IHNtYXJ0IGNvbnRyYWN0XVxuICBibG9ja2NoYWluW0dvZXJsaSBibG9ja2NoYWluXVxuXG4gIHN1YmdyYXBoIERldiBlbnZpcm9ubWVudFxuICAgIHRydWZmbGVcbiAgZW5kXG5cbiAgc3ViZ3JhcGggRXRoZXJldW0gdGVzdCBlbnZpcm9ubWVudFxuICAgIHN1YmdyYXBoIFdlYmFwcCBob3N0ZWQgaW4gc3dhcm1cbiAgICAgIGFuZ3VsYXJcbiAgICAgIHdlYjNcbiAgICBlbmRcblxuICAgIHN1YmdyYXBoIEdldGggZ29lcmxpXG4gICAgICBzb2xpZGl0eVxuICAgICAgYmxvY2tjaGFpblxuICAgIGVuZFxuXG4gIGVuZFxuXG4gIGFuZ3VsYXIgLS0gR2V0IHNtYXJ0IGNvbnRyYWN0IGRhdGEgZnJvbSAtLT4gd2ViM1xuICB3ZWIzIC0tIHB1bGwgZGF0YSBmcm9tIC0tPiBibG9ja2NoYWluXG4gIHRydWZmbGUgLS0gMS0gcHVibGlzaC4uIC0tPiBzb2xpZGl0eVxuICBzb2xpZGl0eSAtLSAyLSAuLm9uIC0tPiBibG9ja2NoYWluXG4gIHRydWZmbGUgLS0gMS0gcHVibGlzaC4uIC0tPiBhbmd1bGFyIiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)

## Architecture logicielle

La webapp a été découpée en services. On en trouve 2:

- `web3.service.ts`
  - Gère la recherche du fournisseur *web3*
- `contract.service.ts`
  - Gère l'ensemble des interactions avec le *smart contract*
    - initilisation du contrat
    - gestion de toutes les interactions avec l'application
