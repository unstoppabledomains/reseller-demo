
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


/**
 * Checks if the given string is Zil format or not
 * 
 * @method isZilFormat
 * @param {String} address the given address
 * @return {Boolean} 
 */
var isZilFormat = function (address) {
	return /^zil1/.test(address);
}

/**
 * Checks if the given string is ETH public key format or not
 * 
 * @method isEthFormat
 * @param {String} address the given address
 * @return {Boolean} 
 */
var isEthFormat = function (address) {
	return /^(0x)?0(2|3)[a-f0-9]{64}$/i.test(address) ||  /^(0x)?(04)?[a-f0-9]{128}$/i.test(address);
}

/**
 * Checks if the given string is valid owner public key
 * 
 * @method isValidFormat
 * @param {String} address the given address
 * @return {Boolean} 
 */
var isValidFormat = function (address) {
	return isZilFormat(address) || isEthFormat(address);
}



export default { isAddress, isZilFormat, isEthFormat,isValidFormat }