import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import withStyles from '@material-ui/styles/withStyles';
import { Link, withRouter } from 'react-router-dom';
import ReactPhoneInput from 'react-phone-input-mui';
//var MuiPhoneNumber = require("material-ui-phone-number")
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        Pizza Hack
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


class Signup extends React.Component{
  constructor(props) {
      super();
      this.state = {
        user: {
          email: "",
          password:"",
          address: "",
          cash: false,
          contactno: "",
          name: "",
          redirect: false,
          error: ""
        },
        isAuthenticated: false
      };
  }   

  componentDidMount() {
    const auth = sessionStorage.getItem("pizzaAuth");
    if (auth) {
      this.setState({
        isAuthenticated: true
      });
      return;
    }
  }

  handleChange = event => ({target}) => {
    this.setState({[event]: target.value});
  }

  handleSubmit = async (event) => {
    const cookies = new Cookies();
    const apiLink = "http://pizzahack.azurewebsites.net/users/signup"
    event.preventDefault();
    try {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(this.state.name === 0 || this.state.contactno.length === 0 || this.state.password.length === 0 || this.state.email.length === 0 || !re.test(this.state.email)) {
          this.setState({
              error:'Missing proper credentials.'
          })
      } else {
          let res = await axios.post(apiLink, {
            email: this.state.email,
            password: this.state.password,   
            address: this.state.address,
            contactno: this.state.contactno,
            cash: this.state.cash,
            name: this.state.name,
          })
          if(res){
            //debugger
            console.log("Sign up response   ", res)
            if(!res.data.success && res.data.err==='User already exists') {
              this.setState({
                //redirect: true,
                isAuthenticated: true
              })
            }
            else {
              this.setState({
                //redirect: true,
                isAuthenticated: true,
                //user: res.data
              })
              //cookies.set('token', res.data.token, { path: '/' });
            }
          }
      }
  } catch (err) {
      console.log(err);
  }
}
  
  handleKeyPress = event => {
    if(event.key === 'Enter') {
      this.handleSubmit();
    }
  }

  render() {
    if (this.state.isAuthenticated) {
      return(
        <Redirect to={"/home"} />
      )
    }
    //const { classes } = this.props;
    const { classes,defaultCountry,} = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  //required
                  fullWidth
                  name="name"
                  label="Name"
                  type="name"
                  id="name"
                  autoComplete="current-name"
                  onChange={this.handleChange('name')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  //required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={this.handleChange('email')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  //required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleChange('password')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  //required
                  fullWidth
                  name="address"
                  label="Address"
                  type="address"
                  id="address"
                  autoComplete="current-address"
                  onChange={this.handleChange('address')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  //required
                  fullWidth
                  name="contactno"
                  label="Number"
                  type="contactno"
                  id="contactno"
                  autoComplete="current-contactno"
                  onChange={this.handleChange('contactno')}
                />
              </Grid> 
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="cash" color="primary" />}
                  label="I want want cash as payment type"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default withRouter(withStyles(styles)(Signup))