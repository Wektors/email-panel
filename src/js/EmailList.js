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
		this.emails.push({
			emailAddress: emailAddress,
			password: password,
			capacity: capacity,
		});
		console.log(this.emails);
	}
	get getEmails() {
		return this.emails;
	}

	deleteEmail(index) {
		this.emails.splice(index, index + 1);
	}
}
