import React from 'react';
import { StyleSheet, View, Image, ScrollView, SectionList, Text } from 'react-native';
import IconText from '../components/IconText';
import AuctionCarList from '../components/AuctionCarList';
import moment from 'moment';

export default class DetailCarScreen extends React.Component {
  static defaultProps = {
    member: {}
  }
  componentDidMount() {
    this.fetchCars().then(listing => {
      this.setState({
        vehicleData: listing.vehicle,
        offers: listing.offers,
        description: listing.description
      })
    });
  }
  fetchCars() {
    const itemId = this.props.navigation.getParam('itemId');
    return fetch(`http://192.168.0.76:3000/api/VehicleListing/${itemId}?filter={"include":"resolve"}&access_token=XVwS0F1BeHKmqs1ELv2SLkvsuDcHHy6Ot6OFoH5RT1CDzbDmqVDavpEPODuYANIp`)
      .then(response => response.json())
      .catch(error => {
        console.error(error);
      });
  }
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      vehicleData: {
        carImage: []
      },
      offers: []
    }
  }
  render() {
    const data = [
      { key: 'a', name: 'ios-barcode', title: this.state.vehicleData.vin },
      { key: 'b', name: 'ios-construct', title: this.state.vehicleData.carManufacturer },
      { key: 'c', name: 'ios-car', title: this.state.vehicleData.carSpecies },
      { key: 'd', name: 'ios-calendar', title: this.state.vehicleData.carYear }
    ]
    const items = data.map((item) => {
      return (
        <View style={styles.cont} key={item.key}>
          <IconText name={item.name} title={item.title} style={{ paddingRight: '10%' }}></IconText>
        </View>
      );
    })
    return (
      <View style={styles.container}>
        <View style={{ height: 200, width: 355, marginLeft: 10 }}>
          <ScrollView horizontal="true" pagingEnabled="true" showsHorizontalScrollIndicator="false">
            {
              this.state.vehicleData.carImage.map((image, index) => {
                return <Image key={index} style={{ width: 355, height: 200 }} source={{ uri: image }} />
              })
            }
          </ScrollView>
        </View>
        <View style={{ width: '100%', marginTop: '5%' }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <View style={styles.line} />
            {items}
          </View>
          <View style={{ paddingLeft: 15, paddingTop: 10 }}>
            <Text style={{ fontSize: 15, color: 'gray' }}> 차에 대한 간단한 설명 : {this.state.description} </Text>
          </View>
        </View>
        <SectionList
          stickySectionHeadersEnabled="true"
          keyExtractor={(item, index) => item + index}
          sections={[
            {
              title: '경매 진행중',
              data: this.state.offers
            }
          ]}
          renderSectionHeader={({ section: { title } }) => (
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              <Text style={{ color: '#ff6666', fontSize: 20 }}>{title}</Text>
            </View>
          )}
          renderItem={({ item }) => <AuctionCarList bidPrice={item.bidPrice} mem={item.member.firstName}
            day={moment(item.timestamp).fromNow()}></AuctionCarList>}
          ItemSeparatorComponent={() => (
            <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: 'gray', marginLeft: 10, marginRight: 10 }} />
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
    paddingTop: 10
  },
  cont: {
    width: '50%',
    height: 30,
    paddingLeft: '5%'
  },
  line: {
    position: 'absolute',
    height: '80%',
    width: StyleSheet.hairlineWidth,
    left: '50%',
    backgroundColor: 'gray'
  }
});