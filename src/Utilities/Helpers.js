/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX address
 * @param {String} domain the given domain
 * @return {Boolean}
 */
var isAddress = function (address, domain) {
  if (domain.endsWith(".zil") && !/^zil[a-zA-Z0-9]{39}$/.test(address)) {
    // check if it has the basic requirements of an address
    return false;
  }
  if (domain.endsWith(".crypto") && !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return false;
  }
  return true;
};

export default { isAddress };
