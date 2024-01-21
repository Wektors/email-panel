import Email from "./Email.js";
import EmailValidation from "./EmailValidation.js";
import config from "/home/vector/Dokumenty/Projects/email-panel/src/data/config.json";
import Storage from "./Storage.js";

export default class EmailList {
	constructor() {
		this.EmailValidation = new EmailValidation();
		this.emails = [];
		this.domainList = config.available_domains;
		this.availableSpace = parseInt(config.available_space_GB);
	}

	add(userName, domain, password, capacity) {
		let newEmail = new Email(userName + "@" + domain, password, capacity);
		this.emails.push(newEmail);
		Storage.save("emails", this.emails);
		return true;
	}

	get getEmails() {
		return this.emails;
	}

	deleteEmail(index) {
		this.emails.splice(index, index + 1);
		Storage.save("emails", this.emails);
	}

	validateUserName(userName) {
		if (this.EmailValidation.userName(userName)) {
			return true;
		} else {
			return false;
		}
	}
	validatePassword(password) {
		if (this.EmailValidation.password(password)) {
			return true;
		} else {
			return true;
		}
	}
	validateCapacity(capacity) {
		const intCapacity = parseInt(capacity);
		let spaceTaken = 0
		if (this.emails.length > 0) {
			spaceTaken = this.calculateUsedSpace(this.emails);
		}
		if (this.availableSpace - spaceTaken >= intCapacity && intCapacity > 0) {
			return true;
		} else {
			return false;
		}

	}

	validate(userName, password, capacity) {
		if (
			this.validateUserName(userName) &&
			this.validatePassword(password) &&
			this.validateCapacity(capacity)
		) {
			return true;
		} else {
			return false;
		}
	}

	deserializeEmails() {
		let storageArray = JSON.parse(Storage.load("emails"));
		let emailList = [];

		for (let i = 0; i < storageArray.length; i++) {
			let newEmail = new Email(
				storageArray[i].emailAddress,
				storageArray[i].password,
				storageArray[i].capacity
			);
			emailList.push(newEmail);
		}
		this.emails = emailList;
	}

	calculateUsedSpace(emailList) {
		let spaceUsed = 0;
		for (let i = 0; i < emailList.length; i++) {
			spaceUsed += parseInt(emailList[i].capacity);
		}
		return spaceUsed;
	}

}
