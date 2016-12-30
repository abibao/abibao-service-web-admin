<dashboard>

  <ui-menu></ui-menu>

  <div class="header">
    <h1>Dashboard</h1>
    <h2>Une vue d'ensemble de Abibao</h2>
  </div>

  <div class="content ui-hero">
    <h2 class="content-subhead">Entitiés</h2>
    <p if={ !companies || !charities }>Attente de connexion...</p>
    <p if={ companies && charities }>Abibao compte <code>{ companies.total }</code> companies et <code>{ charities.total }</code> associations.</p>
  </div>

  <div class="content ui-hero">
    <h2 class="content-subhead">Campagnes</h2>
    <p if={ !campaigns || !campaigns_items || !campaigns_items_choices }>Attente de connexion...</p>
    <p if={ campaigns && campaigns_items && campaigns_items_choices }>Abibao représente <code>{ campaigns.total }</code> campagnes, pour <code>{ campaigns_items.total }</code> questions. Le tout représentant <code>{ campaigns_items_choices.total }</code> réponses possibles.</p>
  </div>

  <script>

    this.id = 'dashboard::' + new Date().getTime()
    this.charities = false
    this.companies = false
    this.campaigns = false
    this.campaigns_items = false
    this.campaigns_items_choices = false

    // tag events
    this.on('*', (event) => {
      if (!this.opts.page) {
        return false
      }
      console.log(this.id, event)
      switch(event) {
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
          break;
        default:
          break;
      }
    })

    // feathers events
    riot.feathers.on('*', (event) => {
      if (!this.opts.page) {
        return false
      }
      console.log(this.id, event)
      switch(event) {
        case 'feathers-client-disconnected':
          this.charities = false
          this.companies = false
          this.campaigns = false
          this.campaigns_items = false
          this.campaigns_items_choices = false
          this.update()
          break;
        case 'feathers-client-connected':
          riot.feathers.service('api/entities').find({query: {type: 'company'}}).then((result) => {
            console.log(this.id, 'companies loaded')
            this.companies = result
            this.update()
          })
          riot.feathers.service('api/entities').find({query: {type: 'charity'}}).then((result) => {
            console.log(this.id, 'charities loaded')
            this.charities = result
            this.update()
          })
          riot.feathers.service('api/campaigns').find().then((result) => {
            console.log(this.id, 'campaigns loaded')
            this.campaigns = result
            this.update()
          })
          riot.feathers.service('api/campaigns-items').find().then((result) => {
            console.log(this.id, 'campaigns-items loaded')
            this.campaigns_items = result
            this.update()
          })
          riot.feathers.service('api/campaigns-items-choices').find().then((result) => {
            console.log(this.id, 'campaigns-items-choices loaded')
            this.campaigns_items_choices = result
            this.update()
          })
          break;
          default:
            break;
        }
    })

  </script>

  <style scoped>
  </style>

</dashboard>
