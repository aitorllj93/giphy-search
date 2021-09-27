# Giphy Search

A GIPHY search client webapp

A running version of the application can be found [here](https://aitorllamas.com/giphy-search/demo). There's also [code documentation](https://aitorllamas.com/giphy-search/docs) made with [Compodoc](https://compodoc.app/). [Test coverage reports](https://aitorllamas.com/giphy-search/coverage) are provided as well.

## About this project

This project was created with the latest Angular version, and uses the [Giphy API](https://developers.giphy.com/docs/).

The application is built with [Nx](https://nrwl.io/) and uses [Angular CLI](https://cli.angular.io/), [Jest](https://jestjs.io/) and [Cypress](https://www.cypress.io/) under the hood.

It's configured with pre-commit hooks ([Husky](https://typicode.github.io/husky/#/)) to automatically run code formatting ([Prettier](https://prettier.io/)) and linting ([ESLint](https://eslint.org/)) so you don't need to worry about it.

The User Interface is built with [Bootstrap](https://getbootstrap.com/) customized based on the [GIPHY Brand Guidelines](https://support.giphy.com/hc/en-us/articles/360022283772-GIPHY-Brand-Guidelines). The application is responsive and works on mobile, tablet and desktop. The Tag Input is built with [ngx-chips](https://www.npmjs.com/package/ngx-chips) component.

The application state is stored with the [NGXS](https://www.ngxs.io/) library.

Unit tests use [ng-mocks](https://ng-mocks.sudo.eu/) and [Spectator](https://ngneat.github.io/spectator/).

## Development

Node.js and npm are required to install the application.

### Installation

```sh
git clone git@github.com:d3v0ps/giphy-search.git
cd giphy-search
npm install
npm run prepare
```

Update your environment variables with the following:

```sh
export GIPHY_API_KEY=<your-api-key>
```

### Run Development Server

```sh
npm start
```

### Run Unit Tests

```sh
npm test
```

### Run E2E Tests

```sh
npm run e2e
```
