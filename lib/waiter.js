function wait (opts = {}) {
  return new Promise((resolve, reject) => {
    const env = opts.env || process.env.NODE_ENV 
    const delay = opts.delay || 1000
    const knexfile = opts.knexfile || 'knexfile'

    let config = require(
        require('path').join(process.cwd(), knexfile)
      )

    if (env) config = config[env]

    const tryConnection = () => {
      let knex = require('knex')(config)
      knex
        .raw('SELECT 1 + 1')
        .then(result => knex.destroy().then(() => {
          resolve()
        }))
        .catch(err => knex.destroy().then(() => {
          console.error(err)
          console.error(`Connection failed, waiting ${delay}...`)
          setTimeout(tryConnection, delay)
        }))
    }
    tryConnection()
  })
}

module.exports = wait