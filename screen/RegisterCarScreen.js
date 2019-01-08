import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, View, TouchableOpacity, Image } from 'react-native';
import TextInputForm from '../components/TextInputForm'
import RoundButton from '../components/RoundButton';
import { Ionicons } from '@expo/vector-icons';
import { ImagePicker } from 'expo';
import { connect } from 'react-redux';

class RegisterCarScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Register My Car',
      headerRight:
        (<TouchableOpacity style={{ paddingRight: 20 }}
          onPress={() => { navigation.navigate('TabNav') }}>
          < Ionicons name="ios-close" size={40} color="#ff6666" />
        </TouchableOpacity>
        ),
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      isRefreshing: false,
    }
  }
  fetchCars() {
    return fetch(`http://192.168.0.76:3000/api/Vehicle?access_token=XVwS0F1BeHKmqs1ELv2SLkvsuDcHHy6Ot6OFoH5RT1CDzbDmqVDavpEPODuYANIp`,
      {
        //이걸 안적으면 그냥 string 형태로 들어가기 때문에 꼭 적어서 json 형태라는 것을 알려줘야함!
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          $class: "org.acme.vehicle.auction.Vehicle",
          vin: this.state.vin,
          carName: this.state.carName,
          carImage: [this.state.image],
          carYear: this.state.carYear,
          carManufacturer: this.state.carManufacturer,
          carSpecies: this.state.carSpecies,
          owner: `org.acme.vehicle.auction.Member#${this.props.mem.email}`
        })
      })
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  render() {
    let { image } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={{ flexDirection: 'row' }}>
          <Ionicons name="ios-warning" size={15} color="gray" style={{ paddingRight: 10 }} ></Ionicons>
          <Text style={styles.font}>등록하시려는 차의 정보를 정확히 입력해주세요.</Text>
        </View>
        <TextInputForm placeholder="VIN" name="ios-barcode"
          onChangeText={(text) => { this.setState({ vin: text }) }}></TextInputForm>
        <TextInputForm placeholder="차 별명" name="ios-barcode"
          onChangeText={(text) => { this.setState({ carName: text }) }}></TextInputForm>
        <TextInputForm placeholder="제조사" name="ios-construct"
          onChangeText={(text) => { this.setState({ carManufacturer: text }) }}></TextInputForm>
        <TextInputForm placeholder="모델명" name="ios-car"
          onChangeText={(text) => { this.setState({ carSpecies: text }) }}></TextInputForm>
        <TextInputForm placeholder="연차" name="ios-calendar"
          onChangeText={(text) => { this.setState({ carYear: text }) }}></TextInputForm>
        <View style={{ height: 5 }} />
        <TouchableOpacity onPress={this._pickImage}>
          <View style={{
            width: 300, height: 150, backgroundColor: '#EAEAEA',
            justifyContent: 'center', alignItems: 'center'
          }} >
            {image &&
              <Image source={{ uri: image }} style={{ width: 300, height: 150, resizeMode: 'cover' }} />
            }
            <View style={{
              position: 'absolute', left: 280, top: 125, borderWidth: StyleSheet.hairlineWidth, borderColor: 'black',
              backgroundColor: 'white', opacity: 0.8, width: 30, height: 30, borderRadius: 15,
              justifyContent: 'center', alignItems: 'center'
            }}>
              <Ionicons name="ios-camera" size={25} color="black"></Ionicons>
            </View>
          </View>
        </TouchableOpacity>

        <View style={{ height: 10 }} />
        <RoundButton title="+ 등록하기"
          onPress={() => { this.fetchCars().then(() => { this.props.navigation.navigate('Home1') }) }}>
        </RoundButton>
      </KeyboardAvoidingView >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mem: state.mem
  }
}
export default connect(mapStateToProps)(RegisterCarScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  font: {
    fontSize: 15,
    color: 'gray'
  }
});