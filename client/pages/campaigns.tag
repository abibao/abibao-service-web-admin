<campaigns>

  <ui-menu></ui-menu>

  <div class="header">
    <h1>Campagnes</h1>
    <h2>Gestion des campagnes dans Abibao</h2>
  </div>

  <div class="content ui-hero">
    <h2 class="content-subhead">Création d'une campagne</h2>
    <form class="pure-form">
      <div class="pure-g">
        <div class="pure-u-1-1 m-box">
          <select id="dataCampaignCompany" class="pure-u-1-1">
            <option value={ company.id } each={ company in services.companies.data }>{ company.name }</option>
          </select>
        </div>
        <div class="pure-u-1-1 m-box">
          <input id="dataCampaignName" class="pure-u-1-1" type="text" placeholder="Saisissez le nom de la campagne" required>
        </div>
        <div class="pure-g m-box">
          <button onclick={ this.createCampaign } class="button-square button-secondary pure-button"><i class="fa fa-plus" aria-hidden="true"></i></button>
        </div>
      </div>
    </form>
  </div>

  <br><br>

  <div class="content">
    <h2 class="content-subhead">Liste des campaignes</h2>
    <div class="pure-g">
      <div each={ campaign in services.campaigns.data } class="pure-u-1-1 l-box ui-row">
        <div class="ui-col-left">
          <button onclick={ this.editCampaign } class="button-square button-secondary pure-button"><i class="fa fa-pencil" aria-hidden="true"></i></button>
        </div>
        <div class="ui-col-left">
          <b>{ truncate(campaign.name) || 'Pas de nom ?' }</b><br>
          { truncate(campaign.company.name) || 'Pas de nom ?' }
        </div>
        <div class="ui-col-right">
          <button class="button-square button-error pure-button"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
        </div>
      </div>
    </div>
  </div>

  <div class="footer">
  </div>

  <script>

    import config from './../config'
    config(this, 'campaigns')

    this.editCampaign = (e) => {
      let currentCampaign = e.item.campaign
      this.opts.page.redirect('/campaigns/' + currentCampaign.id)
      this.update()
    }

    this.createCampaign = (e) => {
      this.services.createCampaigns({
        name: dataCampaignName.value,
        company: dataCampaignCompany.value
      })
    }

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
