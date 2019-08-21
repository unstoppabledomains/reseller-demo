import { createBrowserHistory } from 'history';

const history = createBrowserHistory({
	basename: '/',
	forceRefresh: false,
	keyLength: 6
});

export default history