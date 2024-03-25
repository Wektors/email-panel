<template>
	<div>
		<table>
			<tr>
				<th>L.p.</th>
				<th>adres email</th>
				<th>Usuń</th>
			</tr>
			<tr
				v-for="({ emailAddress, capacity, key }, index) in emailList.getEmails"
				:key="key"
			>
				<td>{{ index + 1 }}</td>
				<td :title="capacity + ' GB'">{{ emailAddress }}</td>
				<button @click="deleteEmail(index)">X</button>
			</tr>
			<tr v-if="listEmpty">
				Brak skrzynek e-mail
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
	@Prop(Object) EmailList;

	data() {
		return {};
	}

	get listEmpty() {
			return (this.emailList.getEmails.length === 0)
	}

	deleteEmail(index) {
		if (confirm("Czy na pewno?")) {
			this.emailList.deleteEmail(index);
			this.$emit('listChanged')
		}
	}
}
</script>

<style scoped></style>
