<template>
    <div>
        <Header :user="user"></Header>
          <div class="container-fluid p-0">
            <div class="row no-gutters">
              <div class="col-2 bg-secondary">
                <Sidebar/>
              </div>
              <div class="col-10 px-4 py-3">
                <h2>Users</h2>
                <table v-if="users" class="table table-bordered">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="u in users">
                      <td>{{u._doc.username}}</td>
                      <td>{{u._doc.email}}</td>
                      <td>{{u._doc.role}}</td>
                      <td>{{u._doc.date}}</td>
                      <td>Edit</td>
                    </tr>
                  </tbody>
                </table>
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
            users: false
        }
    },
    mounted(){
      console.log(this.users)
    },
    components: {Header,Footer,Sidebar}
}
</script>
