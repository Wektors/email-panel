<template>
	<div>
		<button @click="triggerPopup()">Dodaj skrzynkę</button>
		<br />
		<br />
		<slot v-if="value === true"> 
		Email: <input type="text">@<select>
			<option>wiktor.com</option>
			<option>pawel.com</option>
		</select>
		<br />
		Hasło: <input type="password"> <button>Generuj hasło</button>
		<br />
		Pojemność: <input type="number"> GB
		</slot>
		<br />
		<button>Dodaj</button>
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
			value: true,
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
