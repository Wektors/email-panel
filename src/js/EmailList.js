import Email from "./Email.js";

export default class EmailList {
	constructor() {
		this.emails = [];
	}

	add(userName, domain, password, capacity) {
		this.emails.push(new Email(userName + "@" + domain, password, capacity))
	}

	get getEmails() {
		return this.emails;
	}

	deleteEmail(index) {
		this.emails.splice(index, index + 1);
	}

	static calculateUsedSpace = (emailList) => {
			let spaceUsed = 0;
			for (let i = 0; i < emailList.length; i++) {
				spaceUsed += parseInt(emailList[i].capacity);
			}
			return spaceUsed;
		};
}