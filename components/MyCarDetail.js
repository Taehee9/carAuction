import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import IconText from '../components/IconText';

export default class MyCarDetail extends React.Component {
    //prop 초기화해주는 것
    static defaultProps = {
        carImage: []
    }
    render() {
        const data = [
            { key: 'a', name: 'ios-barcode', title: this.props.vin },
            { key: 'b', name: 'ios-construct', title: this.props.carManufacturer },
            { key: 'c', name: 'ios-car', title: this.props.carSpecies },
            { key: 'd', name: 'ios-calendar', title: this.props.carYear }
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
                            this.props.carImage.map((image, index) => {
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
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
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