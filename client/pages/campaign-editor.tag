<campaign-editor>

  <!--<select class="pure-u-1" disabled>
    <option if={ item.type !== 'ABIBAO_COMPONENT_YES_NO' } value="ABIBAO_COMPONENT_YES_NO">ABIBAO_COMPONENT_YES_NO</option>
    <option if={ item.type !== 'ABIBAO_COMPONENT_STATEMENT' } value="ABIBAO_COMPONENT_STATEMENT">ABIBAO_COMPONENT_STATEMENT</option>
    <option if={ item.type !== 'ABIBAO_COMPONENT_SHORT_TEXT' } value="ABIBAO_COMPONENT_SHORT_TEXT">ABIBAO_COMPONENT_SHORT_TEXT</option>
    <option if={ item.type !== 'ABIBAO_COMPONENT_NUMBER' } value="ABIBAO_COMPONENT_NUMBER">ABIBAO_COMPONENT_NUMBER</option>
    <option if={ item.type !== 'ABIBAO_COMPONENT_MULTIPLE_CHOICE' } value="ABIBAO_COMPONENT_MULTIPLE_CHOICE">ABIBAO_COMPONENT_MULTIPLE_CHOICE</option>
    <option if={ item.type !== 'ABIBAO_COMPONENT_LONG_TEXT' } value="ABIBAO_COMPONENT_LONG_TEXT">ABIBAO_COMPONENT_LONG_TEXT</option>
    <option if={ item.type !== 'ABIBAO_COMPONENT_DROPDOWN' } value="ABIBAO_COMPONENT_DROPDOWN">ABIBAO_COMPONENT_DROPDOWN</option>
  </select>-->

  <ui-menu></ui-menu>

  <div class="header">
    <h1>Campagnes</h1>
    <h2>Edition d'une campagne</h2>
  </div>

  <div if={ campaign } class="content">
    <h2 class="content-subhead">Liste des questions</h2>
    <div id="item-list" class="pure-g pure-u-1">
      <div class="pure-form pure-form-stacked pure-u-1">
        <input class="search pure-u-1" placeholder="Filtre">
      </div>
      <div class="list">
        <div
          data-question={ item.question }
          data-type={ item.type }
          data-position={ item.position }
          each={ item in campaign.items }
          class="pure-u-1 ui-row">
          <div class="ui-col-left">
            <button class="button-square button-secondary pure-button"><i class="fa fa-pencil" aria-hidden="true"></i></button>
          </div>
          <div class="ui-col-left">
            <b>{ truncate(item.question) || 'Pas de question ?' }</b><br />
            Question n°{ item.position }
          </div>
          <div class="ui-col-right">
            <button class="button-square button-error pure-button"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer">
  </div>

  <script>

    this.id = 'campaign-editor::' + new Date().getTime()
    this.services = false
    this.campaign = false

    feathers.client.io.on('connect', () => {
      if (!this.opts.page) {
        return false
      }
      console.log(this.id, 'io connected', feathers.client.io.id)
      this.services = feathers.services
      this.services.initialize()
      this.services.on('campaign-loaded', (campaign) => {
        console.log(this.id, 'campaign-loaded')
        this.campaign = campaign
        this.update()
      })
    })

    this.on('updated', () => {
      if (!this.opts.dataIs) {
        return false
      }
      console.log(this.id, 'riot', 'updated')
      const _list = document.getElementsByClassName('list')
      if (_list.length === 1) {
        this.itemListInitialize()
      }
    })

    this.itemListInitialize = () => {
      console.log(this.id, 'itemListInitialize')
      let options = {
        valueNames: [
          {data: ['position', 'question', 'type']}
        ]
      }
      let itemList = new List('item-list', options)
      itemList.sort('position', { order: 'asc' })
    }

    this.truncate = (value) => {
      let maxLength = 30
      if (value.length <= maxLength - 3) {
        return value
      } else {
        return value.substr(0, maxLength - 3) + '...'
      }
    }

  </script>

  <style scoped>
  </style>

</campaign-editor>
