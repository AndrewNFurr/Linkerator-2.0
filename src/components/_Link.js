import React, { useState } from 'react';
import Moment from 'react-moment';


// Material U-I imports:
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import fetchAPI from '../api';
//import DeleteIcon from '@material-ui/icons/Delete';

const Link = (props) => {
  const [countClicker, setCountClicker] = useState(0);
  const { id, link, clickCount, comment, createDate, tags, updateClickCount, setSearch } = props;


  const dateToFormat = createDate;

  return (
    <>
      <TableCell component="th" scope="row" onClick={() => {
        updateClickCount(id, clickCount)
      }}>
        <a href={link} target="_blank">{link}</a>
      </TableCell>
      <TableCell value={clickCount} >
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
    </>
  );
};

export default Link;
