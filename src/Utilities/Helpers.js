
/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
var isAddress = function (address) {
	if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
		// check if it has the basic requirements of an address
		return false;
	}
	return true;
};


export default { isAddress }