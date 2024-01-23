<template>
	<div>
		<List :emailList="emailList" />
		<Adding :emailList="emailList" />
	</div>
</template>

<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import List from "./List.vue";
import EmailList from "/src/js/EmailList.js";
import Adding from "./Adding.vue";

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
		this.emailList.deserializeEmails();
	}
	beforeMount() {
		this.loadFromStorage();
	}
}
</script>

<style scoped></style>
