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

    import init from './../default'
    init(this, 'dashboard')

  </script>

  <style scoped>
  </style>

</dashboard>
