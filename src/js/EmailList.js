import Email from "./Email.js";

export default class EmailList {
	constructor() {
		this.emails = [];
	}

	add(userName, domain, password, capacity) {
		this.emails.push(new Email(userName + "@" + domain, password, capacity));
	}

	get Emails() {
		return this.emails;
	}

	deleteEmail(index) {
		this.emails.splice(index, index + 1);
	}

	calculateUsedSpace() {
		let spaceUsed = 0;
		for (let i = 0; i < this.emails.length; i++) {
			spaceUsed += parseInt(this.emails[i].capacity);
		}
		return spaceUsed;
	}
}
