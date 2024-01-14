<template>
	<div>
		<table>
			<tr>
				<th>L.p.</th>
				<th>adres email</th>
				<th>Usuń</th>
			</tr>
			<tr
				v-for="({ emailAddress, key }, index) in emailList.getEmails"
				:key="key"
			>
				<td>{{ index + 1 }}</td>
				<td>{{ emailAddress }}</td>
				<button @click="deleteEmail(index)">X</button>
			</tr>
		</table>
		<div>
			<div></div>
		</div>
	</div>
</template>

<script>
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";

@Component({
	components: {},
})
export default class List extends Vue {
	@Prop() emailList;

	data() {
		return {};
	}

	deleteEmail(index) {
		this.emailList.deleteEmail(index);
	}
}
</script>

<style scoped></style>
