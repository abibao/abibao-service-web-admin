<campaign-editor>

  <ui-menu></ui-menu>

  <div class="header">
    <h1>Campagnes</h1>
    <h2>Edition d'une campagne</h2>
  </div>

  <div class="footer">
  </div>

  <script>

    import config from './../config'
    config(this, 'campaign-editor')

    this.socket.on('connect', () => {
      if (this.opts.params) {
        console.log('time to load a campaign', this.opts.params.id)
        this.services.getCampaign(this.opts.params.id)
      }
    })

  </script>

</campaign-editor>
