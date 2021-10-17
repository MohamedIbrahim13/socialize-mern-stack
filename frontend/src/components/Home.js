import { useState, useEffect } from "react";
import {
  Container,
  Grow,
  Grid,
  AppBar,
  TextField,
  Button,
  Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts";
import ChipInput from "material-ui-chip-input";
import Posts from "./Posts";
import Form from "./Form";
import { useLocation, useHistory } from "react-router-dom";
import { getBySearch } from "../actions/posts";

const useStyles = makeStyles(theme => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: "1rem",
    display: "flex",
    padding: "16px",
  },
  pagination: {
    borderRadius: 4,
    marginTop: "1rem",
    padding: "16px",
  },
  gridContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
  },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = ({ user }) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector(state => state.posts);
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const searchPosts = () => {
    if (search.trim() || tags) {
      dispatch(getBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };
  const handleAddChip = tag => setTags([...tags, tag]);
  const handleDeleteChip = chipToDelete =>
    setTags(tags.filter(tag => tag !== chipToDelete));
  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      searchPosts();
    }
  };
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts
              setCurrentId={setCurrentId}
              posts={posts}
              isLoading={isLoading}
              user={user}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Posts"
                fullWidth
                onKeyDown={handleKeyPress}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={chip => handleAddChip(chip)}
                onDelete={chip => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                className={classes.searchButton}
                onClick={searchPosts}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Form
              currentId={currentId}
              setCurrentId={setCurrentId}
              user={user}
            />
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}></Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
