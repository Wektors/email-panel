<template>
	<div>
		<button @click="triggerPopup()" v-if="showForm === false">
			Dodaj skrzynkę
		</button>
		<br />
		<br />
		<slot v-if="showForm === true">
			Email:
			<input type="text" v-model="userName" :class="classUserName" />@<select
				v-model="domain"
			>
				<option v-for="domain in domainList" :key="domain">
					{{ domain }}
				</option>
			</select>
			<br />
			Hasło:
			<input :type="passwordType" v-model="password" :class="classPassword" />
			<button @click="generatePassword()">Generuj hasło</button>
			<br />
			Pojemność:
			<input type="number" v-model="capacity" :class="classCapacity" /> GB
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
import config from "@/data/config.json";

@Component({
	components: {},
})
export default class Adding extends Vue {
	@Prop() emailList;

	data() {
		return {
			showForm: true,
			userName: "",
			domain: config.available_domains[0],
			password: "",
			capacity: undefined,
			passwordType: "password",
			generateRandomPassword: generateRandomPassword,
			EmailValidation: EmailValidation,
			checkValidation: false,
			domainList: config.available_domains,
			availableSpace: parseInt(config.available_space_GB),
		};
	}

	get classUserName() {
		if (this.checkValidation === false) {
			return "";
		}
		if (this.validationUserName) {
			return "valid";
		} else {
			return "non-valid";
		}
	}

	get validationUserName() {
		if (EmailValidation.userName(this.userName) === true) {
			return true;
		} else {
			return false;
		}
	}

	get classPassword() {
		if (this.checkValidation === false) {
			return "";
		}
		if (this.validationPassword) {
			return "valid";
		} else {
			return "non-valid";
		}
	}

	get validationPassword() {
		if (EmailValidation.password(this.password) === true) {
			return true;
		} else {
			return false;
		}
	}

	get classCapacity() {
		if (this.checkValidation === false) {
			return "";
		}
		if (this.validationCapacity) {
			return "valid";
		} else {
			return "non-valid";
		}
	}

	get validationCapacity() {
		if (EmailValidation.capacity(this.capacity, this.emailList, this.availableSpace)) {
			return true;
		} else {
			return false;
		}
	}

	triggerPopup() {
		this.showForm = true;
	}

	validateAlL() {
		if (
			this.validationUserName &&
			this.validationPassword &&
			this.validationCapacity
		) {
			return true;
		} else {
			return false;
		}
	}

	triggerAdd() {
		if (this.validateAlL()) {
			this.emailList.add(
				this.userName,
				this.domain,
				this.password,
				this.capacity
			);
			this.showForm = false;
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
