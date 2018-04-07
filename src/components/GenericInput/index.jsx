// @flow

import * as React from 'react';
import TextField from 'material-ui/TextField';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import {fetchLink} from '../../store/actions/link';

import {connect} from 'react-redux';

type Props = {
  onClick: Function,
  buttonDisabled: boolean,
  error: ?string,
  title: string
};

type State = {
  input: string
};

class GenericInput extends React.Component<Props, State> {
  state = {
    input: ''
  };

  handleChange = (event: any) => {
    this.setState({
      input: event.target.value
    });
  };

  render() {
    const {onClick} = this.props;

    return (
      <React.Fragment>
        <Grid item xs={11}>
          <TextField
            error={!!this.props.error}
            id="link"
            label={this.props.title}
            margin="none"
            fullWidth
            value={this.state.input}
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            disabled={this.props.buttonDisabled}
            variant="fab"
            mini
            color="secondary"
            aria-label="add"
            onClick={() => onClick(this.state.input)}
          >
            <AddIcon />
          </Button>
        </Grid>
        {this.props.error ? (
          <Grid item xs={12}>
            <div>{this.props.error}</div>
          </Grid>
        ) : null}
      </React.Fragment>
    );
  }
}


export default GenericInput;
