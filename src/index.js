
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, useHistory, Switch, Link, Redirect } from "react-router-dom";
import fetchAPI, {increaseCountClicker} from './api';
import {
  SearchBar,
  LinkTable,
  _Link,
  CreateLinkForm 
} from './components';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const App = () => {
  const [linkList, setLinkList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [search, setSearch] = useState('');
  const [searchOption, setSearchOption] = useState('')
  const [sortOption, setSortOption] = useState('');
  const [activeLink, setActiveLink] = useState({});

  function addNewLink(newLink) {
    setLinkList([...linkList, newLink]);
  }
  
  const history = useHistory();

  useEffect(async () => {
    fetchAPI('/api/links')
      .then((resp) => {
        console.log("The linklist is", resp)
        let sortedList = resp.sort((a, b) => (a.clickcount > b.clickcount)? -1: 1);
        setLinkList(sortedList);
      })
      .catch(console.error);
  }, []);
  
  useEffect(async () => {
  fetchAPI('/api/tags')
    .then((data) => {
      console.log(data)
      setTagList(data)
    })
    .catch(console.error)
}, [])



  function filteredLinks() {
    if (searchOption === 'Tags') {
      return linkList.filter((_link) => {
        let tags = _link.tags.map((tag) => {
          return tag.tag;
        })
        if (tags.join(', ').includes(search)) {
          return _link;
        }
      })
    }
    return linkList.filter((_link) => {
      return _link.link.includes(search.toLowerCase());
    });
  }

  console.log("The activeLink is:", activeLink);
  
  return ( <>
    <header>
      <h1>The Great Linkerator</h1>
      <h3>The ONLY solution for indexing URLs</h3>
    </header>
    <Switch>
      <Route exact path="/CreateLink">
        <CreateLinkForm 
          addNewLink={addNewLink} 
          activeLink={activeLink}
          setActiveLink={setActiveLink}
          history={history}
          linkList={linkList}
          setLinkList={setLinkList}/>
      </Route>
      <Route path='/'>
        <SearchBar 
          search={search}
          setSearch={setSearch}
          setSearchOption={setSearchOption}
          searchOption={searchOption}
          sortOption={sortOption}
          setSortOption={setSortOption}
          linkList={linkList}
          setLinkList={setLinkList}/>
          <Grid container justify='center'>
          <Button 
            className="createLink" 
            variant="contained" 
            color="primary">
            <Link to="/CreateLink" className='createLink'>Create Link</Link>
          </Button>
        </Grid>
        <LinkTable
          linkList={filteredLinks()}
          setSearch={setSearch}
          setLinkList={setLinkList}
          activeLink={activeLink}
          setActiveLink={setActiveLink}
          history={history}/>
      </Route>
    </Switch>
  </>)
};


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
);
