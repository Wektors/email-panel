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
				<input
					type="text"
					v-model="userName"
					:class="classValidation(validationUserName)"
				/>@<select v-model="domain">
					<option v-for="domain in domainList" :key="domain">
						{{ domain }}
					</option>
				</select>
			</div>
			<div>
				Hasło:
				<input
					:type="passwordType"
					v-model="password"
					:class="classValidation(validationPassword)"
				/>
				<button @click="generatePassword">Generuj hasło</button>
			</div>
			<div>
				Pojemność:
				<input
					type="number"
					v-model="capacity"
					:class="classValidation(validationCapacity)"
				/>
				GB
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
import EmailList from "@/js/EmailList";

@Component({
	components: {},
})
export default class Adding extends Vue {
	@Prop(EmailList) emailList;

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
			domainList: config.available_domains,
			availableSpace: parseInt(config.available_space_GB),
		};
	}

	get validationUserName() {
		return EmailValidation.userName(this.userName);
	}
	get validationPassword() {
		return EmailValidation.password(this.password);
	}
	get validationCapacity() {
		return EmailValidation.capacity(
			this.capacity,
			this.emailList.calculateUsedSpace(),
			this.availableSpace
		);
	}

	classValidation(validation) {
		if (validation) {
			return "valid";
		} else {
			return "non-valid";
		}
	}

	triggerPopup() {
		this.clearForm();
		this.showForm = true;
	}

	validateAll() {
		return (
			this.validationUserName === true &&
			this.validationPassword === true &&
			this.validationCapacity === true
		);
	}

	clearForm() {
		this.userName = "";
		this.password = "";
		this.capacity = undefined;
		this.passwordType = "password";
		this.showForm = false;
	}

	triggerAdd() {
		if (this.validateAll() === true) {
			this.emailList.add(
				this.userName,
				this.domain,
				this.password,
				this.capacity
			);
			this.clearForm();
			this.$emit("listChanged");
		}
	}
	generatePassword() {
		this.passwordType = "text";
		this.password = this.generateRandomPassword();
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
