import React from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, View, TouchableOpacity, Image } from 'react-native';
import TextInputForm from '../components/TextInputForm'
import RoundButton from '../components/RoundButton';
import { Ionicons } from '@expo/vector-icons';
import { ImagePicker } from 'expo';

export default class RegisterUser extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Register User',
            headerRight:
                (<TouchableOpacity style={{ paddingRight: 20 }}
                    onPress={() => { navigation.navigate('TabNav') }}>
                    < Ionicons name="ios-close" size={40} color="#ff6666" />
                </TouchableOpacity>
                ),
        };
    }
    
    render() {
        let { image } = this.state;
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={{ flexDirection: 'row' }}>
                    <Ionicons name="ios-warning" size={15} color="gray" style={{ paddingRight: 10 }} ></Ionicons>
                    <Text style={styles.font}>각 정보들을 입력해주십시오</Text>
                </View>
                <TextInputForm placeholder="ID" name="ios-barcode"
                   ></TextInputForm>
                <TextInputForm placeholder="Password" name="ios-barcode"
                    ></TextInputForm>
                <TextInputForm placeholder="User Name" name="ios-construct"
                    ></TextInputForm>
                // <TextInputForm placeholder="생일" name="ios-car"></TextInputForm>
                <RoundButton title="+ 회원가입"
                    onPress={() => { this.fetchCars() }}>
                </RoundButton>
            </KeyboardAvoidingView >
        );
    }
}

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
    }
});