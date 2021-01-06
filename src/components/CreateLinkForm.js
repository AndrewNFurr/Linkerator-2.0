import React, {useEffect, useState} from 'react';
import fetchAPI  from "../api";
import Button from '@material-ui/core/Button';

const BASE_URL= "/api";

const CreateLinkForm = (props) => {  

  const {addNewLink, history, activeLink, setActiveLink, linkList, setLinkList } = props;

  const [link, setLink] = useState("");
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState([]);

  function clearForm() {
    setLink("");
    setComment("");
    setTags([]);
  }

  useEffect(()=> {
    let activeTags = []
    if (activeLink.id) {
      activeTags = activeLink.tags.map((tag) => {
      return tag.tag
    })
  }
    setLink(activeLink.link || "");
    setComment(activeLink.comment || "");
    setTags(activeTags || "");
    console.log(activeLink)
  }, [activeLink]);

  const handleSubmit = async () => {
    const sendData = {
      link: `http://www.${link}.com`,
      comment: comment,
      clickCount: 1, 
      tags: tags.split(',')
    }

    const updateData = {
      linkId: activeLink.id, 
      link: link,
      clickcount: activeLink.clickcount,
      comment: comment,
      tags: tags.split(',') 
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
        console.log("the result from the update is:", result, result.tags)
        let updatedList = linkList.slice();
        console.log(updatedList);
        const index = linkList.findIndex((link) => {
          return link.id = activeLink.id
        })
        updatedList.splice(index, 1, result.link);
        setLinkList(updatedList);
        history.push("/");
        clearForm();
        setActiveLink({});
      } catch(error) {
        throw error;
      }
    }
  }

  return (
    <div>
    <form className="newLinkForm">
      {activeLink.id? (<h3 className="linkComponent">Update Link Info (Must attempt to update all fields)</h3>) : (<h3 className="linkComponent">Create a Link</h3>)}
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


