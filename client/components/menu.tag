<ui-menu>

  <div id="layout">
    <!-- Menu toggle -->
    <a href="#menu" id="menuLink" class="menu-link" onclick={ toggleAll }>
      <!-- Hamburger icon -->
      <span></span>
    </a>
    <div id="menu">
      <div class="pure-menu">
        <ul class="pure-menu-list">
          <li class="pure-menu-heading">Backoffice</li>
          <li class="pure-menu-item"><a href="#" class="pure-menu-link pure-menu-disabled">Compagnies</a></li>
          <li class="pure-menu-item"><a href="#" class="pure-menu-link pure-menu-disabled">Associations</a></li>
          <li class="pure-menu-item"><a onclick={ goCampaigns } href="#campaigns" class="pure-menu-link">Campagnes</a></li>
          <li class="pure-menu-heading">Statistiques</li>
          <li class="pure-menu-item"><a onclick={ goDashboard } href="#dashboard" class="pure-menu-link">Dashboard</a></li>
          <li class="pure-menu-item"><a href="#" class="pure-menu-link pure-menu-disabled">KPI</a></li>
          <li class="pure-menu-item"><a href="#" class="pure-menu-link pure-menu-disabled">Batchs</a></li>
          <li class="pure-menu-item"><a onclick={ logout } href="#login" class="pure-menu-link">Se déconnecter</a></li>
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
      console.log(riot.routeState.view, 'logout()')
      this.client.logout()
      riot.route('login')
    }

    this.goDashboard = (e) => {
      riot.route('dashboard')
    }

    this.goCampaigns = (e) => {
      riot.route('campaigns')
    }

  </script>

  <style scoped>
  </style>

</ui-menu>
