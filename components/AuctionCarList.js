import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class AuctionCarList extends React.Component {
    render() {
        return (
            <View style={[styles.container, { justifyContent: 'space-between' }]}>
                <View style={{ flexDirection: 'column', marginLeft: '5%' }}>
                    <Text style={styles.fontL}>$ {this.props.bidPrice}</Text>
                </View>
                <View style={{ flexDirection: 'column', width: 90, marginRight: '5%' }}>
                    <Text style={styles.fontS}>by Member {this.props.mem} {this.props.day}</Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 70,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    fontL: {
        fontSize: 20,
        color: '#4C4C4C'
    },
    fontS: {
        fontSize: 13,
        color: 'gray'
    }
});

