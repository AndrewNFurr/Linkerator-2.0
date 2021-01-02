import React, { useState } from 'react';
import _Link from './_Link';

// Material-UI Imports:
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { Autorenew } from '@material-ui/icons';

const LinkTable = (props) => {
  const {linkList} = props;


  const tableStyling = {
    width: '75vw',
    justifyContent: 'center',
    border: '1px solid green',
    margin: 'auto',
    marginTop: '1em'
  };

  return (
    <TableContainer style={tableStyling}>
      <Table className="LinkList">
        <TableHead>
          <TableRow>
            <TableCell>
              <h3>URL</h3>
            </TableCell>
            <TableCell>
              <h3>Click Count</h3>
            </TableCell>
            <TableCell>
              <h3>Comment</h3>
            </TableCell>
            <TableCell>
              <h3>Tags</h3>
            </TableCell>
            <TableCell>
              <h3>Created</h3>
            </TableCell>
            <TableCell>
              <h3>Actions</h3>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {linkList.map((_link) => {
            return (
              <TableRow key={_link.id}>
                <_Link
                  url={_link.link}
                  clickCount={_link.clickcount}
                  comment={_link.comment}
                  createDate={_link.dateCreated}
                  tags={_link.tags}
                />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LinkTable;
