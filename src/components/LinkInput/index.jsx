// @flow

import React from 'react';
import TextField from 'material-ui/TextField';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';


import {fetchLink} from '../../store/actions/link';

import {connect} from 'react-redux';

type Props = {
  addLink: Function,
  isLoading: boolean,
  error: string[] | String | null
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
  };

  render() {
    const {addLink} = this.props;

    return (
      <React.Fragment>
        <Grid item xs={11}>
          <TextField
            error={!!this.props.error}
            id="link"
            label="url"
            margin="none"
            fullWidth
            value={this.state.input}
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            disabled={this.props.isLoading}
            variant="fab"
            mini
            color="secondary"
            aria-label="add"
            onClick={() => addLink(this.state.input)}
          >
            <AddIcon />
          </Button>
        </Grid>
        {this.props.error ? (
        <Grid item xs={12}>
          {/* TODO: wrap in a function and explain why we access [0] */}
            <div>{Array.isArray(this.props.error) ? this.props.error[0] : this.props.error}</div>
        </Grid>) : null}
      </React.Fragment>
    );
  }
}

const mapDispatch = dispatch => ({
  addLink: url => dispatch(fetchLink(url))
});

const mapState = state => ({
  isLoading: state.loading.isLoading,
  error: state.loading.error
});

export default connect(mapState, mapDispatch)(LinkInput);
