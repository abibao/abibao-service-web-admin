<dashboard>

  <div>
    <ul id="slide-out" class="side-nav fixed ui-color-dark-blue">
      <li class="ui-color-white valign-wrapper ui-padding-1">
        <img class="valign" src="/img/abibao-logo-gris-jaune.png">
      </li>
      <li><a onclick={ logout } class="ui-color-white" href="#"><i class="material-icons right ui-color-white-text">cloud</i>Se déconnecter</a></li>
      <li><a class="ui-color-white-text bold active" href="#dashboard"><i class="material-icons right ui-color-white-text">cloud</i>Dashboard</a></li>
      <li><a class="ui-color-white-text" href="#"><i class="material-icons right ui-color-white-text">cloud</i>Compagnies</a></li>
      <li><a class="ui-color-white-text" href="#"><i class="material-icons right ui-color-white-text">cloud</i>Associations</a></li>
      <li><a class="ui-color-white-text" href="#"><i class="material-icons right ui-color-white-text">cloud</i>Campagnes</a></li>
      <li><a class="ui-color-white-text" href="#"><i class="material-icons right ui-color-white-text">cloud</i>Statistiques</a></li>
      <li><a class="ui-color-white-text" href="#"><i class="material-icons right ui-color-white-text">cloud</i>Batchs</a></li>
    </ul>
  </div>

  <div id="container" class="ui-color-white ui-height-1-1">
    <header class="row">
      <div class="col s12"><h5>Administrator</h5></div>
      <div class="col s12"><h6>Dashboard</h6></div>
    </header>
    <main class="row">
      <div class="col s12 m6" if={ charities !== false }>
        <ul class="collection">
          <li class="collection-item avatar">
            <i class="material-icons circle ui-color-light-blue">assessment</i>
            <span class="title">Associations</span>
            <p>{ charities.total } au total<br><a href="#campaigns">Sélectionnez</a></p>
          </li>
        </ul>
      </div>
      <div class="col s12 m6" if={ companies !== false }>
        <ul class="collection">
          <li class="collection-item avatar">
            <i class="material-icons circle ui-color-light-blue">explicit</i>
            <span class="title">Compagnies</span>
            <p>{ companies.total } au total<br><a href="#campaigns">Sélectionnez</a></p>
          </li>
        </ul>
      </div>
      <div class="col s12 m6" if={ campaigns !== false }>
        <ul class="collection">
          <li class="collection-item avatar">
            <i class="material-icons circle ui-color-light-blue">assessment</i>
            <span class="title">Campagnes</span>
            <p>{ campaigns.total } au total<br><a href="#campaigns">Sélectionnez</a></p>
          </li>
        </ul>
      </div>
    </main>
    <footer>
      <h3>...</h3>
    </footer>
  </div>

  <script>

  this.connected = false
  this.loading = true

  this.client = riot.feathers
  this.socket = riot.feathers.io

  this.campaigns = false
  this.companies = false
  this.charities = false

  this.socket.on('connect', () => {
    console.log(riot.routeState.view, 'socket() connected', this.socket.id)
    this.update()
    this.client.authenticate({
    }).then((response) => {
      return this.client.passport.verifyJWT(response.accessToken)
    }).then((payload) => {
      return this.client.service('users').get(payload.userId)
    }).then((user) => {
      this.client.set('user', user)
      return true
    }).then(() => {
      this.connected = true
      this.loading = false
      this.update()
      this.getCampaigns()
      this.getCompanies()
      this.getCharities()
    }).catch((error) => {
      console.error(riot.routeState.view, 'client.authenticate()', error)
    })
  })

  this.socket.on('disconnect', () => {
    console.log(riot.routeState.view, 'socket() disconnect')
    this.connected = false
    this.loading = false
    this.update()
  })

  this.on('mount', () => {
    console.log(riot.routeState.view, 'mount', this.socket.id)
    if (this.socket.id) {
      this.getCampaigns()
      this.getCompanies()
      this.getCharities()
    }
  })

  this.on('updated', () => {
    console.log(riot.routeState.view, 'updated')
  })

  this.logout = (e) => {
    console.log(riot.routeState.view, 'logout()')
    this.client.logout()
    riot.route('login')
  }

  this.getCompanies = () => {
    this.companies = false
    this.client.service('api/entities').find({query: {type: 'company'}}).then((result) => {
      console.log(riot.routeState.view, 'getCompanies()', result)
      this.companies = {
        total: result.total
      }
      this.update()
    }).catch(console.error)
  }

  this.getCharities = () => {
    this.charities = false
    this.client.service('api/entities').find({query: {type: 'charity'}}).then((result) => {
      console.log(riot.routeState.view, 'getCharities()', result)
      this.charities = {
        total: result.total
      }
      this.update()
    }).catch(console.error)
  }

  this.getCampaigns = () => {
    this.campaigns = false
    this.client.service('api/campaigns').find().then((result) => {
      console.log(riot.routeState.view, 'getCampaigns()', result)
      this.campaigns = {
        total: result.total
      }
      this.update()
    }).catch(console.error)
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
    @media only screen and (max-width : 992px) {
      #container {
        padding-left: 0;
      }
    }
  </style>

</dashboard>
