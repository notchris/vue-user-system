<template>
    <div>
        <Header :user="user"></Header>
          <div class="container-fluid p-0">
            <div class="row no-gutters">
              <div class="col-2 bg-secondary">
                <Sidebar/>
              </div>
              <div class="col-10">
                <h1>Settings</h1>
              </div>
            </div> 
          </div>
        <Footer/>
    </div>
</template>

<script>
import Header from '../Header.vue'
import Footer from '../Footer.vue'
import Sidebar from './Sidebar.vue'
export default {
    data: function () {
        return {
            user: false
        }
    },
    mounted(){
    },
    components: {Header,Footer,Sidebar}
}
</script>
