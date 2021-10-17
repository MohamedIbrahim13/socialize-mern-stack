import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { teal } from "@material-ui/core/colors";
import publishLogo from "../images/publishLogo.png";

//import socializeLogo from "../images/socializeLogo.png";

const useStyles = makeStyles(theme => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    fontSize: "2em",
    fontWeight: 300,
  },
  image: {
    marginLeft: "10px",
    marginTop: "5px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      marginTop: 20,
      justifyContent: "center",
    },
  },
  logout: {
    marginLeft: "20px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  teal: {
    color: theme.palette.getContrastText(teal["A100"]),
    backgroundColor: teal[500],
  },
  title: {
    color: teal["A400"],
  },
}));

const Navbar = ({ user, logout }) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <Typography variant="h3" component="h4" className={classes.title}>
          Socialize
        </Typography>
        <img
          className={classes.image}
          src={publishLogo}
          alt="icon"
          height="40px"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.teal}
              alt={user?.user.name}
              src={user?.user.imageUrl}
            >
              {user?.user.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.user.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
