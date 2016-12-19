<login>

  <div class="ui-color-dark-blue ui-width-1-1 ui-height-1-1">
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
          <div class="card-action center-align" if={ connected }>
            <a onclick={ login } class="btn ui-color-orange">Se connecter</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>

    this.connected = false

    // when view mount then
    // -- wainting for socket io to be connected
    // ---- then try to authenticate from feathers
    this.on('mount', () => {
      console.log('mount', riot.routeState.view)
      riot.feathers.io.on('connect', () => {
        console.log('socket connected')
        this.connected = true
        this.update()
        riot.feathers.authenticate().catch((error) => {
          console.error('authenticate', error)
        })
      })
    })

    this.on('updated', () => {
      console.log('updated', riot.routeState.view)
    })

    this.login = (e) => {
      /* console.log('login')
      riot.feathers.authenticate({
        type: 'local',
        'email': email.value,
        'password': password.value
      }).catch((error) => {
        console.error('authenticate', error)
      }) */
    }

  </script>

  <style scoped>
    .row {
      margin-bottom: 0!important;
    }
  </style>

</login>
