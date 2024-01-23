import Email from "./Email.js";
import Storage from "./Storage.js";

export default class EmailList {
	constructor() {
		this.emails = [];
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
}