<template>
	<div>
		<List :emailList="emailList" @listChanged="saveToStorage()" />
		<Adding :emailList="emailList" @listChanged="saveToStorage()" />
	</div>
</template>

<script>
import Storage from "@/js/Storage.js";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import List from "./List.vue";
import EmailList from "/src/js/EmailList.js";
import Adding from "./Adding.vue";
import Email from "@/js/Email.js";

@Component({
	components: {
		List,
		Adding,
	},
})
export default class Main extends Vue {
	data() {
		return {
			emailList: new EmailList(),
		};
	}
	loadFromStorage() {
		this.emailList.emails = this.deserializeEmails()
	}

	beforeMount() {
		this.loadFromStorage();
	}

	deserializeEmails() {
		let storageArray = JSON.parse(Storage.load("emails"));
		let emailList = [];
		if (storageArray !== null && storageArray.length >= 0) {
			for (let i = 0; i < storageArray.length; i++) {
				let newEmail = new Email(
					storageArray[i].emailAddress,
					storageArray[i].password,
					storageArray[i].capacity
					);
					emailList.push(newEmail);
				}
			}
		return emailList;
	}

	saveToStorage() {
		Storage.save("emails", this.emailList.emails);
	}
}
</script>

<style scoped></style>
