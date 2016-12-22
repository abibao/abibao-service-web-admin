<dashboard>

  <!-- Menu toggle -->
  <a href="#menu" id="menuLink" class="menu-link">
    <!-- Hamburger icon -->
    <span></span>
  </a>

  <div id="menu">
    <div class="pure-menu">
      <a class="pure-menu-heading" href="#">Company</a>
      <ul class="pure-menu-list">
        <li class="pure-menu-item"><a href="#" class="pure-menu-link">Home</a></li>
        <li class="pure-menu-item"><a href="#" class="pure-menu-link">About</a></li>
        <li class="pure-menu-item" class="menu-item-divided pure-menu-selected"><a href="#" class="pure-menu-link">Services</a></li>
        <li class="pure-menu-item"><a href="#" class="pure-menu-link">Contact</a></li>
      </ul>
    </div>
  </div>

  <div id="main">
  </div>

  <!--
  <ui-menu></ui-menu>
  <div id="container" class="ui-color-white ui-height-1-1">
    <header class="row">
      <div class="col s12"><h5>Administrator</h5></div>
      <div class="col s12"><h6>Dashboard</h6></div>
    </header>
    <main>
      <div class="row">
        <div class="col s12">
          <h4>Vue générale du projet Abibao</h4>
        </div>
      </div>
      <div class="row">
        <div class="col s12 m6" if={ services.charities !== false }>
          <ul class="collection">
            <li class="collection-item avatar">
              <i class="material-icons circle ui-color-light-blue">info_outline</i>
              <span class="title"><a href="#entities">Associations</a></span>
              <p>{ services.charities.total } au total</p>
            </li>
          </ul>
        </div>
        <div class="col s12 m6" if={ services.companies !== false }>
          <ul class="collection">
            <li class="collection-item avatar">
              <i class="material-icons circle ui-color-light-blue">info_outline</i>
              <span class="title"><a href="#companies">Companies</a></span>
              <p>{ services.companies.total } au total</p>
            </li>
          </ul>
        </div>
        <div class="col s12 m6" if={ services.campaigns !== false }>
          <ul class="collection">
            <li class="collection-item avatar">
              <i class="material-icons circle ui-color-light-blue">info_outline</i>
              <span class="title"><a href="#campaigns">Campagnes</a></span>
              <p>{ services.campaigns.total } au total</p>
            </li>
          </ul>
        </div>
      </div>
    </main>
    <footer>
    </footer>
  </div>
  -->

  <script>
    import init from './js/default'
    init(this)
  </script>

  <style scoped>
    #container {
      padding: 0;
      padding-left: 300px;
      padding-top: 1px;
    }
    #slide-out {
      width: 250px;
    }
    header, main, footer {
      margin: 10px;
    }
    main {
      padding-top: 20px;
    }
    @media only screen and (max-width : 992px) {
      #container {
        padding-left: 0;
      }
    }
  </style>

</dashboard>
