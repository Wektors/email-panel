export default {
	save: function (key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	},
	load: function (value) {
		return localStorage.getItem(value);
	},

	delete: function (key) {
		localStorage.removeItem(key);
	},
};
