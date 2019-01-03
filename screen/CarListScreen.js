import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import ListItem from '../components/ListItem'
import Ionicons from '@expo/vector-icons/Ionicons';

export default class CarListScreen extends React.Component {
  //static은 class가 선언될 때 생김. static이 없으면 class가 인스턴스화될 때 생김.
  //static navigationOptions 에서 this.props.navigation.navigate를 못쓰는 이유는 this가 없어서!
  //왜냐면 선언되는거지 호출되는게 아니니까!!!! 그래서 navigation을 쓰려면 함수를 선언해놓으면 됨!
  //class가 사용될 때 이 함수가 실행됨!
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Car Auction',
      headerRight:
        (<TouchableOpacity style={{ paddingRight: 20 }}
          onPress={() => { navigation.navigate('RegisterCar') }}>
          < Ionicons name="ios-add" size={40} color="#ff6666" />
        </TouchableOpacity>
        ),
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    }
  }
  componentDidMount() {
    this.fetchCars().then(items => {
      this.setState({
        data: items
      })
    });
  }
  fetchCars() {
    return fetch(`http://192.168.0.76:3000/api/VehicleListing?filter={"include":"resolve"}&access_token=yqFoKtAvRrNTT6kOpNNKCb6bd5RBgMPQqrxN9DM98lifSgHiJRa8JmkXGJv569e8`)
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList style={styles.container}
          data={this.state.data}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailCar2', { itemId: item.listingId })}>
              <ListItem carName={item.vehicle.carName} carImage={item.vehicle.carImage[0]} carSpecies={item.vehicle.carSpecies}
                carManufacturer={item.vehicle.carManufacturer} carYear={item.vehicle.carYear} reservePrice={item.reservePrice} />
            </TouchableOpacity>}
          keyExtractor={(item, index) => item.listingId + index}
          ItemSeparatorComponent={() => (
            <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: 'black' }} />
          )}
          refreshing={this.state.isRefreshing}
          onRefresh={() => {
            this.setState({
              isRefreshing: true
            })
            setTimeout(() => {
              this.setState({
                isRefreshing: false,
              })
              this.fetchCars()
            }, 3000);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column'
  }
});
