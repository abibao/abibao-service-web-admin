<login>

  <form if={ connected } class="pure-form pure-form-aligned">
    <fieldset>
      <div class="pure-controls">
        <img src="img/abibao-logo-gris-jaune.png">
      </div>
      <div class="pure-control-group">
        <label for="email">Email</label>
        <input id="email" type="text" placeholder="Saisissez votre email">
      </div>
      <div class="pure-control-group">
        <label for="password">Mot de passe</label>
        <input id="password" type="password" placeholder="Saisissez votre mot de passe">
      </div>
      <div class="pure-controls">
        <button onclick={ login } type="submit" class="button-secondary pure-button">Submit</button>
      </div>
    </fieldset>
  </form>

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
  </style>

</login>
