<template>
	<div>
		<button @click="triggerPopup()">Dodaj skrzynkę</button>
		<slot v-if="value === true"> ... </slot>
	</div>
</template>

<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
	components: {},
})
export default class Adding extends Vue {
	// @Prop({default: false,}) value;

	data() {
		return {
			value: false,
		};
	}

	triggerPopup() {
		if (this.value == true) {
			this.value = false;
		} else {
			this.value = true;
		}
	}
}
</script>

<style scoped></style>
