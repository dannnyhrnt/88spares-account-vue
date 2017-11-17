<template>
  <div class="profile container">

    <div class="panel panel-default">
      <div class="panel-heading"><h3>Edit Profile</h3></div>
      <div class="panel-body">
        <div class="form-group text-left">
          <label for="first_name">First Name</label>
          <input name="first_name" type="text" v-model="first_name" placeholder="First Name" class="form-control" style="width: 100%;">
        </div>
        <div class="form-group text-left">
          <label for="last_name">Last Name</label>
          <input name="last_name" type="text" v-model="last_name" placeholder="Last Name" class="form-control" style="width: 100%;">
        </div>
        <div class="form-group text-left">
          <label for="email">Email</label>
          <input name="email" type="text" v-model="email" placeholder="Email" class="form-control" style="width: 100%;">
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-md-6">
              <button v-on:click="update" v-if="logged_in" class="btn btn-block btn-primary">Update</button>
            </div>
            <div class="col-md-6">
              <button v-on:click="logout" v-if="logged_in" class="btn btn-block btn-danger">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="color: red" v-if="error">Error Update</div>
    <div style="color: green" v-if="success">Success Update</div>
  </div>
</template>

<script>
import axios from 'axios'
const qs = require('qs')
var config = require('../../config')
export default {
  name: 'Profile',
  data () {
    return {
      email: '',
      id: '',
      first_name: '',
      last_name: '',
      error: false,
      success: false,
      logged_in: false
    }
  },
  mounted () {
    let vm = this
    let token = ''
    vm.$session.start()
    if (vm.$session.has('user')) {
      vm.logged_in = true
      vm.error = false
      vm.success = false
      token = vm.$session.get('user').token

      axios.defaults.headers.common['Authorization'] = 'Token ' + token
      axios.get(config.dev.apihost + '/api/accounts')
      .then(res => {
        vm.error = false
        vm.id = res.data.data[0].id
        vm.first_name = res.data.data[0].attributes.first_name
        vm.last_name = res.data.data[0].attributes.last_name
        vm.email = res.data.data[0].attributes.email
        console.log(res.data)
      })
      .catch(e => {
        vm.error = true
        // this.errors.push(e)
      })
    } else {
      vm.$router.push('/')
    }
  },
  methods: {
    logout (event) {
      event.preventDefault()
      let vm = this
      if (vm.$session.has('user')) {
        vm.$session.remove('user')
        vm.$router.push('/')
      }
    },
    update (event) {
      event.preventDefault()
      let vm = this
      let token = ''
      if (vm.$session.has('user')) {
        token = vm.$session.get('user').token

        axios.defaults.headers.common['Authorization'] = 'Token ' + token
        axios.patch(config.dev.apihost + '/api/accounts/' + vm.id, qs.stringify({
          first_name: vm.first_name,
          last_name: vm.last_name,
          email: vm.email
        }))
        .then(res => {
          // window.reload()
          vm.error = false
          vm.success = true
        })
        .catch(e => {
          vm.error = true
          vm.success = false
          // this.errors.push(e)
        })
      }
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
