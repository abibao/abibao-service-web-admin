/*global riot*/

class Services {
  constructor (client) {
    this.client = client
    this.campaigns = false
    this.companies = false
    this.charities = false
  }
  getCampaigns () {
    this.campaigns = false
    riot.update()
    this.client.service('api/campaigns').find().then((result) => {
      console.log(riot.routeState.view, 'getCampaigns()', result)
      this.campaigns = result
      riot.update()
    }).catch((error) => {
      console.error(error)
      riot.update()
    })
  }
  getCompanies () {
    this.companies = false
    riot.update()
    this.client.service('api/entities').find({query: {type: 'company'}}).then((result) => {
      console.log(riot.routeState.view, 'getCompanies()', result)
      this.companies = result
      riot.update()
    }).catch((error) => {
      console.error(error)
      riot.update()
    })
  }
  getCharities () {
    this.charities = false
    riot.update()
    this.client.service('api/entities').find({query: {type: 'charity'}}).then((result) => {
      console.log(riot.routeState.view, 'getCharities()', result)
      this.charities = result
      riot.update()
    }).catch((error) => {
      console.error(error)
      riot.update()
    })
  }
}

export default Services
