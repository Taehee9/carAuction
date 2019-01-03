import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class RoundButton extends React.Component {
    render() {
        return (
            <TouchableOpacity hitSlop={{
                top: 20,
                bottom: 20,
                left: 0,
                right: 0
            }}
                onPress={this.props.onPress}
                style={{ borderRadius: 5, backgroundColor: '#ff6666', width: '80%', height: 40 }}>
                <Text style={[{ color: 'white', textAlign: 'center', fontSize: 15, margin: 10 }, this.props.style]}>
                    {this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}