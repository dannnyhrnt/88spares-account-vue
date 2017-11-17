<template>
  <div class="register container">

    <div class="panel panel-default">
      <div class="panel-heading"><h3>Register</h3></div>
      <div class="panel-body">
        <div class="form-group">
          <input type="text" v-model="username" placeholder="Username" class="form-control" style="width: 100%;">
        </div>
        <div class="form-group">
          <input type="text" v-model="email" placeholder="Email" class="form-control" style="width: 100%;">
        </div>
        <div class="form-group">
          <input type="password" v-model="password" placeholder="Password" class="form-control" style="width: 100%;">
        </div>
        <div class="form-group">
          <input type="password" v-model="confirm_password" placeholder="Confirm Password" class="form-control" style="width: 100%;">
        </div>
        <hr>
        <div class="form-group">
          <div class="row">
            <div class="col-md-6">
              <input type="submit" value="Register" v-on:click="register($event)" class="btn btn-success btn-block" style="margin: auto">
            </div>
            <div class="col-md-6">
              <router-link to="/" class="btn btn-primary btn-block" style="color: white !important;">Login</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="color: red" v-if="error">Error Register</div>
    <div style="color: green" v-if="success">Success Register</div>
  </div>
</template>

<script>
import axios from 'axios'
const qs = require('qs')
var config = require('../../config')
export default {
  name: 'Register',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      error: false,
      success: false
    }
  },
  methods: {
    register (event) {
      event.preventDefault()
      let vm = this
      vm.$session.start()

      axios.post(config.dev.apihost + '/register/', {
        username: vm.username,
        email: vm.email,
        password: vm.password,
        confirm_password: vm.confirm_password
      },
        {
          headers: {
              'Content-Type': 'application/json',
          }
        }
      )
      .then(res => {
        vm.error = false
        console.log(res.data)
        vm.success = true
        vm.error = false
        // vm.$router.push('/login')
      })
      .catch(e => {
        vm.success = false
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
