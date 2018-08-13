<template>
    <div>
        <Header :user="user"></Header>
          <div class="container-fluid p-0">
            <div class="row no-gutters">
              <div class="col-2 bg-secondary">
                <Sidebar/>
              </div>
              <div class="col-7 px-4 py-3">
                <div>
                  <div class="row">
                    <div class="col-6"><h2>Edit Post</h2></div>
                    <div class="col-6 text-right pt-2"><a class="text-secondary" href="/admin/posts">Back to Posts</a></div>
                  </div>
                  <hr/>
                  <input type="text" v-model="post.title" placeholder="Post Title" class="form-control form-control-lg mb-3"/>
                  <div id="editor-container"></div>
                </div>
              </div>
              <div class="col-3">
                <div class="w-100 bg-light px-4 py-3 border-left border-bottom">
                  <div><strong>Status:</strong> {{post.status}}</div>
                  <div><strong>Created:</strong> {{post.created}}</div>
                  <div><strong>Author:</strong> {{post.author}}</div>
                  <hr/>
                  <button @click="updatePost()" type="button" class="btn btn-block btn-primary">Update Post</button>
                  <hr/>
                  <div class="w-100 text-center">
                    <a @click.prevent="deletePost()" href="#" class="d-inline-block text-danger text-center">Delete Post</a>
                  </div>
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
            post: false
        }
    },
    methods: {
      deletePost(){
        let that = this;
        axios.post('/admin/delete/'+this.post.uid)
          .then(function (response) {
            if (response.data) {
              console.log('Post deleted.')
              window.location.href = "http://localhost:9000/admin/posts/";
            } else {
              console.log('Error deleting post.')
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      updatePost(){
        let that = this;
        axios.post('/admin/post/'+this.post.uid,{
            title: that.post.title,
            content: that.post.content
          })
          .then(function (response) {
            if (response.data) {
              alert('Post saved.')
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    mounted(){
      let that = this;
      var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean']                                         // remove formatting button
      ];

      var quill = new Quill('#editor-container', {
        modules: {
          toolbar: toolbarOptions
        },
        placeholder: this.post.content,
        theme: 'snow'  // or 'bubble'
      });
      quill.setText(this.post.content+'\n');
      quill.on('text-change', function(delta, oldDelta, source) {
        that.post.content = quill.root.innerHTML;
      });



    },
    components: {Header,Footer,Sidebar}
}
</script>
<style>
#editor-container {
  height: 375px;
}
</style>
