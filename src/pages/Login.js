import React from 'react'
import Reflux from 'reflux'

import { grey300, amber900, white } from 'material-ui/styles/colors'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import AppStore from './../stores/AppStore'

const styles = {
  labelStyle: {
    login: {
      fontWeight: 'bold'
    }
  },
  buttonStyle: {
    login: {
      margin: 'auto'
    }
  },
  underlineFocusStyle: {
    borderColor: amber900
  },
  container: {
    display: 'flex',
    background: grey300,
    width: '100%',
    height: '100%'
  },
  box: {
    padding: '2rem',
    margin: 'auto',
    width: '320px',
    marginTop: '50vh',
    transform: 'translateY(-50%)',
    textAlign: 'center'
  },
  progress: {
    margin: 'auto',
    width: '120px'
  }
}

class Login extends Reflux.Component {
  componentDidMount () {
  }

  componentDidUpdate (prevProps, prevState) {
    if (!prevState.networkOnline && this.state.networkOnline) {
      this.setState({loading: false})
    }
    if (prevState.networkOnline && !this.state.networkOnline) {
      this.setState({loading: true})
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      email: '',
      password: ''
    }
    this.stores = [AppStore]
  }

  render () {
    // Components
    let loader = () => (
      <Paper style={styles.container}>
        <Paper style={styles.box}>
          <h2>Chargement en cours...</h2>
          <CircularProgress color={amber900} style={styles.progress} size={120} thickness={6} />
        </Paper>
      </Paper>
    )
    let renderer = () => (
      <Paper style={styles.container}>
        <Paper style={styles.box}>
          <h2>Authentification</h2>
          <TextField underlineFocusStyle={styles.underlineFocusStyle} type="email" fullWidth hintText="Email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} /><br />
          <TextField underlineFocusStyle={styles.underlineFocusStyle} type="password" fullWidth hintText="Mot de passe" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} /><br />
          <br />
          <RaisedButton label="S'indentifer" onTouchTap={this.handleSubmit} backgroundColor={amber900} labelColor={white} labelStyle={styles.labelStyle.login} buttonStyle={styles.buttonStyle.login} />
        </Paper>
      </Paper>
    )
    // renderer
    if (this.state.loading === true) {
      return loader()
    } else {
      return renderer()
    }
  }
}

export default Login
