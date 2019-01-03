import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, Alert, View, Button } from 'react-native';
import RoundButton from '../components/RoundButton';
import TextInputForm from '../components/TextInputForm'

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };
  _onPressLink() {
    Alert.alert('회원가입 페이지로 넘어가랏!!!')
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={{ color: '#ff6666', fontSize: 30 }}>CAR AUCTION</Text>
        <TextInputForm placeholder="Username" name="ios-person" />
        <TextInputForm placeholder="Password" name="md-finger-print" secureTextEntry={true} />

        <RoundButton title="로그인" onPress={() => this.props.navigation.navigate('TabNav')} />

        <Text style={{ color: 'gray', textAlign: 'center', lineHeight: 20, marginTop: 10 }}>
          <Text style={styles.link}>이용약관</Text>과&nbsp;
          <Text style={styles.link}>개인정보취급정책</Text>에 동의하실경우,{'\n'}새계정을 만들어 주세요.{'\n'}</Text>
        <Text style={{ color: 'skyblue', textDecorationLine: 'underline' }} onPress={this._onPressLink}>
          처음 사용하시나요?</Text>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    textDecorationLine: 'underline'
  }
});