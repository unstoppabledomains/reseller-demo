const reseller = process.env['REACT_APP_RESELLER'] || 'udtesting';
const token = process.env['REACT_APP_TOKEN'] || '1txobsttv63p5wrfvnpjp0wfuava5cov'
const stripeKey = process.env['REACT_APP_STRIPE_TEST'] || 'pk_test_bERlHfGH5lT9rTIhKPg74H0o'
const stripeKeyLiveDomain = process.env['REACT_APP_STRIPE_LIVE'] || 'pk_live_HAPE6Nv5bfhCJYKe6Nfaaj4P'


export default {
	reseller,
	token,
	stripeKey,
	stripeKeyLiveDomain
}