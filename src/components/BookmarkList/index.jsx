// @flow
import React from 'react';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux';

type Props = {
  bookmarkIds: string[]
};

function BookmarkList({bookmarkIds}: Props) {
  return (
    <Grid item xs={12}>
      <Paper>
        <Table>
          <TableBody>
            {bookmarkIds.map(bookmarkId => (
              <TableRow key={bookmarkId}>
                <TableCell>
                  <ListItem>
                    {' '}
                    <ListItemText primary={bookmarkId} secondary="titouan" />
                  </ListItem>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={6}
                page={0}
                onChangePage={() => {}}
                count={bookmarkIds.length}
                rowsPerPage={1}
                backIconButtonProps={{
                  'aria-label': 'Previous Page'
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page'
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    </Grid>
  );
}

const mapState = state => {
  return {
    bookmarkIds: state.link.allIds
  };
};

export default connect(mapState)(BookmarkList);
