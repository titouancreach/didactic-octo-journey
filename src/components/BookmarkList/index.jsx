// @flow
import React from 'react';
import {ListItem} from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Table, {
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  TablePagination
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux';
import BookmarkItem from './BookmarkItem';

type Props = {
  bookmarkIds: string[]
};

type State = {
  pageNbr: number,
  rowPerPage: number
};

const getPaginatedResults = (pageNbr, rowPerPage, items) => {
  return items.slice(rowPerPage * pageNbr, rowPerPage * pageNbr + rowPerPage);
};

class BookmarkList extends React.Component<Props, State> {
  state = {
    pageNbr: 0,
    rowPerPage: 5
  };

  render() {
    const {bookmarkIds} = this.props;
    return (
      <Grid item xs={12}>
        <Paper>
          <Table>
            <TableBody>
              {getPaginatedResults(
                this.state.pageNbr,
                this.state.rowPerPage,
                bookmarkIds
              ).map(bookmarkId => (
                <TableRow key={bookmarkId}>
                  <TableCell>
                    <ListItem>
                      <BookmarkItem bookmarkId={bookmarkId} />
                    </ListItem>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={6}
                  page={this.state.pageNbr}
                  onChangePage={(e, n) => this.setState({pageNbr: n})}
                  count={bookmarkIds.length}
                  onChangeRowsPerPage={e =>
                    this.setState({rowPerPage: e.target.value})
                  }
                  rowsPerPage={this.state.rowPerPage}
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
}

const mapState = state => {
  return {
    bookmarkIds: state.link.allIds
  };
};

export default connect(mapState)(BookmarkList);
