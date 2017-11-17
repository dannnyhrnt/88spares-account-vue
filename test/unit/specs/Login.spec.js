jest.mock('axios', () => ({
  get: jest.fn()
}))

import { shallow } from 'vue-test-utils'
import Vue from 'vue'
import Login from '@/components/Login'

describe('Login.vue', () => {
  let cmp
  beforeEach(() => {
    cmp = shallow(Login)
    jest.resetModules()
    jest.clearAllMocks()
  })

  it('Calls axios.get', async () => {
    const result = await cmp.vm.login()
    expect(axios.get).toBeCalledWith('https://jsonplaceholder.typicode.com/posts?q=an')
  })
})
