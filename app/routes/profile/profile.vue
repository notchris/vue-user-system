<template>
    <div>
        <Header :user="user"></Header>
        <div class="container my-3">
            <div class="row">
                <div class="col-4">
                    <div v-if="profile" class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <img :src="'https://avatars.io/gravatar/'+profile._doc.email+'/140'" alt="user team member profile image" class="img-fluid rounded mx-auto d-block">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col text-center">
                                    <h3 class="display-5 mt-2">{{profile._doc.username}}</h3>
                                    <div class="p-2 border-top">{{profile._doc.date}}</div>
                                    <div class="p-2 border-top">Additional information</div>
                                </div>
                            </div>                
                        </div>
                    </div>
                </div>
                <div class="col-8">

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
            profile: ''
        }
    },
    mounted(){
    },
    components: {Header,Footer}
}
</script>
