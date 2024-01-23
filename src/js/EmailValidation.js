import Validators from "@/js/Validators";

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
	capacity(capacity, list, availableSpace) {
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
		if (availableSpace - spaceTaken >= intCapacity && intCapacity > 0) {
			return true;
		} else {
			return false;
		}
	}
}
