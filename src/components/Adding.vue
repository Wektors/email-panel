<template>
	<div>
		<button @click="triggerPopup()">Dodaj skrzynkę</button>
		<br />
		<br />
		<slot v-if="value === true">
			Email: <input type="text" v-model="userName" />@<select v-model="domain">
					<option v-for="domain in domainList" :key="domain">
						{{ domain }}
					</option>
				
			</select>
			<br />
			Hasło: <input type="password" v-model="password" />
			<button>Generuj hasło</button>
			<br />
			Pojemność: <input type="number" /> GB
		</slot>
		<br />
		<button @click="triggerAdd()">Dodaj</button>
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
			value: true,
			userName: "",
			domain: config.available_domains[0],
			password: "",
			domainList: config.available_domains,
		};
	}

	triggerPopup() {
		if (this.value == true) {
			this.value = false;
		} else {
			this.value = true;
		}
	}

	triggerAdd() {
		if (this.emailList.validate(this.userName, this.password)) {
			this.emailList.add(this.userName + "@" + this.domain, this.password);
		}
	}
}
</script>

<style scoped></style>
