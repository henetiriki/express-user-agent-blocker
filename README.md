# Express User-agent Blocker 🤖

[![Build Status](https://travis-ci.org/ouq77/express-user-agent-blocker.svg?branch=master)](https://travis-ci.org/ouq77/express-user-agent-blocker) [![Coverage Status](https://coveralls.io/repos/github/ouq77/express-user-agent-blocker/badge.svg?branch=master)](https://coveralls.io/github/ouq77/express-user-agent-blocker?branch=master) [![bitHound Code](https://www.bithound.io/github/ouq77/express-user-agent-blocker/badges/code.svg)](https://www.bithound.io/github/ouq77/express-user-agent-blocker) [![bitHound Dev Dependencies](https://www.bithound.io/github/ouq77/express-user-agent-blocker/badges/devDependencies.svg)](https://www.bithound.io/github/ouq77/express-user-agent-blocker/master/dependencies/npm)

A lightweight user-agent blocker for Express.

## Why?

Some bots just don't play by the rules and blatantly disrespect `robots.txt`. For those bots, we say **"Nothing to see here - move along please..."**

## Installation

```shell
npm i express-user-agent-blocker
```

## Usage

This module has no dependencies and can be added anywhere in the `express` chain as long as it runs before serving any content that needs to be blocked.

```js
const express = require('express')
const userAgentBlocker = require('express-user-agent-blocker')

const app = express()

// ...
// other middleware
// ...
app.use(userAgentBlocker(['Baiduspider', 'SomeHorridUA']))
// ...
// more middleware
// ...
```

### Specifying a custom message
               
```js
// html response
app.use(userAgentBlocker(['Baiduspider'], {
  html: '<h1>Let me make a bologna sandwich...</h1>'
}))

// plain text response
app.use(userAgentBlocker(['Baiduspider'], {
  text: 'Words hold no weight'
}))
```

## Result

If no custom message has been set (see above), any unwanted UAs visiting your application will be sent a default `JSON` response:

```json
{
  "message": "Nothing to see here - move along please..."
}
```

## Enable default debug logging

Pass `euab:*` in as part `DEBUG` when starting the express server, e.g.
```bash
// log everything
DEBUG=euab:* node server.js

// log only denied requests
DEBUG=euab:index node server.js

// log the block regex only during startup 
DEBUG=euab:buildUaBlockRegex node server.js

// log only the message sent to the blocked UA
DEBUG=euab:respondToBlockedUa node server.js
```
## Specifying a custom logger

Pass in a logger object with a `log` function to call
```js
// console log
app.use(userAgentBlocker(['Baiduspider'], {
  logger: {
    log: (message) => {
      console.log(message)
    }
  }
}))
```

## Tests

Tested in node >= 6

Run tests with:
```shell
npm test
```

## Changelog

### v1.3.1

- Additional README information

### v1.3.0

- Enable passing in of alternative logger (currently defaults to `process.stdout`)

### v1.2.0

- Added option to send alternative message to blocked UAs

### v1.1.2

- Moved test files out of src folder
- Using rollup to compile module files into single index.js

### pre v1.1.2

- Changelog didn't exist! 🙈

## License

[MIT](LICENSE)
