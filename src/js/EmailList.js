import Email from "./Email.js";
import EmailValidation from "./EmailValidation.js";

export default class EmailList {
	constructor() {
		this.EmailValidation = new EmailValidation();
		this.emails = [];
		this.add("wiktor@wiktor.com", "qwerty", 10);
		this.add("pawel@pawel.com", "qwerty", 10);
	}

	add(emailAddress, password, capacity) {
		let newEmail = new Email(emailAddress, password, capacity);
		this.emails.push(newEmail);
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
	validate(userName, password) {
		if (
		this.validateUser(userName) &&
		this.validatePassword(password)
		) {
			return true
		}
	}
}
