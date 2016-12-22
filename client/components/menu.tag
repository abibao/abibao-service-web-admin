<ui-menu>

  <!-- Menu toggle -->
  <a href="#menu" id="menuLink" class="menu-link">
    <!-- Hamburger icon -->
    <span></span>
  </a>

  <div id="menu">
    <div class="pure-menu">
      <a class="pure-menu-heading" href="#"><img class="valign" src="/img/abibao-logo-gris-jaune.png"></a>
      <ul class="pure-menu-list">
        <li class="pure-menu-item"><a href="#" class="pure-menu-link">Home</a></li>
        <li class="pure-menu-item"><a href="#" class="pure-menu-link">About</a></li>
        <li class="pure-menu-item" class="menu-item-divided pure-menu-selected"><a href="#" class="pure-menu-link">Services</a></li>
        <li class="pure-menu-item"><a href="#" class="pure-menu-link">Contact</a></li>
      </ul>
    </div>
  </div>

  <!--
  <div>
    <ul id="slide-out" class="side-nav fixed ui-color-dark-blue">
      <li class="ui-color-white valign-wrapper ui-padding-1">
        <img class="valign" src="/img/abibao-logo-gris-jaune.png">
      </li>
      <li><a onclick={ logout } class="ui-color-white" href="#"><i class="material-icons right ui-color-white-text">cloud</i>Se déconnecter</a></li>
      <li><a class="waves-effect ui-color-white-text" onclick={ goDashboard } href="#dashboard"><i class="material-icons right ui-color-white-text">cloud</i>Dashboard</a></li>
      <li><a class="waves-effect ui-color-white-text" href="#"><i class="material-icons right ui-color-white-text">cloud</i>Compagnies</a></li>
      <li><a class="waves-effect ui-color-white-text" href="#"><i class="material-icons right ui-color-white-text">cloud</i>Associations</a></li>
      <li><a class="waves-effect ui-color-white-text" onclick={ goCampaigns } href="#campaigns"><i class="material-icons right ui-color-white-text">cloud</i>Campagnes</a></li>
      <li><a class="waves-effect ui-color-white-text" href="#"><i class="material-icons right ui-color-white-text">cloud</i>Statistiques</a></li>
      <li><a class="waves-effect ui-color-white-text" href="#"><i class="material-icons right ui-color-white-text">cloud</i>Batchs</a></li>
    </ul>
  </div>
  -->

  <script>

    this.client = riot.feathers

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

</ui-menu>
