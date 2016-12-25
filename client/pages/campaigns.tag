<campaigns>

  <ui-menu></ui-menu>

  <div class="pure-g">
    <div class="pure-u-1-1">
      <div class="header">
        <h1>Campagnes</h1>
        <h2>Gestion des campagnes dans Abibao</h2>
      </div>
    </div>
    <div class="pure-u-1-1">
      <div class="content">
        <h2 class="content-subhead">Accès rapide aux campagnes</h2>
        Campagne sélectionnée : <code>{ currentCampaign.name || 'Aucune' }</code>
        <p if={ !currentCampaign }>
          <button onclick={ this.createCampaign } class="button-secondary pure-button"><i class="fa fa-plus-square-o" aria-hidden="true"></i> Créer</button>
          <button class="button-secondary pure-button" disabled><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editer</button>
          <button class="button-error pure-button" disabled><i class="fa fa-trash-o" aria-hidden="true"></i> Supprimer</button>
        </p>
        <p if={ currentCampaign }>
          <button onclick={ this.createCampaign } class="button-secondary pure-button"><i class="fa fa-plus-square-o" aria-hidden="true"></i> Créer</button>
          <button onclick={ this.editCampaign } class="button-secondary pure-button"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editer</button>
          <button class="button-error pure-button"><i class="fa fa-trash-o" aria-hidden="true"></i> Supprimer</button>
        </p>
        <table class="pure-table pure-table-bordered">
          <thead>
            <tr>
              <th></th>
              <th>Nom</th>
              <th>Companie</th>
              <th>Modification</th>
              <th>Création</th>
            </tr>
          </thead>
          <tbody>
            <tr each={ campaign in services.campaigns.data }>
              <td>
                <input type="radio" name="selectedCampaign" onchange={ selectCampaign }>
              </td>
              <td>{ campaign.name }</td>
              <td>{ campaign.company.name }</td>
              <td>{ formatDate(campaign.updatedAt) }</td>
              <td>{ formatDate(campaign.createdAt) }</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <script>
    import init from './js/default'
    init(this)

    this.currentCampaign = false

    this.selectCampaign = (e) => {
      this.currentCampaign = e.item.campaign
      this.update()
    }

    this.createCampaign = (e) => {
      this.services.createCampaigns()
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
