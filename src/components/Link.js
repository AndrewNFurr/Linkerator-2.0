import React, { useState } from 'react';

// Material U-I imports:
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
//import DeleteIcon from '@material-ui/icons/Delete';

const Link = (props) => {
  const [countClicker, setCountClicker] = useState(0);
  const { url, clickCount, comment, createDate } = props;

  const increaseCountClicker = () => {
    setCountClicker(countClicker + 1);
  };

  return (
    <>
      <TableCell component="th" scope="row" onClick={increaseCountClicker}>
        {url}
      </TableCell>
      <TableCell value={countClicker} onChange={increaseCountClicker}>
        {countClicker}
      </TableCell>
      <TableCell>{comment}</TableCell>
      <TableCell>tags go here.</TableCell>
      <TableCell>{createDate}</TableCell>
      {/* <TableCell>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </TableCell> */}
    </>
  );
};

export default Link;
