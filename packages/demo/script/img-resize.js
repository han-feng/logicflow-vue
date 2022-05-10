const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

function resize(filename) {
  sharp(path.join(__dirname, '../cypress/downloads', filename))
    .resize(320, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toFile(path.join(__dirname, '../dist/img', filename))
}

fs.mkdir(path.join(__dirname, '../dist/img'), { recursive: true }, () => {
  resize('bpmn.png')
  resize('nodeRed.png')
})
