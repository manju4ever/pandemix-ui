import React from 'react';
import { View, TextInput } from 'react-native';
import styles from './styles'

export const LoginTextField = (props) =>
    <View style={[props.style, styles.inputView]}>
        <TextInput style={[styles.textInput, props.textInputStyle]}
            editable={props.editable != null ? props.editable : true}
            placeholder={props.placeholder}
            placeholderTextColor={'#192965'}
            underlineColorAndroid="transparent"
            secureTextEntry={props.secureTextEntry}
            selectionColor={"grey"}
            keyboardType={props.keyboardType}
            value={props.value}
            autoCapitalize='none'
            maxLength={props.maxLength != null ? props.maxLength : Number.MAX_VALUE}
            onChangeText={(text) => {
                props.onChangeText && props.onChangeText(text)
            }}
            onFocus={() => {
                props.onFocus && props.onFocus()
            }}
            onBlur={() => {
                props.onBlur && props.onBlur()
            }}
            onEndEditing={() => {
                props.onEndEditing && props.onEndEditing()
            }} />
    </View>;

export default LoginTextField;