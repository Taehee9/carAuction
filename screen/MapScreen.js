import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MapView } from 'expo';

//지금 여기서 사용하지 않는 screen입니다.
export default class MapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0
        }
    }
    //dom 트리에 mount 되고 나서 실행되는 함수 / 화면에 보여지고 나서 실행되는 함수
    componentDidMount() {
        //navigator.geolocation.getCurrentPosition(success, error, options)
        //success, error를 외부 GPS에 넘겨줌 - 즉, 다음 줄 실행하는 동안 외부 GPS에서 GPS 찾음!
        navigator.geolocation.getCurrentPosition(
            //함수 선언만 한 것! - 실행까지 해버리면 자바스크립트는 한줄씩 실행하기 때문에 성공하지 않으면 넘어가지 않음
            //그래서 함수 선언 후 getCurrentPosition에 넘겨서 다 되면 실행해라
            (position) => {
                // Coordinates 객체, 현재의 위치를 정의하는 객체
                const { coords } = position;
                //setState가 있어야 다시 rendering하는 것
                //setState에서 object 형태! - object 형태로 state에 덮어씌워짐!
                //그래서 this.state={} 이부분에 정의를 안해줘도 상관은 없는 것! 하지만 정의해주는 것이 좋음
                this.setState({
                    latitude: coords.latitude,
                    longitude: coords.longitude
                });
            },
            (error) => { alert(error.message) },
            {
                //정확도 높게 받을 건지 물어보는 값
                enableHighAccuracy: true,
                //위치의 값을 받을 때까지 최대한 대기할 값
                timeout: 20000,
                //캐시된 위치 값을 받아도 되는 최대한의 대기 값 
                maximumAge: 1000
            }
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            const { coords } = position;
            this.setState({
                latitude: coords.latitude,
                longitude: coords.longitude
            });
        });
    }
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.latitude ?
                    <MapView style={{ height: '60%', width: '100%' }}
                        region={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.0022,
                            longitudeDelta: 0.0021
                        }}
                        showsUserLocation={true}
                    />
                    : <Text>위치 불러오는 중...</Text>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    }
});