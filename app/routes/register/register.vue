<template>
    <div>
    	<Header/>
            <div class="row justify-content-md-center my-4">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title m-0">New User</h5>
                        </div>
                        <div class="card-body">
                            <div v-if="message.length" v-for="m in message" class="alert alert-danger">{{m}}</div>
                            <form action="/register" method="post">
                                <fieldset>
                                    <div class="form-group">
                                        <input type="email" placeholder="Email" class="form-control" name="email"/>
                                    </div>
                                    <div class="form-group">
                                        <input type="password" placeholder="Password" class="form-control" name="password" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" placeholder="Username" name="username" class="form-control">
                                    </div>
                                    <input class="btn btn-success btn-block" type="submit" value="Register">
                                </fieldset>
                            </form>                
                        </div>
                    </div>
                </div>
            </div>
        <Footer/>
    </div>
</template>

<script>
import Header from '../Header.vue'
import Footer from '../Footer.vue'
export default {
    data: function () {
        return {
            message: ''
        }
    },
    components: {Header,Footer}
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