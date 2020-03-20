# Documentation utilisateur

Cette documentation décrit la procédure pour utiliser ce projet dans un environnement de développement.

## Pérequis

- [Node.js](https://nodejs.org/en/)
- [Truffle](https://www.trufflesuite.com/truffle)
- [Ganache](https://www.trufflesuite.com/ganache)

## Installation

Les composants sont à installer dans l'ordre.

### Node.js

Merci de se reporter à cette [documentation](https://nodejs.org/en/download/package-manager/). L'installation de la version v13.X est recommandé, mais le projet reste compatible avec toute version supérieur ou égale à la v10.X.

### Truffle

Ouvrez un terminal et executer la commande suivante:

```console
npm install -g truffle
```

En cas de problème avec la commande précédente sur Windows, se référer à cette [documentation](https://www.trufflesuite.com/docs/truffle/reference/configuration#resolving-naming-conflicts-on-windowsn).

### Ganache

Se référer à la [documentation officielle](https://www.trufflesuite.com/docs/ganache/quickstart).

## Déploiement

1. Lancer Ganache
2. Cliquer sur le bouton **New workspace**
3. Dans l'onglet *Workspace*, indiquer:
   - dans le champ **Workspace name**: `monkey-voting`
   - dans le champ **Truffle projects**: le chemin complet vers le fichier `truffle-config.js`.
4. Ouvrir un terminal à la racine du projet et taper la commande `truffle migrate`
5. Si la commande précédente ne conduit pas à un déploiement en succès, forcer le déploiement avec la commande `truffle migrate --reset --compile-all --skip-dry-run`

<!---5. Use the host, port & network id of ganache in the truffle-config.js at the root of project--->

## Utilisation

1. Lancer Ganache dans le workspace `monkey-voting`
2. À la racine du projet, ouvrir un terminal et taper la commande `ng serve`
3. Dans un navigateur, se rendre à l'addresse [http://localhost:XXXX](http://localhost:XXXX)
