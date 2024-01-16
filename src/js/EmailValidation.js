import Validators from "./Validators";

export default class EmailValidation {
	constructor() {}

	userName(value) {
		let regex = Validators.userName;
		return regex.test(value);
	}
	password(value) {
		let regex = Validators.password;
		return regex.test(value);
	}
}
