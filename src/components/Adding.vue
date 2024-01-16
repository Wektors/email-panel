<template>
	<div>
		<button @click="triggerPopup()">Dodaj skrzynkę</button>
		<br />
		<br />
		<slot v-if="showForm === true">
			Email: <input type="text" v-model="userName" :class="validationUserName" />@<select v-model="domain">
				<option v-for="domain in domainList" :key="domain">
					{{ domain }}
				</option>
			</select>
			<br />
			Hasło: <input type="password" v-model="password" :class="validationPassword"/>
			<button>Generuj hasło</button>
			<br />
			Pojemność: <input type="number" /> GB
			<br />
			<button @click="triggerAdd()">Dodaj</button>
		</slot>
	</div>
</template>

<script>
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import config from "/home/vector/Dokumenty/Projects/email-panel/src/data/config.json";

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
			domainList: config.available_domains,
		};
	}

	get validationUserName() {
		if (this.emailList.validateUserName(this.userName)) {
			return "valid" 
		} else {
			return "non-valid"
		}
	}

	get validationPassword() {
		if (this.emailList.validatePassword(this.password)) {
			return "valid" 
		} else {
			return "non-valid"
		}
	}

	triggerPopup() {
			this.showForm = true;
	}

	triggerAdd() {
		if (this.emailList.validate(this.userName, this.password)) {
			this.emailList.add(this.userName + "@" + this.domain, this.password);
			this.showForm = false;
		}
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
