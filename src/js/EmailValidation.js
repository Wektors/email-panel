import Validators from "@/js/Validators";
import EmailList from "./EmailList";

export default class EmailValidation {

	static userName(value) {
		let regex = Validators.userName;
		return regex.test(value);
	}
	static password(value) {
		let regex = Validators.password;
		return regex.test(value);
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
