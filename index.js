#! /usr/bin/env node
'use strict'

const wait = require('./lib/waiter')
const argv = require('minimist')(process.argv.slice(2))

let delay = parseInt(argv.delay || argv._.pop(), 10)
if (isNaN(delay)) {
  delay = 1000
}

return wait({
  knexfile: argv.knexfile,
  delay,
})
.then(process.exit)
.catch((err) => {
  console.log(err)
  process.exit(1)
})

