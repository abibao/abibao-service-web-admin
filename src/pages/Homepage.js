import React from 'react'
import Reflux from 'reflux'

// import {Link} from 'react-router'

import { grey300, orange800, lightGreen300, lightGreen400, teal300, teal400, white } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import AppBar from 'material-ui/AppBar'
import {Bar} from 'react-chartjs-2'

const data = {
  labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  datasets: [{
    label: '2016',
    backgroundColor: teal300,
    borderColor: teal400,
    borderWidth: 2,
    hoverBackgroundColor: teal300,
    hoverBorderColor: teal400,
    data: [0, 0, 0, 0, 197, 650, 400, 44, 30, 31, 178, 1414]
  }, {
    label: '2017',
    backgroundColor: lightGreen300,
    borderColor: lightGreen400,
    borderWidth: 2,
    hoverBackgroundColor: lightGreen300,
    hoverBorderColor: lightGreen400,
    data: [1737, 127, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }]
}

const styles = {
  container: {
    display: 'flex',
    background: grey300,
    width: '100%',
    height: '100%'
  },
  box: {
    background: grey300,
    width: '100%'
  },
  content: {
    background: grey300,
    padding: '2rem',
    margin: 'auto',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap'
  },
  flexbox: {
    margin: '1rem',
    width: '100%',
    height: '350px'
  },
  appbar: {
    background: white
  },
  appbarTitle: {
    color: orange800
  },
  appbarIconLeft: {
    backgroundColor: grey300,
    borderRadius: '50%'
  }
}

class Homepage extends Reflux.Component {
  componentDidMount () {
  }

  componentWillUnmount () {
  }

  componentDidUpdate (prevProps, prevState) {
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const Logged = (props) => (
      <IconMenu
        {...props}
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
        <MenuItem primaryText="Mon profil" />
        <MenuItem primaryText="Configuration" />
        <MenuItem primaryText="Déconnexion" />
      </IconMenu>
    )
    // components
    let renderer = () => (
      <Paper style={styles.container}>
        <Paper style={styles.box}>
          <AppBar title={<img src="images/abibao-logo-gris-jaune.png" role="presentation" />} style={styles.appbar} titleStyle={styles.appbarTitle} iconStyleLeft={styles.appbarIconLeft} iconElementRight={<Logged />} />
          <Paper style={styles.content} zDepth={0}>
            <Paper style={styles.flexbox}>
              <Bar data={data} options={{
                fullWidth: true,
                responsive: true,
                scales: {
                  xAxes: [{
                    stacked: true
                  }],
                  yAxes: [{
                    stacked: true
                  }]
                },
                animation: {
                  easing: 'easeInCubic'
                },
                title: {
                  display: true,
                  text: 'Progression des inscriptions',
                  position: 'top'
                },
                legend: {
                  display: true,
                  position: 'bottom'
                },
                maintainAspectRatio: false
              }} />
            </Paper>
          </Paper>
        </Paper>
      </Paper>
    )
    // renderer
    return renderer()
  }
}

export default Homepage
