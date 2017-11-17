<template>
  <div class="login container">

    <div class="panel panel-default">
      <div class="panel-heading"><h3>Login</h3></div>
      <div class="panel-body">
        <div class="form-group">
          <input type="text" v-model="username" placeholder="Username" class="form-control" style="width: 100%;">
        </div>
        <div class="form-group">
          <input type="password" v-model="password" placeholder="Password" class="form-control" style="width: 100%;">
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-md-6">
              <input type="submit" value="Login" v-on:click="login($event)" class="btn btn-primary btn-block" style="margin: auto">
            </div>
            <div class="col-md-6">
              <router-link to="/register" class="btn btn-success btn-block" style="color: white !important">Register</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="color: red" v-if="error">Error Login</div>
  </div>
</template>

<script>
import axios from 'axios'
const qs = require('qs')
var config = require('../../config')
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      error: false
    }
  },
  methods: {
    login (event) {
      event.preventDefault()
      let vm = this
      vm.$session.start()

      axios.post(config.dev.apihost + '/login/', qs.stringify({
        username: vm.username,
        password: vm.password
      }))
      .then(res => {
        vm.error = false
        console.log(res.data)
        vm.$session.set('user', {
          token: res.data.token
        })
        vm.$router.push('/profile')
      })
      .catch(e => {
        vm.error = true
        // this.errors.push(e)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
