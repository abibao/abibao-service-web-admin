<ui-menu>

  <div id="layout">
    <button id="menuLink" onclick={ toggleAll } class="button-square button-menu pure-button menu-link"><i class="fa fa-bars" aria-hidden="true"></i></button>
    <div id="menu">
      <div class="pure-menu">
        <ul class="pure-menu-list">
          <li class="pure-menu-heading">Backoffice</li>
          <li class="pure-menu-item"><a href="#" class="pure-menu-link pure-menu-disabled">Compagnies</a></li>
          <li class="pure-menu-item"><a href="#" class="pure-menu-link pure-menu-disabled">Associations</a></li>
          <li class="pure-menu-item"><a href="/campaigns" class="pure-menu-link">Campagnes</a></li>
          <li class="pure-menu-heading">Statistiques</li>
          <li class="pure-menu-item"><a href="/dashboard" class="pure-menu-link">Dashboard</a></li>
          <li class="pure-menu-item"><a href="#" class="pure-menu-link pure-menu-disabled">KPI</a></li>
          <li class="pure-menu-item"><a href="#" class="pure-menu-link pure-menu-disabled">Batchs</a></li>
          <li class="pure-menu-item"><a onclick={ logout } href="#" class="pure-menu-link">Se déconnecter</a></li>
        </ul>
      </div>
    </div>
  </div>

  <script>

    this.client = riot.feathers

    this.toggleAll = (e) => {
      const layout = document.getElementById('layout')
      const menu = document.getElementById('menu')
      const menuLink = document.getElementById('menuLink')
      let active = 'active'
      e.preventDefault()
      this.toggleClass(layout, active)
      this.toggleClass(menu, active)
      this.toggleClass(menuLink, active)
    }

    this.toggleClass = (element, className) => {
      let classes = element.className.split(/\s+/)
      let length = classes.length
      let i = 0
      for(; i < length; i++) {
        if (classes[i] === className) {
          classes.splice(i, 1)
          break
        }
      }
      // The className is not found
      if (length === classes.length) {
        classes.push(className);
      }
      element.className = classes.join(' ')
    }

    this.logout = (e) => {
      console.log('client try to logout')
      this.client.logout()
      window.location = '/login'
    }

  </script>

  <style scoped>
  </style>

</ui-menu>
