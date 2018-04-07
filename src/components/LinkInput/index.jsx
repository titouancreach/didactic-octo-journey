// @flow

import * as React from 'react';
import TextField from 'material-ui/TextField';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

import {fetchLink} from '../../store/actions/link';
import GenericInput from '../../components/GenericInput/index';

import {connect} from 'react-redux';

type Props = {
  addLink: Function,
  isLoading: boolean,
  error: ?string
};


const LinkInput = ({isLoading, error, addLink}: Props) => (
  <GenericInput buttonDisabled={isLoading} error={error} onClick={addLink} title="url" />
)

const mapDispatch = dispatch => ({
  addLink: url => dispatch(fetchLink(url))
});

const mapState = state => ({
  isLoading: state.loading.isLoading,
  error: state.loading.error
});

export default connect(mapState, mapDispatch)(LinkInput);
