/*global riot*/

const init = (self, tagname) => {
  self.id = tagname + '::' + new Date().getTime()
  self.charities = false
  self.companies = false
  self.campaigns = false
  self.campaigns_items = false
  self.campaigns_items_choices = false

  // tag events
  self.on('*', (event) => {
    if (!self.opts.page) {
      return false
    }
    console.log(self.id, event)
    switch (event) {
      case 'mount':
        // feathers is started or not ?
        if (!riot.feathers.client()) {
          riot.feathers.initialize()
        } else {
          if (riot.feathers.client().io.connected) {
            riot.feathers.trigger('feathers-client-connected')
          }
          if (riot.feathers.client().io.disconnected) {
            riot.feathers.trigger('feathers-client-disconnected')
          }
        }
        break
      case 'unmount':
        // feathers is started or not ?

        break
      default:
        break
    }
  })

  // feathers events
  riot.feathers.on('*', (event) => {
    if (!self.opts.page || self.opts.params[0] !== '/' + tagname + '/') {
      return false
    }
    console.log(self.id, event)
    switch (event) {
      case 'feathers-client-disconnected':
        self.charities = false
        self.companies = false
        self.campaigns = false
        self.campaigns_items = false
        self.campaigns_items_choices = false
        self.update()
        break
      case 'feathers-client-connected':
        riot.feathers.service('api/entities').find({query: {type: 'company'}}).then((result) => {
          console.log(self.id, 'companies loaded')
          self.companies = result
          self.update()
        })
        riot.feathers.service('api/entities').find({query: {type: 'charity'}}).then((result) => {
          console.log(self.id, 'charities loaded')
          self.charities = result
          self.update()
        })
        riot.feathers.service('api/campaigns').find().then((result) => {
          console.log(self.id, 'campaigns loaded')
          self.campaigns = result
          self.update()
        })
        riot.feathers.service('api/campaigns-items').find().then((result) => {
          console.log(self.id, 'campaigns-items loaded')
          self.campaigns_items = result
          self.update()
        })
        riot.feathers.service('api/campaigns-items-choices').find().then((result) => {
          console.log(self.id, 'campaigns-items-choices loaded')
          self.campaigns_items_choices = result
          self.update()
        })
        break
      default:
        break
    }
  })
}

export default init
