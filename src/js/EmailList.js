import Email from './Email.js';

export default class EmailList {
	constructor() {
		this.emails = [];
		this.add("wiktor@wiktor.com", "qwerty", 10);
		this.add("pawel@pawel.com", "qwerty", 10);
	}
	/**
	 *
	 * @returns {string[]}
	 */

	add(emailAddress, password, capacity) {
			let newEmail = new Email(emailAddress, password, capacity) 
			this.emails.push(newEmail);

	}
	get getEmails() {
		return this.emails;
	}

	deleteEmail(index) {
		this.emails.splice(index, index + 1);
	}
}
