const path = require('path')
const webRoot = path.join( __dirname, '../../HTML' )

exports.port = process.env.PORT || 5000
exports.entry = `${webRoot}/index.html`
