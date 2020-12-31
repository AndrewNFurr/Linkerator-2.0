import React, {useState} from 'react';
import fetchAPI  from "../api";
import Button from '@material-ui/core/Button';

const BASE_URL= "http://localhost:3001/api";

const CreateLinkForm = (props) => {

  const {linkList, setLinkList, addNewLink, history } = props;

  const [link, setLink] = useState("");
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState([]);

  function clearForm() {
    setLink("");
    setComment("");
    setTags([]);
  }

  return (
    <div>
    <h1>This is the form</h1>
    <form
      className="newLinkForm"
      onSubmit={async (event) => {
        event.preventDefault();

        const newLinkData = {
          link: link,
          comment: comment,
          clickCount: 1, 
          tags: tags,
        }

        try {
          const newLink = await fetchAPI(`${BASE_URL}/links`, "POST", newLinkData);

          addNewLink(newLink);
          clearForm();

        } catch(error) {
          throw error;
        }
      }}
    >
      <h3>Create a Link</h3>
      <label>URL</label>
      <input type="text" value={link} onChange={(event) => setLink(event.target.value)}></input>
      <label>Comment</label>
      <input type="text" value={comment} onChange={(event) => setComment(event.target.value)}></input>
      <button variant="contained" color="primary">Submit</button>
      <button variant="contained" onClick={() => {clearForm(); history.pushState("/")}}>Cancel</button>
    </form> 
    </div>
  )
}

export default CreateLinkForm;


