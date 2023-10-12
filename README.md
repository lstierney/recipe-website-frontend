# Recipe Website Frontend

This is a React website written in, mostly TypeScript. It is used as the frontend for a Recipe website and expects a suitable backend to be in place. [See here for backend](https://github.com/lstierney/recipe-website-backend)

## Status
|                |   |
|----------------|---|
| Build Status   |![example workflow](https://github.com/lstierney/recipe-website-frontend/actions/workflows/webpack.yml/badge.svg)   |
| Last Commit    |![Latest Commit](https://img.shields.io/github/last-commit/lstierney/recipe-website-frontend)   |
| Latest Version | ![Latest Version](https://img.shields.io/badge/latest-v2.0.0-brightgreen)  |
| License        |[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)   |


## Demo Link
http://myveggierecipes.com

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running Locally](#running-locally)
- [Run Tests](#run-tests)
- [Building](#building)
- [Deploying](#deploying)
- [Technologies](#technologies)
- [License](#license)


## Installation
Check out the code from here: https://github.com/lstierney/recipe-website-frontend

And then

```shell
npm install
```

## Configuration

Required configuration is controlled by two files `/.env.development` and `/.env.production` these should be updated to reflect the location of your backend.

## Running Locally
```shell
npm start
```

## Run Tests
```shell
npm run test
```

## Building
Before the app can be run on a server it needs to be built:
```shell
npm run build
```

## Deploying
Once you have build the app (see above) `/build` will be generated. You should copy the contents of this folder to your preferred web server.

## Technologies

Primarily React/Typescript with a smattering of Javascript, CSS and HTML

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT)



