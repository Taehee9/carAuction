import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, Alert, View, Button } from 'react-native';
import RoundButton from '../components/RoundButton';
import TextInputForm from '../components/TextInputForm';
import { connect } from 'react-redux';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      data: []
    }
  }
  componentDidMount() {
    this.fetchMem().then(items => {
      this.setState({
        data: items
      })
    });
  }
  fetchMem() {
    return fetch(`http://192.168.0.76:3000/api/Member?access_token=XVwS0F1BeHKmqs1ELv2SLkvsuDcHHy6Ot6OFoH5RT1CDzbDmqVDavpEPODuYANIp`)
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  }
  _onPressLink() {
    Alert.alert('회원가입 페이지로 넘어가랏!!!')
  }
  loginCheck() {
    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.loginName && this.state.password) {
        if (this.state.loginName == this.state.data[i].firstName) {
          if (this.state.password == this.state.data[i].lastName) {
            this.loginConfirm(i)
            break;
          }
        }
      }
      else {
        Alert.alert('입력란을 채워주세요')
      }
    }
  }
  loginConfirm(i) {
    this.props.navigation.navigate('TabNav')
    this.props.dispatch({
      type: 'LOADED_MEM',
      mem: this.state.data[i]
    });
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={{ color: '#ff6666', fontSize: 30 }}>CAR AUCTION</Text>
        <TextInputForm placeholder="Username" name="ios-person" onChangeText={(text) => { this.setState({ loginName: text }) }} />
        <TextInputForm placeholder="Password" name="md-finger-print" secureTextEntry={true} onChangeText={(text) => { this.setState({ password: text }) }} />

        <RoundButton title="로그인" onPress={() => this.loginCheck()} />

        <Text style={{ color: 'gray', textAlign: 'center', lineHeight: 20, marginTop: 10 }}>
          <Text style={styles.link}>이용약관</Text>과&nbsp;
          <Text style={styles.link}>개인정보취급정책</Text>에 동의하실경우,{'\n'}새계정을 만들어 주세요.{'\n'}</Text>
        <Text style={{ color: 'skyblue', textDecorationLine: 'underline' }} onPress={this._onPressLink}>
          처음 사용하시나요?</Text>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    mem: state.mem
  }
}
export default connect(mapStateToProps)(LoginScreen);


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