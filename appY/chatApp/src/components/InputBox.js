import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const InputBox = ({placeholder, onChange, value, type, style}) => {
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      onChangeText={text => onChange(text)}
      keyboardType={type == 'number' ? 'number-pad' : 'default'}
      style={[styles.input, style]}
      maxLength={type == 'number' ? 5 : 10}
    />
  );
};

export default InputBox;

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.31,
    borderRadius: 10,
    paddingLeft: wp(5),
    color: 'black',
  },
});
