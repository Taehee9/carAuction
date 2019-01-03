import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import IconText from './IconText';

export default class MyCarListItem extends React.Component {
    render() {
        return (
            <View style={[styles.container, { justifyContent: 'space-around' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                    <View style={{ width: 110, height: 80 }}>
                        <Image style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={{ uri: this.props.carImage }} />
                    </View>
                    <View style={{ marginLeft: '5%', width: 100 }}>
                        <Text style={styles.fontL}>{this.props.carName}</Text>
                    </View>
                </View>
                <View>
                    <View style={{ flexDirection: 'column', width: 150 }}>
                        <View style={styles.iconContainer}>
                            <IconText name="ios-calendar" title={`${this.props.carSpecies} _ ${this.props.carYear}`}></IconText>
                        </View>
                        <View style={styles.iconContainer}>
                            <IconText name="ios-construct" title={this.props.carManufacturer}></IconText>
                        </View>
                    </View>
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
        fontSize: 20
    },
    fontS: {
        fontSize: 15,
        color: 'gray'
    },
    iconContainer: {
        flexDirection: 'row',
    }
});
