<p align="center">
  <img src="./mobile/src/assets/logo@2x.png">
</p>

## **Recycle App: A way to register waste points to help people to locate the places of them!**

<p align="center">
  <a href="#problem">Problem</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#solution">Solution</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#demonstration">Demonstration</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#requirements">Requirements</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#download">Download</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#install">Install</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#contribute">Contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">License</a>
</p>

<p align="center">
  <img alt="GitHub issues" src="https://img.shields.io/github/issues/rorsgo/RecycleApp">
  <img alt="GitHub forks" src="https://img.shields.io/github/forks/rorsgo/RecycleApp">
  <img alt="GitHub All Releases" src="https://img.shields.io/github/downloads/rorsgo/RecycleApp/total">
  <img alt="GitHub" src="https://img.shields.io/github/license/rorsgo/RecycleApp">
</p>

### **Problem**

Some places have selective collection for recyclable waste, but others do not have this service. Sometimes to locate a specific point of recyclable waste requires efforts. Ideally, this information should be public and easily accessible, but it is not the case yet.

### **Solution**

Recycle App is an open source software that allows users to register and view collection points for recyclable waste according to specific type of waste. With a friendly and intuitive interface, the software aims to help people to locate waste collection points by building a community that will help increasingly feed this information base.

### **Demonstration**
#### WEB
<p align="center">
<img alt="web" src="https://user-images.githubusercontent.com/13532333/86469361-875c9a80-bd39-11ea-840d-4496409e22cc.gif">
</p>

<br/>

#### MOBILE
<p align="center">
<img alt="web" src="https://user-images.githubusercontent.com/13532333/86469487-c985dc00-bd39-11ea-95a3-fc743f3a4b14.gif">
</p>

<br/>

### **Requirements**

- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org)
- [React Native](https://facebook.github.io/react-native/)
- [Expo](https://expo.io/)
- [HERE API Connection](https://developer.here.com/) (Freemium version)

### **Download**

```
git clone https://github.com/rorsgo/RecycleApp.git
```

### **Install**
***Make sure that you are on the folders***

#### Backend (backend)
##### Using npm
##### * Download dependences
```
npm install
```
##### * Doing the migrations
```
npm run knex.migrate
npm run knex.seed
```
##### * Executing the project
```
npm run backend
```
##### Using yarn
##### * Download dependences
```
yarn install
```
##### * Doing the migrations
```
yarn knex.migrate
yarn knex.seed
```
##### * Executing the project
```
yarn backend
```

#### Frontend (web)
##### Using npm
##### * Download dependences
```
npm install
```
##### * Executing the project
```
npm start
```
##### Using yarn
##### * Download dependences
```
yarn install
```
##### * Executing the project
```
yarn start
```
#### Mobile (mobile)
##### Using npm
##### * Download dependences
```
npm install
```
##### * Executing the project
```
npm start
```
##### Using yarn
##### * Download dependences
```
yarn install
```
##### * Executing the project
```
yarn start
```

## **Contribute**

- Fork this repository;
- Make a branch with your feature: `git checkout -b my-feature`;
- Commit the changes: `git commit -m 'feat: My new feature'`;
- Push to your branch: `git push origin my-feature`;
- Open a pull request [Pull Request](https://help.github.com/en/enterprise/2.16/user/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork).


## **Credits**

- Author: Rodrigo Santos [@rorsgo](https://www.linkedin.com/in/rorsgo/)
- Based on: [Ecoleta](https://github.com/Rocketseat/nlw-01-booster)

## **License**
This repository is under **MIT LICENSE**. For more information, read the [LICENSE](./LICENSE) file.
