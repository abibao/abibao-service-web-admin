<campaigns>

  <ui-menu></ui-menu>

  <div class="header">
    <h1>Campagnes</h1>
    <h2>Gestion des campagnes dans Abibao</h2>
  </div>

  <div if={ companies } class="content ui-hero">
    <h2 class="content-subhead">Création d'une campagne</h2>
    <div class="pure-form">
      <div class="pure-g">
        <div class="pure-u-1-1 m-box">
          <select id="dataCampaignCompany" class="pure-u-1-1">
            <option value={ company.id } each={ company in companies.data }>{ company.name }</option>
          </select>
        </div>
        <div class="pure-u-1-1 m-box">
          <input id="dataCampaignName" class="pure-u-1-1" type="text" placeholder="Saisissez le nom de la campagne" required>
        </div>
        <div class="pure-g m-box">
          <button onclick={ createCampaign } class="button-square button-secondary pure-button"><i class="fa fa-plus" aria-hidden="true"></i></button>
        </div>
      </div>
    </div>
  </div>

  <br><br>

  <div if={ campaigns } class="content">
    <h2 class="content-subhead">Liste des campaignes</h2>
    <div id="item-list" class="pure-g pure-u-1">
      <div class="pure-form pure-form-stacked pure-u-1">
        <input class="search pure-u-1" placeholder="Filtre">
      </div>
      <div class="list">
        <div
          data-name={ campaign.name }
          data-company={ campaign.company.name }
          data-position={ campaign.position }
          each={ campaign in campaigns.data }
          class="pure-u-1 ui-row">
          <div class="ui-col-left">
            <button onclick={ editCampaign } class="button-square button-secondary pure-button"><i class="fa fa-pencil" aria-hidden="true"></i></button>
          </div>
          <div class="ui-col-left">
            <b>{ truncate(campaign.name) || 'Pas de nom ?' }</b><br>
            { truncate(campaign.company.name) || 'Pas de nom ?' }
          </div>
          <div class="ui-col-right">
            <button onclick={ removeCampaign } class="button-square button-error pure-button"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer">
  </div>

  <script>

    import init from './../default'
    init(this, 'campaigns')

    /*
    this.on('updated', () => {
      if (!this.opts.page) {
        return false
      }
      console.log(this.id, 'override', 'updated', this.opts)
      let _list = document.getElementsByClassName('list')
      if (_list.length > 0 ) {
        console.log(this.id, 'document.getElementsByClassName', _list)
        let options = {
          valueNames: [
            {data: ['position', 'company', 'name']}
          ]
        }
        let itemList = new List('item-list', options)
        itemList.sort('company', { order: 'asc' })
      }
    })
    */
    /*
    feathers.client.io.on('connect', () => {
      if (!this.opts.page) {
        return false
      }
      console.log(this.id, 'io connected', feathers.client.io.id)
      this.services = feathers.services
      this.services.initialize()
      this.services.on('campaigns-loaded', () => {
        console.log(this.id, 'campaigns-loaded')
        this.campaigns = this.services.campaigns
        this.update()
      })
      this.services.on('companies-loaded', () => {
        console.log(this.id, 'companies-loaded')
        this.companies = this.services.companies
        this.update()
      })
      this.services.on('campaign-removed', () => {
        console.log(this.id, 'campaign-removed')
      })
      this.services.on('campaign-created', () => {
        console.log(this.id, 'campaign-created')
      })
    })

    this.on('updated', () => {
      console.log(this.id, 'riot', 'updated', this.opts)
      if (this.opts.dataIs) {
        return false
      }
      let _list = document.getElementsByClassName('list')
      console.log(this.id, 'document.getElementsByClassName', _list)
      if (_list.length > 0) {
        this.itemListInitialize()
      }
    })

    this.itemListInitialize = () => {
      console.log(this.id, 'itemListInitialize')
      let options = {
        valueNames: [
          {data: ['position', 'company', 'name']}
        ]
      }
      let itemList = new List('item-list', options)
      itemList.sort('company', { order: 'asc' })
    }

    this.editCampaign = (e) => {
      let currentCampaign = e.item.campaign
      this.opts.page.redirect('/campaigns/' + currentCampaign.id)
    }

    this.removeCampaign = (e) => {
      let currentCampaign = e.item.campaign
      this.services.removeCampaign(currentCampaign.id)
    }

    this.createCampaign = (e) => {
      this.services.createCampaign({
        name: dataCampaignName.value,
        company: dataCampaignCompany.value
      })
    } */

    this.truncate = (value) => {
      let maxLength = 30
      if (value.length <= maxLength - 3) {
        return value
      } else {
        return value.substr(0, maxLength - 3) + '...'
      }
    }

    this.formatDate = (value) => {
      const d = new Date(value)
      const datestring = ('0' + d.getDate()).slice(-2) + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + d.getFullYear()
      return datestring
    }

  </script>

  <style scoped>
  </style>

</campaigns>
