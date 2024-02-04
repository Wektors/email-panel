import Validators from "@/js/Validators";

export default class EmailValidation {
	static userName(value) {
		return Validators.userName.test(value);
	}
	static password(value) {
		return Validators.password.test(value);
	}
	static capacity(capacity, spaceTaken, availableSpace) {
		const intCapacity = parseInt(capacity);
		if (availableSpace - spaceTaken >= intCapacity && intCapacity > 0) {
			return true;
		} return false;
	}
}
