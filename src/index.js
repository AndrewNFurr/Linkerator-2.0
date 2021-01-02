
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, useHistory, Switch, Link, Redirect } from "react-router-dom";
import fetchAPI from './api';
import {
  SearchBar,
  LinkTable,
  _Link,
  CreateLinkForm 
} from './components';
import Button from '@material-ui/core/Button';

const App = () => {
  const [linkList, setLinkList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [search, setSearch] = useState('');
  const [searchOption, setSearchOption] = useState('')

  function addNewLink(newLink) {
    setLinkList([...linkList, newLink]);
  }
  
  const history = useHistory();

  useEffect(async () => {
    fetchAPI('http://localhost:3001/api/links')
      .then((resp) => {
        console.log(resp)
        setLinkList(resp);
      })
      .catch(console.error);
  }, []);
  
  useEffect(async () => {
  fetchAPI('http://localhost:3001/api/tags')
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
  

  return <Switch>
    <Route exact path="/CreateLink">
      <CreateLinkForm addNewLink={addNewLink} history={history}/>
    </Route>
    <Route path='/'>
      <h1>The Great Linkerator</h1>
      <h3>The ONLY solution for indexing URLs</h3>
      <SearchBar 
        search={search}
        setSearch={setSearch}
        setSearchOption={setSearchOption}
        searchOption={searchOption}/>
      <Button variant="contained" color="primary"><Link to="/CreateLink">Create Link</Link></Button>
      <LinkTable
        linkList={filteredLinks()}
        setSearch={setSearch}
        setLinkList={setLinkList}/>
    </Route>
    
  </Switch>
};


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
);
