import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
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
import joes from '../images/joes.jpg';

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
    //paddingBottom: '56.25%'
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
                        Find Great Pizza
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Welcome {' '} {this.state.user.name}
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        {/* {this.state.restaurant.name} */}
                        </Typography>
                        </Typography>
                        <div className={classes.heroButtons}>
                        <Grid container spacing={2} justify="center">
                            <Grid item>
                            <Button variant="contained" color="primary">
                                Order
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
                        {/* {this.state.cards.map((card, key) => (
                        <Grid item key={this.state.restaurant.menu.items.itemName} xs={12} sm={6} md={4}>
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
                        ))} */}
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                className={classes.cardMedia}
                                //className={classes.media}
                                image="https://d2jz4nqvi4omcr.cloudfront.net/customerimages/large/79463_image_5_2019-06-25-17-53-39-000197.jpg"
                                title="Joe's Pizza"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Joe's Pizza
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    The Best Pizza in all of Mumbai!!!
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                View Menu
                                </Button>
                                {/* <Button size="small" color="primary">
                                Learn More
                                </Button> */}
                            </CardActions>
                        </Card>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                className={classes.cardMedia}
                                image="https://s3-prod.adage.com/s3fs-public/styles/width_1024/public/20190920_little_Caesers_3x2.jpg"
                                title="Little Caesar's"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Little Caesar's
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    It's Hot and it's Ready!!!
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                View Menu
                                </Button>
                                {/* <Button size="small" color="primary">
                                Learn More
                                </Button> */}
                            </CardActions>
                        </Card>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                className={classes.cardMedia}
                                image='https://thepizzasnob.files.wordpress.com/2014/12/basiles-outside2-resize.jpg'
                                title="Basille's Pizza"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Basille's Pizza
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Can More Money Buy Better Pizza?
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                View Menu
                                </Button>
                                {/* <Button size="small" color="primary">
                                Learn More
                                </Button> */}
                            </CardActions>
                        </Card>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                className={classes.cardMedia}
                                image="https://slice.seriouseats.com/images/200110601-2bros-slice.jpg"
                                title="Dollar Pizza"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    $1 Dollar Pizza
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Come on Over to Dollar Pizza!!!
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                View Menu
                                </Button>
                                {/* <Button size="small" color="primary">
                                Learn More
                                </Button> */}
                            </CardActions>
                        </Card>
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