<template>
	<div>
		<div v-for="{ emailAddress, capacity, key } in emailList.getEmails" :key="key">
			<div>
				{{ emailAddress  }} {{ capacity  }}
			</div>
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
}
</script>

<style scoped></style>
