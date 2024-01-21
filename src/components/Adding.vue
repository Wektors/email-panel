<template>
	<div>
		<button @click="triggerPopup()" v-if="showForm === false">
			Dodaj skrzynkę
		</button>
		<br />
		<br />
		<slot v-if="showForm === true">
				Email:
				<input
				type="text"
				v-model="userName"
				:class="validationUserName"
				/>@<select v-model="domain">
					<option v-for="domain in domainList" :key="domain">
						{{ domain }}
					</option>
				</select>
				<br />
				Hasło:
				<input
				:type="passwordType"
				v-model="password"
				:class="validationPassword"
				/>
				<button @click="generatePassword()">Generuj hasło</button>
				<br />
				Pojemność:
				<input type="number" v-model="capacity" :class="validationCapacity" /> GB
				<br />
				<button @click.capture="triggerAdd()">Dodaj</button>
		</slot>
	</div>
</template>
<script>
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import generateRandomPassword from "@/js/generateRandomPassword";
import EmailValidation from "@/js/EmailValidation.js";

@Component({
	components: {},
})
export default class Adding extends Vue {
	@Prop() emailList;

	data() {
		return {
			showForm: true,
			userName: "",
			domain: this.emailList.domainList[0],
			password: "",
			domainList: this.emailList.domainList,
			capacity: undefined,
			passwordType: "password",
			generateRandomPassword: generateRandomPassword,
			EmailValidation: new EmailValidation(),
			checkValidation: false,
		};
	}

	get validationUserName() {
		if (this.checkValidation === false) {
			return "";
		} else if (this.EmailValidation.userName(this.userName)) {
			return "valid";
		} else {
			return "non-valid";
		}
	}

	get validationPassword() {
		if (this.checkValidation === false) {
			return "";
		} else if (this.EmailValidation.password(this.password)) {
			return "valid";
		} else {
			return "non-valid";
		}
	}

	get validationCapacity() {
		if (this.checkValidation === false) {
			return "";
		} else if (this.EmailValidation.capacity(this.capacity, this.emailList)) {
			return "valid";
		} else {
			return "non-valid";
		}
	}

	triggerPopup() {
		this.showForm = true;
	}

	triggerAdd() {
		if (
			this.EmailValidation.validateAll(
				this.userName,
				this.password,
				this.capacity,
				this.emailList
			)
		) {
			this.emailList.add(
				this.userName,
				this.domain,
				this.password,
				this.capacity
			);
			this.showForm = false;
			this.passwordType = "password";
			this.userName = "";
			this.password = "";
			this.capacity = "";
			this.checkValidation = false;
		} else {
			this.checkValidation = true;
		}
	}
	loadFromStorage() {
		this.emailList.deserializeEmails();
	}
	beforeMount() {
		this.loadFromStorage();
	}

	generatePassword() {
		let newPassword = this.generateRandomPassword();
		this.password = newPassword;
		this.passwordType = "text";
		this.checkValidation = false;
	}
}
</script>

<style scoped>
.valid {
	color: #00883f;
	border: 1px solid #00883f;
}
.non-valid {
	color: red;
	border: 1px solid red;
}
</style>
