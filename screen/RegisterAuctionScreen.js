import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, View, TouchableOpacity, Image } from 'react-native';
import TextInputForm from '../components/TextInputForm'
import RoundButton from '../components/RoundButton';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';

class RegisterAuctionScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Register My Car to Auction',
            headerRight:
                (<TouchableOpacity style={{ paddingRight: 20 }}
                    onPress={() => { navigation.navigate('DetailCar1') }}>
                    < Ionicons name="ios-close" size={40} color="#ff6666" />
                </TouchableOpacity>
                ),
        };
    }
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    fetchCars() {
        const itemId = this.props.navigation.getParam('itemId');
        return fetch(`http://192.168.0.76:3000/api/VehicleListing?access_token=XVwS0F1BeHKmqs1ELv2SLkvsuDcHHy6Ot6OFoH5RT1CDzbDmqVDavpEPODuYANIp`,
            {
                //이걸 안적으면 그냥 string 형태로 들어가기 때문에 꼭 적어서 json 형태라는 것을 알려줘야함!
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    $class: "org.acme.vehicle.auction.VehicleListing",
                    listingId: this.props.listingId,
                    reservePrice: this.state.reservePrice,
                    description: this.state.description,
                    state: "FOR_SALE",
                    offers: [],
                    vehicle: `resource:org.acme.vehicle.auction.Vehicle#${itemId}`
                })
            })
            .then(response => response.json())
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={{ flexDirection: 'row' }}>
                    <Ionicons name="ios-warning" size={15} color="gray" style={{ paddingRight: 10 }} ></Ionicons>
                    <Text style={styles.font}>등록하시려는 차의 정보를 정확히 입력해주세요.</Text>
                </View>
                <View style={{ height: 20 }} />
                <View style={{ flexDirection: 'row', paddingRight: 180 }}>
                    <Ionicons name="ios-apps" size={20} color="gray" style={{ paddingRight: 10 }} ></Ionicons>
                    <Text style={styles.fontL}>listing Id = {this.props.listingId} </Text>
                </View>
                <View style={{ height: 10 }} />
                <TextInputForm placeholder="생각하는 최저가" icon={<FontAwesome name="money" size={15} color='gray' ></FontAwesome>}
                    onChangeText={(text) => { this.setState({ reservePrice: text }) }}></TextInputForm>
                <TextInputForm placeholder="간단한 차 설명" name="ios-megaphone"
                    onChangeText={(text) => { this.setState({ description: text }) }}></TextInputForm>
                <RoundButton title="+ 경매에 등록하기"
                    onPress={() => { this.fetchCars().then(() => { this.props.navigation.navigate('DetailCar1') }) }}>
                </RoundButton>
            </KeyboardAvoidingView >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listingId: state.listingId
    }
}
export default connect(mapStateToProps)(RegisterAuctionScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    font: {
        fontSize: 15,
        color: 'gray'
    },
    fontL: {
        fontSize: 17,
        color: 'gray'
    }
});