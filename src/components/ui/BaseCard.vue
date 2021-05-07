<template>
	<div class="card">
		<slot></slot>
	</div>
</template>

<style scoped>
	.card {
		margin: 1rem auto;
		padding: 1.5rem;

		max-width: 45rem;

		border-radius: 5px;
		box-shadow: 1px 2px 6px hsla(0deg, 100%, 0%, 0.2);
	}
</style>