<dashboard>

  <ui-menu></ui-menu>

  <div class="header">
    <h1>Dashboard</h1>
    <h2>Une vue d'ensemble de Abibao</h2>
  </div>

  <div if={ services.companies && services.charities } class="content ui-hero">
    <h2 class="content-subhead">Entitiés</h2>
    <p>Abibao compte <code>{ services.companies.total }</code> companies et <code>{ services.charities.total }</code> associations.</p>
  </div>

  <div if={ services.campaigns && services.campaigns_items && services.campaigns_items_choices } class="content ui-hero">
    <h2 class="content-subhead">Campagnes</h2>
    <p>Abibao représente <code>{ services.campaigns.total }</code> campagnes, pour <code>{ services.campaigns_items.total }</code> questions. Le tout représentant <code>{ services.campaigns_items_choices.total }</code> réponses possibles.</p>
  </div>

  <script>

    import config from './../config'
    config(this, 'dashboard')

  </script>

  <style scoped>
  </style>

</dashboard>
