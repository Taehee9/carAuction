import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import MyCarListItem from '../components/MyCarListItem'
import Ionicons from '@expo/vector-icons/Ionicons';

export default class MyCarListScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'My Cars',
            headerRight:
                (<TouchableOpacity style={{ paddingRight: 20 }}
                    onPress={() => { navigation.navigate('RegisterCar') }}>
                    < Ionicons name="ios-add" size={40} color="#ff6666" />
                </TouchableOpacity>
                ),
        };
    }
    componentDidMount() {
        this.fetchCars().then(items => {
            this.setState({
                data: items
            })
        });
    }
    fetchCars() {
        return fetch(`http://192.168.0.76:3000/api/Vehicle?access_token=yqFoKtAvRrNTT6kOpNNKCb6bd5RBgMPQqrxN9DM98lifSgHiJRa8JmkXGJv569e8`)
            .then(response => response.json())
            .catch(error => {
                console.error(error);
            });
    }
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList style={styles.container}
                    data={this.state.data}
                    renderItem={({ item }) => <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailCar1', { itemId: item.vin })}>
                        <MyCarListItem
                            carName={item.carName} carImage={item.carImage[0]}
                            carSpecies={item.carSpecies} carYear={item.carYear}
                            carManufacturer={item.carManufacturer} />
                    </TouchableOpacity>}

                    ItemSeparatorComponent={() => (
                        <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: 'black' }} />
                    )}
                    keyExtractor={(item, index) => item.vin + index}
                    refreshing={this.state.isRefreshing}
                    onRefresh={() => {
                        this.setState({
                            isRefreshing: true
                        })
                        setTimeout(() => {
                            this.setState({
                                isRefreshing: false
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
