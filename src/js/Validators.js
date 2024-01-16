export default {
	userName: /\w{3}/gi,
	password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/gi,
};