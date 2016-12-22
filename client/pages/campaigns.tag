<campaigns>

  <ui-menu></ui-menu>

  <div id="container" class="ui-color-white ui-height-1-1">
    <header class="row">
      <div class="col s12"><h5>Administrator</h5></div>
      <div class="col s12"><h6>Campagnes</h6></div>
    </header>
    <main>
      <div class="row">
        <div class="col s12">
          <h4>Nombre total de campagnes : { services.campaigns.total }</h4>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <table class="bordered white">
            <thead>
              <tr>
                <th data-field="id">Id</th>
                <th data-field="id">Nom</th>
                <th data-field="id">Compagnie</th>
                <th data-field="name">Modifée le</th>
                <th data-field="price">Créée le</th>
              </tr>
            </thead>
            <tbody>
              <tr each={ campaign in services.campaigns.data }>
                <td><span class="truncate">{ campaign.id }</span></td>
                <td>{ campaign.name }</td>
                <td>{ campaign.company }</td>
                <td>{ formatDate(campaign.updatedAt) }</td>
                <td>{ formatDate(campaign.createdAt) }</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
    <footer>
    </footer>
  </div>


  <script>
    import init from './js/default'
    init(this)

    this.formatDate = (value) => {
      const date = new Date(value)
      return date
    }

  </script>

  <style scoped>
    #container {
      padding: 0;
      padding-left: 300px;
      padding-top: 1px;
    }
    #slide-out {
      width: 250px;
    }
    header, main, footer {
      margin: 10px;
    }
    main {
      padding-top: 20px;
    }
    @media only screen and (max-width : 992px) {
      #container {
        padding-left: 0;
      }
    }
  </style>

</campaigns>
