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
		let calculateUsedSpace = (emailList) => {
			let spaceUsed = 0;
			for (let i = 0; i < emailList.length; i++) {
				spaceUsed += parseInt(emailList[i].capacity);
			}
			return spaceUsed;
		};
		const intCapacity = parseInt(capacity);
		let spaceTaken;
		if (list.emails.length > 0) {
			spaceTaken = calculateUsedSpace(list.emails);
		} else {
			spaceTaken = 0;
		}
		if (list.availableSpace - spaceTaken >= intCapacity && intCapacity > 0) {
			return true;
		} else {
			return false;
		}
	}
	validateAll(userName, password, capacity, list) {
		if (this.userName(userName) === false) {
			return false;
		} else if (this.password(password) === false) {
			return false;
		} else if (this.capacity(capacity, list) === false) {
			return false;
		} else {
			return true;
		}
	}
}
