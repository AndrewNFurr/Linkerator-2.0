import React, { useState } from 'react';

// Material U-I imports:
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import fetchAPI from '../api';
//import DeleteIcon from '@material-ui/icons/Delete';

const Link = (props) => {
  const [countClicker, setCountClicker] = useState(0);
  const { id, link, clickCount, comment, createDate, tags, linkList, setLinkList } = props;

  const increaseCountClicker = async () => {
    const newCount = clickCount + 1
    const payload = {
      link,
      clickcount: newCount,
      comment,
      createDate,
      tags
    }

    if (id) {
    try {
      await fetchAPI(`http://localhost:3001/api/links/${id}`, 'PATCH', payload)
        .then((resp) => {
          console.log(resp)
          const newList = [...linkList];
          setLinkList(newList);
        })
    } catch(error) {
      console.log(error);
    }
  }
  };

  return (
    <>
      <TableCell component="th" scope="row" onClick={increaseCountClicker}>
        <a href={link} target="_blank">{link}</a>
      </TableCell>
      <TableCell value={clickCount} onChange={increaseCountClicker}>
        {clickCount}
      </TableCell>
      <TableCell>{comment}</TableCell>
      <TableCell>{tags.map((tag) => {
        return <p>{tag.tag}</p>
      })}</TableCell>
      <TableCell>{Date.parse(createDate)}</TableCell>
      {/* <TableCell>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </TableCell> */}
    </>
  );
};

export default Link;
