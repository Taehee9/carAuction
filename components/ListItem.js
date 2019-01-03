import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import IconText from './IconText';

export default class ListItem extends React.Component {
  render() {
    return (
      <View style={[styles.container, { justifyContent: 'space-around' }]}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: 100, height: 80 }}>
            <Image style={{ width: '100%', height: '100%' }} source={{ uri: this.props.carImage }} />
          </View>
          <View style={{ flexDirection: 'column', marginLeft: '3%' }}>
            <Text style={styles.fontL}>{this.props.carName}</Text>
            <View style={[styles.iconContainer, { marginTop: '5%' }]}>
              <IconText name="ios-calendar" title={`${this.props.carSpecies}_${this.props.carYear}`}></IconText>
              <IconText name="ios-trending-up" title="2"></IconText>
            </View>
            <View style={styles.iconContainer}>
              <IconText name="ios-construct" title={this.props.carManufacturer}></IconText>
            </View>
          </View>
        </View>
        <View>
          {this.props.reservePrice ?
            <Text style={styles.fontL}>$ {this.props.reservePrice}</Text>
            : <Text style={styles.fontL}>$ 0</Text>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fontL: {
    fontSize: 25
  },
  fontS: {
    fontSize: 15,
    color: 'gray'
  },
  iconContainer: {
    flexDirection: 'row',
    fontSize: 15,
  }
});
