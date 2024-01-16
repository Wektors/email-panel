import Email from "./Email.js";
import EmailValidation from "./EmailValidation.js";
import config from "/home/vector/Dokumenty/Projects/email-panel/src/data/config.json";

export default class EmailList {
	constructor() {
		this.EmailValidation = new EmailValidation();
		this.emails = [];
		this.domainList = config.available_domains;
		this.availableSpace = parseInt(config.available_space_GB);
		// this.add("wiktor@wiktor.com", "qwerty", 10);
		// this.add("pawel@pawel.com", "qwerty", 10);
	}

	add(emailAddress, password, capacity) {
		let newEmail = new Email(emailAddress, password, capacity);
		this.emails.push(newEmail);
		this.changeCapacity(capacity);
	}
	get getEmails() {
		return this.emails;
	}

	deleteEmail(index) {
		this.emails.splice(index, index + 1);
	}

	validateUserName(userName) {
		if (this.EmailValidation.userName(userName) === true) {
			return true;
		} else {
			return false;
		}
	}
	validatePassword(password) {
		if (this.EmailValidation.password(password) === true) {
			return true;
		} else {
			return false;
		}
	}
	validateCapacity(capacity) {
		if (capacity <= this.availableSpace && capacity > 0 && capacity % 1 == 0) {
			return true;
		}
		console.log("capacity non val") 
		return false;
	}
	changeCapacity(capacity) {
		this.availableSpace = this.availableSpace - parseInt(capacity)
	}
	
	validate(userName, password, capacity) {
		if (
		this.validateUserName(userName) &&
		this.validatePassword(password) &&
		this.validateCapacity(capacity)
		) {
			return true
		}
	}
}
