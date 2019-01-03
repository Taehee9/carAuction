import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'


export default class IconText extends React.Component {
    render() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[{ paddingRight: '5%' }, this.props.style]}>
                    {this.props.icon ?
                        this.props.icon
                        : <Ionicons name={this.props.name} size={20} color='gray' ></Ionicons>
                    }
                </View>
                <Text style={styles.font}> {this.props.title}</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    font: {
        fontSize: 15,
        color: 'gray',
    }
});

