import React, { useState } from 'react';
import Link from './Link';

// Material-UI Imports:
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

const LinkTable = (props) => {
  const {} = props;

  function createData(url, clickCount, comment, createDate) {
    return { url, clickCount, comment, createDate };
  }

  const rows = [
    createData('google.com', 0, 'all the answers!', '2020-23-12'),
    createData('fullstackacademy.com', 0, 'school!', '2020-23-12'),
    createData('espn.com', 0, 'stories and scores!', '2020-30-12'),
  ];

  const tableStyling = {
    width: '75vw',
    justifyContent: 'center',
    border: '1px solid black',
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
          {rows.map((row) => {
            return (
              <TableRow key={row.name}>
                <Link
                  url={row.url}
                  clickCount={row.clickCount}
                  comment={row.comment}
                  createDate={row.createDate}
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
