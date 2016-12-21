<login>

  <div if={ !connected } class="ui-color-dark-blue ui-width-1-1 ui-height-1-1">
    <div class="container ui-height-1-1 ">
      <div class="row valign-wrapper ui-height-1-1">
        <div class="card white ui-width-1-1 valign col s12 m6 offset-m3 l4 offset-l4">
          <div class="card-content ui-color-dark-blue-text">
            <span class="card-title">
              <img src="/img/abibao-logo-gris-jaune.png">
            </span>
            <div class="row">
              <div class="col s12">
                <h5>Connexion en cours...</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div if={ connected } class="ui-color-dark-blue ui-width-1-1 ui-height-1-1">
    <div class="container ui-height-1-1 ">
      <div class="row valign-wrapper ui-height-1-1">
        <div class="card white ui-width-1-1 valign col s12 m6 offset-m3 l4 offset-l4">
          <div class="card-content ui-color-dark-blue-text">
            <span class="card-title">
              <img src="/img/abibao-logo-gris-jaune.png">
            </span>
            <div class="row">
              <form class="col s12">
                <div class="row">
                  <div class="input-field col s12">
                    <input id="email" type="email" placeholder="Votre email" class="validate">
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <input id="password" type="password" placeholder="Votre mot de passe" class="validate">
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="card-action center-align">
            <a if={ !loading } onclick={ login } class="btn-flat ui-color-orange white-text">Se connecter</a>
            <a if={ loading } class="btn-flat disabled">Se connecter</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>

    this.connected = false
    this.loading = true

    this.client = riot.feathers
    this.socket = riot.feathers.io

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
        // redirect to dashboard
        riot.route('dashboard')
      }).catch((error) => {
        console.error(riot.routeState.view, 'client.authenticate()', error)
        this.connected = true
        this.loading = false
        this.update()
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
        this.connected = true
        this.loading = false
        this.update()
      }
    })

    this.on('updated', () => {
      console.log(riot.routeState.view, 'updated')
    })

    this.login = (e) => {
      console.log(riot.routeState.view, 'login()')
      this.loading = true
      this.update()
      this.client.authenticate({
        strategy: 'local',
        email: email.value,
        password: password.value
      }).then((response) => {
        return this.client.passport.verifyJWT(response.accessToken)
      }).then((payload) => {
        return this.client.service('users').get(payload.userId)
      }).then((user) => {
        this.client.set('user', user)
        // redirect to dashboard
        riot.route('dashboard')
      }).catch((error) => {
        this.loading = false
        this.update()
        console.error(riot.routeState.view, 'client.authenticate()', error)
      })
    }

  </script>

  <style scoped>
    .row {
      margin-bottom: 0!important;
    }
  </style>

</login>
