<template>
    <div>
        <Header :user="user"></Header>
          <div class="container-fluid p-0">
            <div class="row no-gutters">
              <div class="col-2 bg-secondary">
                <nav class="nav flex-column py-3">
                  <a class="nav-link text-light" href="#">Dashboard</a>
                  <a class="nav-link text-light" href="#">Posts</a>
                  <a class="nav-link text-light" href="#">Media</a>
                  <a class="nav-link text-light" href="#">Pages</a>
                  <a class="nav-link text-light" href="#">Themes</a>
                  <a class="nav-link text-light" href="#">Users</a>
                  <a class="nav-link text-light" href="#">Settings</a>
                </nav>
              </div>
              <div class="col-10">
            
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
            user: false
        }
    },
    mounted(){
    },
    components: {Header,Footer}
}
</script>
