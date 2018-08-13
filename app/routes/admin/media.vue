<template>
    <div>
        <Header :user="user"></Header>
          <div class="container-fluid p-0">
            <div class="row no-gutters">
              <div class="col-2 bg-secondary">
                <Sidebar/>
              </div>
              <div class="col-10">
                <h1>Media</h1>
                <hr/>
                <form ref='uploadForm' 
                  id='uploadForm' 
                  action='/admin/upload' 
                  method='post' 
                  encType="multipart/form-data">
                    <input type="file" name="sampleFile" />
                    <input type='submit' value='Upload!' />
                </form>  
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
