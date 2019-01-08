import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import ListItem from '../components/ListItem'
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationEvents } from 'react-navigation';

export default class CarListScreen extends React.Component {
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
    return fetch(`http://192.168.0.76:3000/api/VehicleListing?filter={"include":"resolve"}&access_token=XVwS0F1BeHKmqs1ELv2SLkvsuDcHHy6Ot6OFoH5RT1CDzbDmqVDavpEPODuYANIp`)
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => {
            this.fetchCars().then(items => {
              this.setState({
                data: items
              })
            })
          }} />
        {
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
                this.fetchCars().then(items => {
                  this.setState({
                    data: items
                  })
                });
              }, 3000);
            }}
          />
        }
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
