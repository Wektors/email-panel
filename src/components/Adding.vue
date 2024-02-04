<template>
	<div>
		<div>
			<button @click="triggerPopup" v-if="showForm === false">
				Dodaj skrzynkę
			</button>
		</div>
		<slot v-if="showForm === true">
			<div>
				Email:
				<input type="text" v-model="userName" :class="classUserName" />@<select
					v-model="domain"
				>
					<option v-for="domain in domainList" :key="domain">
						{{ domain }}
					</option>
				</select>
			</div>
			<div>
				Hasło:
				<input :type="passwordType" v-model="password" :class="classPassword" />
				<button @click="generatePassword">Generuj hasło</button>
			</div>
			<div>
				Pojemność:
				<input type="number" v-model="capacity" :class="classCapacity" /> GB
			</div>
			<div>
				<button @click="triggerAdd">Dodaj</button>
			</div>
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

	validation(type, ...data) {
		return EmailValidation[type](this[type], ...data);
	}
	get validationUserName() {
		return this.validation("userName");
	}
	get validationPassword() {
		if (this.password === this.omitValidationPassword) return true;
		return this.validation("password");
	}

	get validationCapacity() {
		return this.validation(
			"capacity",
			this.emailList.calculateUsedSpace(),
			this.availableSpace
		);
	}

	validationClass(type, ...data) {
		if (this.checkValidation === false) {
			return "";
		}
		if (this.validation(type, ...data)) {
			return "valid";
		} else {
			return "non-valid";
		}
	}
	get classUserName() {
		return this.validationClass("userName");
	}
	get classPassword() {
		return this.validationClass("password");
	}
	get classCapacity() {
		return this.validationClass(
			"capacity",
			this.emailList.calculateUsedSpace(),
			this.availableSpace
		);
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
			this.$emit("listChanged");
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
