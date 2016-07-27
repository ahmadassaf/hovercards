var applyMiddleware = require('redux').applyMiddleware;
var combineReducers = require('redux').combineReducers;
var createStore     = require('redux').createStore;
var thunkMiddlware  = require('redux-thunk').default;

var optionsReducer = require('./options.reducer');

createStore = applyMiddleware(thunkMiddlware)(createStore);

module.exports = function(initialState) {
	var store = createStore(combineReducers({
		options: optionsReducer
	}), initialState);

	if (!process.env.NODE_ENV) {
		console.debug('store', store.getState());
		store.subscribe(function() {
			console.debug('store', store.getState());
		});
	}

	optionsReducer.attachStore(store);

	return store;
};
