<template>
  <div class="col-2 bg-secondary px-1">
    <nav class="nav flex-column py-3">
      <a class="nav-link text-light" href="/admin/dashboard">Dashboard</a>
      <a class="nav-link text-light" href="/admin/posts">Posts</a>
      <a class="nav-link text-light" href="/admin/media">Media</a>
      <a class="nav-link text-light" href="/admin/pages">Pages</a>
      <a class="nav-link text-light" href="/admin/users">Users</a>
      <a class="nav-link text-light" href="/admin/settings">Settings</a>
    </nav>
  </div>
</template>

<script>
export default {
    name: 'Sidebar',
    data: function () {
        return {
        }
    },
    mounted(){
    }
}
</script>
