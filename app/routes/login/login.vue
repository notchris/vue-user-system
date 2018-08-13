<template>
    <div>
			<div class="row justify-content-md-center my-4">
			    <div class="col-md-4">
			        <div class="card">
			            <div class="card-header">
			                <h5 class="card-title m-0">Login</h5>
			            </div>
			            <div class="card-body">
			            	<div v-if="message.length" class="alert alert-danger">{{message[0]}}</div>
			                <form action="/login" method="post">
			                    <fieldset>
			                        <div class="form-group">
			                            <input type="email" placeholder="Email" class="form-control" name="email" required autofocus />
			                        </div>
			                        <div class="form-group">
			                            <input type="password" placeholder="Password" class="form-control" name="password" required />
			                        </div>
			                        <input class="btn btn-primary btn-block" type="submit" value="Login">
			                    </fieldset>
			                </form>                
			            </div>
			        </div>
			    </div>
			</div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            message: ''
        }
    }
}
</script>
<style>
	html,
	body {
	  height: 100%;
	}
	body {
	  text-align:center;
	}
</style>
