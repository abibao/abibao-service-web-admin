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
        <a onclick={ login } class="button-secondary pure-button">Valider</a>
      </div>
    </fieldset>
  </form>

  <script>

    import config from './../config'
    config(this, 'login')

    this.login = (e) => {
      console.log('user try to login')
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
        this.opts.page.redirect('/dashboard')
      }).catch((error) => {
        console.error('user is not connected', error)
      })
    }

  </script>

  <style scoped>
  </style>

</login>
