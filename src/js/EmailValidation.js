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
	capacity(capacity, list) {
		const intCapacity = parseInt(capacity);
		let spaceTaken = 0;
		if (list.emails.length > 0) {
			spaceTaken = list.calculateUsedSpace(list.emails);
		}
		if (list.availableSpace - spaceTaken >= intCapacity && intCapacity > 0) {
			return true;
		} else {
			return false;
		}
	}
}
