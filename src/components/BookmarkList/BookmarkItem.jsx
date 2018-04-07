// @flow

import * as React from 'react';
import {
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon
} from 'material-ui/List';
import {connect} from 'react-redux';
import type {Bookmark} from '../../type';
import MoreVert from 'material-ui-icons/MoreVert';
import Edit from 'material-ui-icons/Edit';
import Delete from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Menu, {MenuItem} from 'material-ui/Menu';

type Props = {
  bookmark: Bookmark
};

type State = {
  anchor: any
};

const makeSecondaryLine = ({title, authorName, addedDate}: Bookmark) =>
  `title: ${title} / author: ${authorName} / added: ${addedDate}`;

class BookmarkItem extends React.Component<Props, State> {
  state = {
    anchor: null
  };

  handleClick = event => {
    this.setState({anchor: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchor: null});
  };

  render() {
    return (
      <React.Fragment>
        <ListItemText
          primary={this.props.bookmark.url}
          secondary={makeSecondaryLine(this.props.bookmark)}
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="Comments" onClick={this.handleClick}>
            <MoreVert />
          </IconButton>
        </ListItemSecondaryAction>
        <Menu
          anchorEl={this.state.anchor}
          open={Boolean(this.state.anchor)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText inset primary="Edit" />
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText inset primary="Delete" />
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

const mapState = (state, {bookmarkId}) => ({
  bookmark: state.link.byId[bookmarkId]
});

export default connect(mapState)(BookmarkItem);
