# Sync Now

[![Build Status](https://travis-ci.org/bredele/sync-now.svg?branch=master)](https://travis-ci.org/bredele/sync-now)
[![NPM](https://img.shields.io/npm/v/sync-now.svg?style=flat-square)](https://www.npmjs.com/package/sync-now)
[![Downloads](https://img.shields.io/npm/dm/sync-now.svg?style=flat-square)](http://npm-stat.com/charts.html?package=sync-now)
[![pledge](https://bredele.github.io/contributing-guide/community-pledge.svg)](https://github.com/bredele/contributing-guide/blob/master/community.md)


Built for [steroid](https://github.com/bredele/steroid), this module trap promises or streams to get property values in a synchronous way even if not resolved yet.

## Usage

This module transforms a promise into an object where each property resolves to the data returned by the promise. Here's an example:


```js
const now = require('sync-now')


const data = now(new Promise(resolve => {
  setTimeout(() => resolve({
    name: 'john',
    items: ['hello', 'world']
  }), 500)
}))


// when data promise is still pending
const name = data.name.then(name => {
  console.log(name)
  // => john
})


setTimeout(() => {
  // data promise is resolved
  console.log(data.items)
  // => ['hello, 'world]
}, 1000)

```

You will notice that Sync-now traps a promise and return promises for each property value you try to get before the promise resolves.


## Installation

```shell
npm install sync-now --save
```

[![NPM](https://nodei.co/npm/sync-now.png)](https://nodei.co/npm/sync-now/)

## Steroid

[Steroid](https://github.com/bredele/steroid) allows to directly interpolates promises and/or streams. When used with Sync-now, it is possible to transfer chunk of HTML as fast as possible without waiting for the data to be available.


```javascript
const html = require('steroid')
const now = require('sync-now')


// sync-now accepts promises or streams
const data = now(new Promise(resolve => {
  setTimeout(() => resolve({
    name: 'john',
    items: ['hello', 'world']
  }), 1000)
}))


// steroid interpolates promises or streams
html`
  <h1>Hello ${data.name}</h1>
  <ul>
    ${data.items.map(item => `<li>${item}</li>`)}
  </ul>
`
```

## Question

For questions and feedback please use our [twitter account](https://twitter.com/bredeleca). For support, bug reports and or feature requests please make sure to read our
<a href="https://github.com/bredele/contributing-guide/blob/master/community.md" target="_blank">community guideline</a> and use the issue list of this repo and make sure it's not present yet in our reporting checklist.

## Contribution

Steroid is an open source project and would not exist without its community. If you want to participate please make sure to read our <a href="https://github.com/bredele/contributing-guide/blob/master/community.md" target="_blank">guideline</a> before making a pull request. If you have any sync-now-related project, component or other let everyone know in our wiki.


## Licence

The MIT License (MIT)

Copyright (c) 2016 Olivier Wietrich

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
