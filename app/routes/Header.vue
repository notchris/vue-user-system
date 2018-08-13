<template>
    <header class="w-100">
		<nav class="navbar navbar-expand navbar-dark bg-dark">
		  <a class="navbar-brand" href="#">Example Site</a>
		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar">
		    <span class="navbar-toggler-icon"></span>
		  </button>
		  <div class="collapse navbar-collapse" id="navbar">
		    <div class="navbar-nav mr-auto">
		      <a class="nav-item nav-link" href="/">Home</a>
		    </div>
			<div v-if="user" class="dropdown">
			  <a class="text-muted dropdown-toggle" href="#" data-toggle="dropdown">
			    <img style="max-width:35px;" :src="'https://avatars.io/gravatar/'+user._doc.email+'/140'" class="img-fluid rounded-circle">
			  </a>
			  <div class="dropdown-menu dropdown-menu-right">
			  	<h6 class="dropdown-header">{{user._doc.username}}</h6>
			    <a class="dropdown-item" :href="'/user/'+user._doc.username">Profile</a>
			    <a class="dropdown-item" href="/settings">Settings</a>
			    <a v-if="user._doc.role == 'admin'" class="dropdown-item" href="/admin">Admin</a>
			    <div class="dropdown-divider"></div>
			    <a class="dropdown-item" href="/logout">Logout</a>
			  </div>
			</div>
		    <div v-else>
		    	<a class="text-light" href="/login">Login</a>
		    </div>
		  </div>
		</nav>
    </header>
</template>

<script>
export default {
	name: 'Header',
    data: function () {
        return {
        }
    },
    props: ['user']
}
</script>

<style lang="css">

</style>