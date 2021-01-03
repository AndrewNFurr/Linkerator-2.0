import React, {useEffect, useState} from 'react';
import fetchAPI  from "../api";
import Button from '@material-ui/core/Button';

const BASE_URL= "http://localhost:3001/api";

const CreateLinkForm = (props) => {  

  const {addNewLink, history, activeLink, setActiveLink } = props;

  const [link, setLink] = useState("");
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState([]);

  function clearForm() {
    setLink("");
    setComment("");
    setTags([]);
  }

  useEffect(()=> {
    setLink(activeLink.link || "");
    setComment(activeLink.comment || "");
    setTags(activeLink.tags[0].tag || "");
  }, [activeLink]);

  const handleSubmit = async () => {
    const sendData = {
      link: `http://www.${link}.com`,
      comment: comment,
      clickCount: 1, 
      tags: tags.split(',')
    }

    const updateData = {
      id: activeLink.id, 
      link: link,
      comment: comment,
      tags: tags
    }

    console.log("The new link data is:" , updateData)
    
    if (!activeLink.id) {
      try {
        console.log("inside the 'new' try, not the 'update' try")
        await fetchAPI(`${BASE_URL}/links`, "POST", sendData)
          .then((newLink) => {
           console.log(newLink)
           addNewLink(newLink);
            clearForm();
            history.push("/");
          }).catch(console.error);
      } catch(error) {
        throw error;
      }
    } else {
      try {
        console.log("inside the 'update' try")
        let result = await fetchAPI(`${BASE_URL}/links/${activeLink.id}`, "PATCH", updateData);
        console.log("the result from the update is:", result)
        let updatedList = linkList.slice();
        updatedList.splice(index, 1, result.link);
        setLinkList(updatedList);
        setActiveLink({});
      } catch(error) {
        throw error;
      }
    }
  }

  return (
    <div>
    <form className="newLinkForm">
      {activeLink.id? (<h3 className="linkComponent">Update Link Info</h3>) : (<h3 className="linkComponent">Create a Link</h3>)}
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
          onClick={async (event) => {event.preventDefault(); handleSubmit();}}>Submit</Button>
        <Button 
          className="cancel" 
          variant="contained" 
          onClick={() => {clearForm(); setActiveLink({}); history.push("/")}}>Cancel</Button>
      </div>
    </form> 
    </div>
  )
}

export default CreateLinkForm;


