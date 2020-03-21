# Documentation technique

## Stack technique

### Truffle

<img align="right" height="100" src="https://camo.githubusercontent.com/7240582453539ece449f39250a2b063427c83375/68747470733a2f2f74727566666c656672616d65776f726b2e636f6d2f696d672f74727566666c652d6c6f676f2d6461726b2e737667">

Ce composant permet le déploiement des contrats solidity sur la blockchain. Pour ce faire, son utilisation conduit à la génération d'une Application Binary Interface (ABI). Cette dernière apporte une façon:

- d'encoder les appels de contrats solidity pour l'Ethereum Virtual Machien (EVM)
- de lire la données issue des transactions

Pour ce faire, cette interface permet l'interaction entre les composants au travers d'un fichier JSON qui contient:

- une représentation des contrats
- les informations sur le réseau utilisé

Ce fichier JSON est généré dans `src/app/contracts`.

Cet élément est primordial car il nous permet, avec l'aide de web3.js, d'aider à la résolution de l'addresse du contrat dans la blockchain actuelle. En effet, puisque plusieurs réseau de déploiement sont possibles, il faut pouvoir avoir un moyen de récupérer facilement cette information.

Dans ce projet, la fonction `initElectionContract()` du *contract service* est en charge de ce déploiement.

### web3.js

<img align="right" height="100" src="https://github.com/ethereum/web3.js/raw/1.x/web3js.jpg">

Cette collection de librairies Javascript permet l'interaction avec le contrat.

Elle requiert l'ABI du contrat généré avec Truffle. De plus, l'addresse du contrat récupéré avec Truffle doit lui être fournie.

Ce composant permet d'exposer toutes les méthodes du contrat solidity.

web3.js assure également la gestion des autorisation pour les transactions avec MetaMask. Entre autre, l'envoi de requête et le calcul du coût du gas est géré par cette librarie.

### MetaMask

<img align="right" height="100" src="https://tokensinvaders.com/wp-content/uploads/2018/08/metamask-tutoriel.png">

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim nunc nec magna posuere accumsan. In blandit, erat in molestie facilisis, mauris dolor imperdiet elit, non iaculis turpis purus eget erat. Nulla rutrum felis ac ullamcorper eleifend. Nunc nec interdum libero. Nunc quis lacus odio. Aliquam pulvinar vitae risus et facilisis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce semper et felis vitae semper. Suspendisse ultrices, est sit amet viverra accumsan, nisl mauris pulvinar lectus, quis pulvinar lectus ante a mi. Donec non libero augue. Proin euismod tellus dui, suscipit euismod augue sollicitudin sit amet. Vivamus lorem ipsum, iaculis nec mauris eget, semper feugiat quam. Duis lobortis ante a nulla ornare accumsan.

### Angular

<img align="right" height="100" src="https://angular.io/assets/images/logos/angular/angular.png">

Angular est utilisé pour le front-end. Son adhérence au TypeScript permet de bénéficier de toutes les qualités liées à ce langage.

## Architecture logicielle

<!-- To Do
## Service used

 - web3.service.ts
	 - Find the web3 provider or default to localhost
 - contract.service.ts
	 - All the interaction with the smartContract
		 - Init contract
		 - And all the interaction with the app
-->