import React, {useState} from 'react';
import fetchAPI  from "../api";
import Button from '@material-ui/core/Button';

const BASE_URL= "http://localhost:3001/api";

const CreateLinkForm = (props) => {  

  const {addNewLink, history } = props;

  const [link, setLink] = useState("");
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState([]);

  function clearForm() {
    setLink("");
    setComment("");
    setTags([]);
  }

  const handleSubmit = async () => {
    const sendData = {
      link: `http://www.${link}.com`,
      comment: comment,
      clickCount: 1, 
      tags: tags,
    }

    console.log("The new link data is:" , sendData)
    
    try {
      const newLink = await fetchAPI(`${BASE_URL}/links`, "POST", sendData);
        addNewLink(newLink);
        clearForm();
    } catch(error) {
      throw error;
    }
  }

  return (
    <div>
    <form className="newLinkForm">
      <h3 className="linkComponent">Create a Link</h3>
      <label className="urlName">URL</label>
      <p className="urlPrefix">http://www.</p><input type="text" className="linkName" value={link} onChange={(event) => setLink(event.target.value)}></input><p className="urlSuffix">.com</p>
      <label className="commentLabel">Comment</label>
      <textarea type="text" className="commentBox" value={comment} onChange={(event) => setComment(event.target.value)}></textarea>
      <label className="tagsLabel">Tags</label>
      <input type="text" className="tags" placeholder="fun cool..." value={tags} onChange={(event) => setTags(event.target.value)}></input>
      <div className="buttonGroup">
        <Button 
          className="submit" 
          variant="contained" 
          color="primary" 
          onClick={(event) => {event.preventDefault(); handleSubmit();}}>Submit</Button>
        <Button 
          className="cancel" 
          variant="contained" 
          onClick={() => {clearForm(); history.push("/")}}>Cancel</Button>
      </div>
    </form> 
    </div>
  )
}

export default CreateLinkForm;


