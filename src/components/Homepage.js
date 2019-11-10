import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/styles/withStyles';
import { Link, withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Navbar from '../components/Navbar';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'-SINCE '}
      {/* <Link color="inherit"> */}
        2014-
      {/* </Link>{' '} */}
      {/* {new Date().getFullYear()}
      {'.'} */}
    </Typography>
  );
}

const styles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  logout: {
    justifyContent: 'right'
}
});

class Homepage extends React.Component{
    cards = []
    constructor(props) {
        super(props);
        this.state = {
            user : {
                name: this.props.profile.name,
                email: this.props.profile.email,
                contactno : this.props.profile.contanco
            },
            restaurant : [{
                    name: "",
                    menu: {
                        items: []
                    },
                    location: "",
                    priceRange: "",
                    rating: "",
                    _id: ""
                }],  
            query: "",
            isSearched: false,
            cards : []
        }
    }

    componentDidMount = () => {
        const props_ = this.props
        this.setState({
            props_
        })
    }

    handleChange = event => ({target}) => {
        this.setState({[event]: target.value});
      }

    handleSubmit = async (event) => {
        //const cookies = new Cookies();
        const apiLink = "http://pizzahack.azurewebsites.net/restaurant/5dc770c41c9d440000339053"
        //event.preventDefault();
        let query = {
          query: this.state.query
        }
        let res = await axios.get(apiLink)
        if (!res) {
            alert("Please do valid search!")
            // console.log(res)
        }
        else {
            // this.cards = res.data.menu.items.length;
            for(let i = 1; i < res.data.menu.items.length; i++) {
                this.state.cards.push(i)
            }
            console.log(">>>>>>>>>Res>>>>>>", res);
            this.setState({
            //redirect: true,
            //isAuthenticated: true,
            restaurant: res.data,
            isSearched: true
            })
            //cookies.set('token', res.data.token, { path: '/home' });
          console.log("Successful search! ")
        }
    }

    handleKeyPress = event => {
        if(event.key === 'Enter') {
          this.handleSubmit();
        }
    };

    render() {
        const {classes} = this.props
        if(this.state.isSearched) {
            return(
                <React.Fragment>
                <Navbar />
                <main>
                    {/* Hero unit */}
                    <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Order
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Welcome {' '} {this.state.user.name}
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        {this.state.restaurant.name}
                        </Typography>
                        </Typography>
                        <div className={classes.heroButtons}>
                        <Grid container spacing={2} justify="center">
                            <Grid item>
                            <Button variant="contained" color="primary">
                                Menu
                            </Button>
                            </Grid>
                            <Grid item>
                            <Button variant="outlined" color="primary">
                                Voice Assisstant
                            </Button>
                            </Grid>
                        </Grid>
                        </div>
                    </Container>
                    </div>
                    <div className="search-container" align="center">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            //required
                            id="search"
                            label="Search"
                            name="search"
                            placeholder='pizza'
                            autoFocus
                            onChange={this.handleChange('query')}
                            style={{ width: 750 }}
                            onKeyPress = {this.handleKeyPress}
                        />
                    </div>
                    <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {this.state.cards.map(card => (
                        <Grid item key={card} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image="https://source.unsplash.com/random"
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                Heading
                                </Typography>
                                <Typography>
                                This is a media card. You can use this section to describe the content.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                View
                                </Button>
                                <Button size="small" color="primary">
                                Edit
                                </Button>
                            </CardActions>
                            </Card>
                        </Grid>
                        ))}
                    </Grid>
                    </Container>
                </main>
              {/* Footer */}
              <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                  COOKING UP FRESH CODE
                </Typography>
                <Copyright />
              </footer>
              {/* End footer */}
            </React.Fragment>
          );
        }
        return (
            <React.Fragment>
                <Navbar />
              <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                  <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                      Order
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                      Welcome {' '} {this.state.user.name}
                      <Typography variant="h5" align="center" color="textSecondary" paragraph>
                      {this.state.restaurant.name}
                      </Typography>
                    </Typography>
                    <div className={classes.heroButtons}>
                      <Grid container spacing={2} justify="center">
                        <Grid item>
                          <Button variant="contained" color="primary">
                            Menu
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button variant="outlined" color="primary">
                            Voice Assisstant
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </Container>
                </div>
                <div className="search-container" align="center">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        //required
                        id="search"
                        label="Search"
                        name="search"
                        placeholder='pizza'
                        autoFocus
                        onChange={this.handleChange('query')}
                        style={{ width: 750 }}
                        onKeyPress = {this.handleKeyPress}
                    />
                </div>
              </main>
              {/* Footer */}
              <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                  COOKING UP FRESH CODE
                </Typography>
                <Copyright />
              </footer>
              {/* End footer */}
            </React.Fragment>
          );
    }
}

export default withRouter(withStyles(styles)(Homepage))