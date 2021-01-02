import React, { useState } from 'react';
import Moment from 'react-moment';

// Material U-I imports:
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
//import DeleteIcon from '@material-ui/icons/Delete';

const Link = (props) => {
  const [countClicker, setCountClicker] = useState(0);
  const { url, clickCount, comment, createDate, tags } = props;

  const increaseCountClicker = () => {
    setCountClicker(countClicker + 1);
  };

  const dateToFormat = createDate;

  return (
    <>
      <TableCell component="th" scope="row" onClick={increaseCountClicker}>
        <a href={url} target="_blank">{url}</a>
      </TableCell>
      <TableCell value={countClicker} onChange={increaseCountClicker}>
        {countClicker}
      </TableCell>
      <TableCell>{comment}</TableCell>
      <TableCell>{tags.map((tag) => {
        return <p>{tag.tag}</p>
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
