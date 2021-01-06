import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';


// Material U-I imports:
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import fetchAPI from '../api';
import Button from '@material-ui/core/Button';
//import DeleteIcon from '@material-ui/icons/Delete';

const BASE_URL= "/api";

const _Link = (props) => {
  const { 
    url, 
    clickCount, 
    comment, 
    createDate, 
    tags, 
    linkList, 
    id, 
    index, 
    setLinkList, 
    activeLink, 
    setActiveLink, 
    history } = props;

  const increaseCount = async () => {
    let newClickCount = clickCount + 1;
    
    const sendData = {
      linkId: id,
      clickCount: newClickCount,
    }

    try {
      let result = await fetchAPI(`${BASE_URL}/links/${id}`, "PATCH", sendData);
      let updatedList = linkList.slice();
      updatedList.splice(index, 1, result.link);
      setLinkList(updatedList);
    } catch(error) {
      throw error;
    }
  };

  const dateToFormat = createDate;

  return (
    <>
      <TableCell 
        component="th" 
        scope="row" 
        onClick={increaseCount}>
        <a href={url} target="_blank">{url}</a>
      </TableCell>
      <TableCell value={clickCount}>
        {clickCount}
      </TableCell>
      <TableCell>{comment}</TableCell>
      <TableCell>{tags.map((tag) => {
        return <p onClick={() => {
          setSearch(tag.tag);
        }}>{tag.tag}</p>
      })}</TableCell>
      <TableCell><Moment format='MM/DD/YYYY'>{dateToFormat}</Moment></TableCell>
      {/* <TableCell>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </TableCell> */}
      <TableCell>
        <Button 
          className="UpdateInfo" 
          variant="contained" 
          color="primary"
          size="small"
          onClick={() => {
            setActiveLink({link: url, 
              clickcount: clickCount, 
              comment: comment, 
              dateCreated: createDate,
              id: id,
              tags: tags
            });
            history.push("/createLink")
          }}
          >
            Update
        </Button>
      </TableCell>
    </>
  );
};

export default _Link;
