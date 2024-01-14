<template>
	<List :emailList="EmailList"/>
</template>

<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import List from "./List.vue";
import EmailList from "/src/js/EmailList.js";

@Component({
	components: {
		List,
	},
})
export default class Main extends Vue {
	data() {
		return {
      EmailList: new EmailList(),
		};
	
}
}
</script>

<style scoped>

</style>