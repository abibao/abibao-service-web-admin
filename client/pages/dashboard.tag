<dashboard>

  <script>

    this.on('mount', () => {
      riot.feathers
        .authenticate()
        .catch((error) => {
          console.error('Error authenticating!', error)
          riot.route('login')
        })
    })

  </script>

</dashboard>
