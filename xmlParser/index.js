const { Parser } = require('xml2js')

const parser = new Parser()

const parseFile = (xml) => {
  return new Promise((resolve, reject) => {
    parser.parseString(xml, (err, result) => {
      if(err) reject(err)
      resolve(result)
    })
  })
}

module.exports = parseFile
