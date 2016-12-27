/*global riot*/

class Services {
  constructor (client) {
    this.client = client
    this.campaigns = false
    this.campaigns_items = false
    this.campaigns_items_choices = false
    this.companies = false
    this.charities = false
  }
  initialize () {
    this.findCampaigns()
    this.findCampaignsItems()
    this.findCampaignsItemsChoices()
    this.findCompanies()
    this.findCharities()
  }
  getCampaign (id) {
    this.campaign = false
    riot.update()
    this.client.service('api/campaigns').get(id).then((result) => {
      console.log('getCampaign()', result)
      this.campaign = result
      riot.update()
    }).catch((error) => {
      console.error(error)
      riot.update()
    })
  }
  findCampaigns () {
    this.campaigns = false
    riot.update()
    this.client.service('api/campaigns').find().then((result) => {
      // console.log('findCampaigns()', result)
      this.campaigns = result
      riot.update()
    }).catch((error) => {
      console.error(error)
      riot.update()
    })
  }
  findCampaignsItems () {
    this.campaigns_items = false
    riot.update()
    this.client.service('api/campaigns-items').find().then((result) => {
      // console.log('findCampaignsItems()', result)
      this.campaigns_items = result
      riot.update()
    }).catch((error) => {
      console.error(error)
      riot.update()
    })
  }
  findCampaignsItemsChoices () {
    this.campaigns_items_choices = false
    riot.update()
    this.client.service('api/campaigns-items-choices').find().then((result) => {
      // console.log('findCampaignsItemsChoices()', result)
      this.campaigns_items_choices = result
      riot.update()
    }).catch((error) => {
      console.error(error)
      riot.update()
    })
  }
  findCompanies () {
    this.companies = false
    riot.update()
    this.client.service('api/entities').find({query: {type: 'company'}}).then((result) => {
      // console.log('findCompanies()', result)
      this.companies = result
      riot.update()
    }).catch((error) => {
      console.error(error)
      riot.update()
    })
  }
  findCharities () {
    this.charities = false
    riot.update()
    this.client.service('api/entities').find({query: {type: 'charity'}}).then((result) => {
      // console.log('findCharities()', result)
      this.charities = result
      riot.update()
    }).catch((error) => {
      console.error(error)
      riot.update()
    })
  }
  createCampaigns (data) {
    this.client.service('api/campaigns').create(data).then((result) => {
      // console.log('createCampaigns()', result)
      this.findCampaigns()
    }).catch((error) => {
      console.error(error)
      riot.update()
    })
  }
}

export default Services
