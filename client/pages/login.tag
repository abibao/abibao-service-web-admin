<login>

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
            <a if={ connected && !loading } onclick={ login } class="btn-flat ui-color-orange white-text">Se connecter</a>
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

    this.socket.on('message', (message) => {
      console.log(riot.routeState.view, messsage)
    })

    this.socket.on('connect', () => {
      console.log(riot.routeState.view, 'socket() connected', this.socket.id)
      this.connected = true
      this.update()
      this.socket.emit('message', 'Vous êtes bien connecté !')
      this.client.authenticate({
      }).then((result) => {
        this.loading = false
        this.update()
        console.log(riot.routeState.view, 'feathers.authenticate()', result)
      }).catch((error) => {
        this.loading = false
        this.update()
        console.error(riot.routeState.view, 'feathers.authenticate() error', error)
      })
    })

    this.on('mount', () => {
      console.log(riot.routeState.view, 'on() mount')
    })

    this.on('updated', () => {
      console.log(riot.routeState.view, 'on() updated')
    })

    this.login = (e) => {
      console.log(riot.routeState.view, 'on() login()')
      this.loading = true
      this.update()
      this.client.authenticate({
        strategy: 'local',
        email: email.value,
        password: password.value
      }).then((response) => {
        console.log('client.authenticate()', response)
        return this.client.passport.verifyJWT(response.accessToken)
      }).then((payload) => {
        console.log('jwt', payload)
        return this.client.service('users').get(payload.userId)
      }).then((user) => {
        this.client.set('user', user)
        console.log('user', this.client.get('user'))
        this.loading = false
        this.update()
      }).catch((error) => {
        this.loading = false
        this.update()
        console.error(riot.routeState.view, 'feathers.authenticate() error', error)
      })
    }

  </script>

  <style scoped>
    .row {
      margin-bottom: 0!important;
    }
  </style>

</login>
