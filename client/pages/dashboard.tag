<dashboard>

  <script>

    this.on('mount', () => {
      console.log(riot.routeState.view, 'on() mount')
      riot.feathers
        .authenticate()
        .catch((error) => {
          console.error('Error authenticating!', error)
          riot.route('login')
        })
    })

    this.on('updated', () => {
      console.log(riot.routeState.view, 'on() updated')
    })

  </script>

</dashboard>
