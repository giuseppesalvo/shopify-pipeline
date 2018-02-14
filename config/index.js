const paths = require('./paths')
const YAML = require('yamljs')
const os = require('os')

function getIP() {

	const ips = []

	const ifaces = os.networkInterfaces();

	Object.keys(ifaces).forEach(function (ifname) {
	  var alias = 0;

	  ifaces[ifname].forEach(function (iface) {
	    if ('IPv4' !== iface.family || iface.internal !== false) {
	      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
	      return
	    }

	    if (alias >= 1) {
	      // this single interface has multiple ipv4 addresses
	      ips.push(iface.address)
	    } else {
	      // this interface has only one ipv4 adress
	      ips.push(iface.address)
	    }
	    ++alias;
	  })
	})

	return ips
}

module.exports = {
  paths,
  domain: `https://${getIP()[0]}`,
  port: 8080,
  regex: {
    images: /\.(png|svg|jpg|gif)$/,
    static: /\.(liquid|json)$/
  },
  shopify: YAML.load(paths.userShopifyConfig)
}
