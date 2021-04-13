## Introduction

**Your-Logger-Lite** is a simple tool that provides your ExpressJS applications with basic logging capabilities and traceability by leveraging middleware.

**Your-Logger-Lite** is built using typescript and ships with type support. It is configured to allow for easy implementation both with commonJS and ES6.

## Table of Contents

- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Getting Started:](#getting-started)
	- [Environment Variables](#environment-variables)
	- [Examples](#examples)
	- [ES6](#es6)
	- [CommonJS](#commonjs)

## Installation

Uisng **yarn**:

``` 
$ yarn add your-logger-lite 
```


Using **npm**:

``` 
$ npm install your-logger-lite 
```


## Getting Started:

  ### Environment Variables

**your-logger-lite** depends on an environment variable named `LOG_LEVEL`. The concept of log-level will be discussed in further detail a little later. In brief, log-level allows some basic, global, environment-bound control over whether or not certain actions are logged. **your-logger-lite**'s `loggerMiddleware` accesses the `LOG_LEVEL` by calling `process.env.LOG_LEVEL`, as such it is important to configure this variable. As of **version 1.1.0** the default level is set to **4**, so that if you fail to provide this environment variable, the logger will still function and will show all log levels.

### Examples

Initialize your NodeJS + ExpressJS application as you normally would. Import both ` loggerMiddleware` and `traceMiddleware` from `'your-logger-lite'`. Add these pieces of middleware using **`app.use`**. It is important that you initialize them in this order: 
```
app.use(traceMiddleware)
app.use(loggerMiddleware)
```
 Here is an arbitrary example of a basic express server set-up, shown both using [ES6](#es6) and [commonJS](#commonjs): 

### ES6
```
// index.js

import express from 'express';
import cors from 'cors;
import { loggerMiddleware, traceMiddleware } from 'your-logger-lite'

	// any other imports & configs such as database connections

const app = express()

app.use(express.json());
app.use(cors()); 
app.use(express.urlencoded({ extended: true }));

app.use(traceMiddleware)
app.use(loggerMiddleware)

	// your endpoints 
	// your app.listen()

```

### CommonJS

```
// index.js

var express = require('express')
var cors = require('cors')
var logger = require('your-logger-lite')

	// any other imports & configs such as database connections

var app = express()

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(logger.traceMiddleware)
app.use(logger.loggerMiddleware)

	// your endpoints
	// your app.listen()
	
```

With this basic setup, all of your routes will already have some level of automatic logging. For example, consider the following arbitrary end-point: 

```
app.get('/health', (req, res) => {
	res.send('OK')
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`App running on port ${process.env.PORT}`)
});
```

With the middleware properly initialized, the **console** should show the following: 
```
$ App running on port 3000
$ IP: ::1, HOST: localhost, METHOD: GET
```

While logging this kind of information when in development on a local server is somewhat contrived, this kind of information can be helpful when the application / API is accessible to multiple clients when in production. 