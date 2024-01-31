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
			<button @click="triggerAdd()">Dodaj</button>
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
			showForm: false,
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
			omitValidationPassword: "",
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
		if (this.password === this.omitValidationPassword) {
			return true;
		}
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
		if (
			EmailValidation.capacity(
				this.capacity,
				this.emailList,
				this.availableSpace
			)
		) {
			return true;
		} else {
			return false;
		}
	}

	triggerPopup() {
		this.clearForm();
		this.showForm = true;
	}

	validateAll() {
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

	clearForm() {
		this.userName = "";
		(this.password = ""), (this.capacity = undefined);
		this.checkValidation = false;
		this.passwordType = "password";
		this.omitValidationPassword = "";
	}

	triggerAdd() {
		if (this.validateAll()) {
			this.emailList.add(
				this.userName,
				this.domain,
				this.password,
				this.capacity
			);
			this.clearForm();
			this.showForm = false;
			this.$emit('listChanged')
		} else {
			this.checkValidation = true;
		}
	}

	generatePassword() {
		this.passwordType = "text";
		let newPassword = this.generateRandomPassword();
		this.password = newPassword;
		this.omitValidationPassword = newPassword; // no nie mialem innego pomyslu jak to naprawic
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
