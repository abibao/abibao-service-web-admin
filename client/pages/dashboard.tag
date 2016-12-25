<dashboard>

  <ui-menu></ui-menu>

  <div class="pure-g">
    <div class="pure-u-1-1">
      <div class="header">
        <h1>Dashboard</h1>
        <h2>Une vue d'ensemble de Abibao</h2>
      </div>
    </div>
    <div if={ services.companies && services.charities } class="pure-u-1-1">
      <div class="content">
        <h2 class="content-subhead">Entitiés</h2>
        <p>Abibao compte { services.companies.total } companies et { services.charities.total } associations.</p>
      </div>
    </div>
    <div if={ services.campaigns && services.campaigns_items && services.campaigns_items_choices } class="pure-u-1-1">
      <div class="content">
        <h2 class="content-subhead">Campagnes</h2>
        <p>Abibao représente { services.campaigns.total } campagnes, pour { services.campaigns_items.total } questions. Le tout représentant { services.campaigns_items_choices.total } réponses possibles.</p>
      </div>
    </div>
  </div>

  <script>
    import init from './js/default'
    init(this)
  </script>

  <style scoped>
  </style>

</dashboard>
