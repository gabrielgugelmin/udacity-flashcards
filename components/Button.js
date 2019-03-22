import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from '../assets/colors';
import PropTypes from 'prop-types';

class Button extends Component {

  onButtonPress = (e) => {
    const { onPress, disabled } = this.props;
    if (!disabled && onPress) onPress(e);
  }

  render() {
    const { title, disabled, children, buttonClass } = this.props;
    const buttonStyle = (buttonClass) ? ([button[buttonClass]] || [button.default] ) : [button.default];
    const textStyle = (buttonClass) ? ([text[buttonClass]] || [text.default] ) : [text.default];

    buttonStyle.push(button[buttonClass]);
    textStyle.push(text[buttonClass]);

    return (
      <TouchableOpacity
        style={buttonStyle}
        onPress={this.onButtonPress}>
        <View style={styles.container}>
          {children}
          <Text style={textStyle}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const button = StyleSheet.create({
  link: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    marginVertical: 10,
  },
  default: {
    backgroundColor: colors.blue,
    borderRadius: 5,
    marginVertical: 10,
  },
  disabled: {
    backgroundColor: colors.gray,
    borderRadius: 5,
    marginVertical: 10,
  },
  green: {
    backgroundColor: colors.green,
    borderRadius: 5,
    marginVertical: 10,
  },
  red: {
    backgroundColor: colors.red,
    borderRadius: 5,
    marginVertical: 10,
  },
  ghost: {
    backgroundColor: colors.white,
    borderColor: colors.blue,
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 10,
  }
});
const text = StyleSheet.create({
  link: {
    color: colors.blue2,
    fontWeight: "bold",
    marginHorizontal: 5,
    marginVertical: 15,
  },
  default: {
    color: colors.gray2,
    fontSize: 16,
    fontWeight: '300',
    marginHorizontal: 5,
    marginVertical: 15,
  },
  disabled: {
    color: colors.black,
    marginHorizontal: 5,
    marginVertical: 15,
  },
  green: {
    color: colors.blue,
    marginHorizontal: 5,
    marginVertical: 15,
  },
  red: {
    color: colors.gray2,
    marginHorizontal: 5,
    marginVertical: 15,
  },
  ghost: {
    color: colors.blue,
    fontSize: 16,
    fontWeight: '300',
    marginHorizontal: 5,
    marginVertical: 15,
  }
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

Button.propTypes = {
  disabled: PropTypes.bool,
  icon: PropTypes.func,
  onPress: PropTypes.func,
  title: PropTypes.string.isRequired,
};

export default Button;