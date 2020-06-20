
import React from 'react';
import _Spinner from 'react-native-loading-spinner-overlay';
import theme from './theme';

const Spinner = ({visible}) => <_Spinner visible={visible} itemProp='size:100' color={theme.colors.blue}/>;

module.exports = {Spinner};
