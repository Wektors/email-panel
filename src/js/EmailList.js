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
		this.usedSpace = Storage.load("usedSpace");
		// this.add("wiktor@wiktor.com", "qwerty", 5);
		// this.add("pawel@pawel.com", "qwerty", 5);
	}

	add(userName, domain, password, capacity) {
		if (
			this.validateUserName(userName) &&
			this.validatePassword(password) &&
			this.validateCapacity(capacity)
		) {
			let newEmail = new Email(userName + "@" + domain, password, capacity);
			this.emails.push(newEmail);
			this.usedSpace += parseInt(capacity);
			Storage.save("emails", this.emails);
			Storage.save("usedSpace", this.usedSpace)
		}
	}

	get getEmails() {
		return this.emails;
	}

	deleteEmail(index) {
		this.emails.splice(index, index + 1);
	}

	validateUserName(user) {
		if (this.EmailValidation.userName(user) === true) {
			return true;
		} else {
			return false;
		}
	}
	validatePassword(pass) {
		if (this.EmailValidation.password(pass) === true) {
			return true;
		} else {
			return true;
		}
	}
	validateCapacity(capacity) {
		if (
			capacity == parseInt(capacity) &&
			capacity <= this.availableSpace - this.usedSpace &&
			capacity > 0
		) {
			return true;
		}
		return false;
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
		let storageArray = JSON.parse(Storage.load("emails"))
		console.log(storageArray)
		let emailList = []

		for (let i = 0; i < storageArray.length; i++) {
			let newEmail = new Email(
				storageArray[i].emailAddress,
				storageArray[i].password,
				storageArray[i].capacity
			);
			emailList.push(newEmail)
		}
		
		this.emails = emailList
	}

}
