/*global riot toastr*/

import Client from './feathers/client'

class Feathers {
  constructor () {
    riot.observable(this)
    this.id = 'feathers::' + new Date().getTime()
    console.log(this.id, 'constructor')
    this._client = false
    this.toastr = toastr
    this.toastr.options = {
      'closeButton': false,
      'debug': false,
      'newestOnTop': false,
      'progressBar': true,
      'positionClass': 'toast-top-center',
      'preventDuplicates': true,
      'onclick': null,
      'showDuration': '300',
      'hideDuration': '1000',
      'timeOut': '5000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    }
  }
  initialize () {
    console.log(this.id, 'initialize')
    this._client = new Client()
    this._client.on('client-connected', () => {
      console.log(this.id, 'client is connected')
      this.toastr['success']('Le serveur est connecté.')
      this.trigger('feathers-client-connected')
    })
    this._client.on('client-disconnected', () => {
      console.log(this.id, 'client is disconnected')
      this.toastr['error']('Le serveur ne répond pas.')
      this.trigger('feathers-client-disconnected')
    })
  }
  client () {
    return this._client._instance
  }
  service (name) {
    return this.client().service(name)
  }
}

export default Feathers
