const portscanner = require('portscanner');

function findPort (min, max) {
  return portscanner.findAPortNotInUse(min, max)
}

module.exports = findPort;
