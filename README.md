## Reseller demo flow

This Demo show in particular how others can use UD API to resell .ZIL domains


Enables domain purchase. 


Requires:
User email
`order` parameters:
`payment` any of: {type: ‘reseller’} - for reseller payback method
{type: ‘stripe’, tokenId: <token>} - for stripe payment method
  
`domains[].name` to be bought
`domains[].owner` to own the domain after the purchase
`domains[].resolution` resolver information on the domain name that contains a crypto address for each currency
Returns:
`orderNumber` to track the order status and form support requests to UD
`subtotal` that reseller will be charged for the order
`items[]` purchased:
`name` of the domain
`type` of the item (currently only `ZNS_DOMAIN`)
Whether a domain is in the `test` space (aka `reseller-test-*`)
`blockchain.status` of the transaction: “PENDING”, “MINED”, “CANCELED”.

IMPORTANT:
The blockchain needs time before a transaction is mined. In rare cases, it is possible for someone to front run your purchase, which would result in an order being cancelled. We expect this to happen in less than 1 out of 10,000 cases. Blockchain doesn’t currently support any locking functionality for an upcoming purchase. Please make sure you are using the “Order Status” endpoint and wait until the transaction is mined.

The API currently supports a single domain purchase at a time. UD will extend support to multiple domains in the future.

Order parameters JSON Schema: https://gist.github.com/bogdan/f9911f4022c6441cbe40ff93811e1ea2
About JSON Schema: 
http://json-schema.org/

Examples:

As a recommended payment method we suggest to use Stripe. You will need to obtain the stripe token and send it to us as
POST request to https://unstoppabledomains.com/api/v1/resellers/udtesting/users/bogdan+testreseller@unstoppabledomains.com/orders

BODY 
```json
{ "order": { "payment": { "type": "stripe", "tokenId": "tok_1FAeVFG8PQyZCUJhJp7emswP" }, "domains": [ { "name": "reseller-test-udtesting-17829.zil", "owner": "0xa823a39d2d5d2b981a10ca8f0516e6eaff78bdcf", "resolution": { "crypto": { "ZIL": { "address": "0xe568f2BB42A77F6508911290d581B3Af107b1e4B" }, "ETH": { "address": "0x20B4564DEB7AF89ece828d843D0Ac2c16934a23e" } } } } ] } }
{
  "order": {
    "orderNumber": "-Lmz2FnYCUZdVe_foJ2M",
    "subtotal": 10,
    "test": true,
    "payment": {
      "type": "stripe"
    },
    "items": [
      {
        "type": "ZNS_DOMAIN",
        "name": "reseller-test-udtesting-17829.zil",
        "blockchain": {
          "status": "PENDING"
        }
      }
    ]
  }
}
```

As an alternative UD trust resellers with any payment process they decided to go. If this is the case then reseller need to use the example bellow to make a buy call. We will contact reseller on a monthly basis chargin them for the domain they sold. 

https://unstoppabledomains.com/api/v1/resellers/udtesting/users/buyer-udtesting@example.com/orders

BODY 
```json

{ "order": { "domains": [ { "name": "reseller-test-udtesting-24287.zil", "owner": "0xa823a39d2d5d2b981a10ca8f0516e6eaff78bdcf", "resolution": { "crypto": { "ZIL": { "address": "0xe568f2BB42A77F6508911290d581B3Af107b1e4B" }, "ETH": { "address": "0x20B4564DEB7AF89ece828d843D0Ac2c16934a23e" } } } } ] } }
{
  "order": {
    "orderNumber": "-Lm9wiYytgrpf4YCWYv6",
    "subtotal": 10,
    "items": [
      {
        "type": "ZNS_DOMAIN",
        "name": "reseller-test-udtesting-24287.zil",
        "test": true,
        "blockchain": {
          "status": “PENDING”
        }
      }
    ]
  }
}
```
