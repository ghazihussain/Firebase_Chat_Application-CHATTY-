import React from 'react';
import {View, Dimensions, Text, Image, AsyncStorage} from 'react-native';
import theme from '../utils/theme';

class splash extends React.Component {
  constructor(props) {
    super(props);
  }

  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        // this.props.navigation.navigate('Auth');
        resolve("result");
      }, 500),
    );
  };
  async componentDidMount() {
    setTimeout(() => {
        console.log('splash 1called');
        this.props.navigation.navigate('LoginScreen')
      }, 500),
    console.log('splash called');
  }

  render() {
    console.log('splash called');
    return (
      <View style={styles.container}>
        {/* <Text style={styles.text}>Circles</Text> */}
         <Image style={styles.imageStyle} source={theme.images.mainLogo} resizeMode="contain" /> 
      </View>
    );
  }
}
const styles = {
  imageStyle: {
    height: '50%',
    width: '85%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: theme.colors.purple,
  },
};

export default splash;
// const mapStateToProps = ({ auth }) => {
//         return { auth };
//       };
//       export default connect(mapStateToProps, {
//         getUserData
//       })(splash);
