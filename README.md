# Express User-agent Blocker

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

## Result

Any unwanted UAs visiting your application will be sent a `JSON` response:

```json
{
  "message": "Nothing to see here - move along please..."
}
```

## License

[MIT](LICENSE)
