<template>
    <div>
        <Header :user="user"></Header>
          <div class="container-fluid p-0">
            <div class="row no-gutters">
              <div class="col-2 bg-secondary">
                <Sidebar/>
              </div>
              <div class="col-10 px-4 py-3">
                <div class="row">
                  <div class="col-6">
                    <h2>Posts</h2>
                  </div>
                  <div class="col-6 text-right">
                    <button @click="newPost()" type="button" class="btn btn-primary">New Post</button>
                  </div>
                </div>
                <div class="py-4">
                  <table id="users" v-if="posts" class="table table-bordered">
                    <thead class="bg-light">
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="p in posts">
                        <td>{{p.title}}</td>
                        <td>{{p.category}}</td>
                        <td>{{p.author}}</td>
                        <td>{{p.created}}</td>
                        <td>{{p.status}}</td>
                        <td><a :href="'/admin/post/'+p.uid">Edit</a></td>
                      </tr>
                    </tbody>
                  </table>
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
import Sidebar from './Sidebar.vue'
export default {
    data: function () {
        return {
            user: false,
            posts: false
        }
    },
    methods: {
      newPost(){
        axios.post('/admin/posts')
          .then(function (response) {
            if (response.data) {
              window.location.href = "http://localhost:9000/admin/post/"+response.data;
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    mounted(){
      console.log(this.posts)
      var dataTable = new DataTable("#users");
    },
    components: {Header,Footer,Sidebar}
}
</script>
<style>
.dataTable-bottom, .dataTable-top {
  padding:0;
}
</style>
