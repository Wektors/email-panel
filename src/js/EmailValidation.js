import Validators from "@/js/Validators";
import EmailList from "./EmailList";

export default class EmailValidation {

	static userName(value) {
		return Validators.userName.test(value);
	}
	static password(value) {
		return Validators.password.test(value);
	}
	static capacity(capacity, list, availableSpace) {
		const intCapacity = parseInt(capacity);
		let spaceTaken;
		if (list.emails.length > 0) {
			spaceTaken = EmailList.calculateUsedSpace(list.emails);
		} else {
			spaceTaken = 0;
		}
		if (availableSpace - spaceTaken >= intCapacity && intCapacity > 0) {
			return true;
		} else {
			return false;
		}
	}
}
