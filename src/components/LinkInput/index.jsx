// @flow

import React from 'react';
import TextField from 'material-ui/TextField';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import {addLink} from '../../store/actions/link';

import {connect} from 'react-redux';

type Props = {
  addLink: Function
};

type State = {
  input: string
};

class LinkInput extends React.Component<Props, State> {
  state = {
    input: ''
  };

  handleChange = event => {
    this.setState({
      input: event.target.value
    });
  }


  render() {

    const {addLink} = this.props;

    return (
      <React.Fragment>
        <Grid item xs={11}>
          <TextField id="link" label="url" margin="none" fullWidth value={this.state.input} onChange={this.handleChange}/>
        </Grid>
        <Grid item xs={1}>
          <Button
            variant="fab"
            mini
            color="secondary"
            aria-label="add"
            onClick={() => addLink(this.state.input)}
          >
            <AddIcon />
          </Button>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapDispatch = dispatch => ({
  addLink: url => dispatch(addLink(url))
});

export default connect(null, mapDispatch)(LinkInput);
