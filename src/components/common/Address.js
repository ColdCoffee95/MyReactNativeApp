/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Picker
} from 'react-native';

type Props = {};
export default class Address extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            provinceId: props.provinceId || '',
            cityId: props.cityId || '',
            areaId: props.areaId || '',
            provinceName: props.provinceName || '',
            cityName: props.cityName || '',
            areaName: props.areaName || '',
            addressData: [],
            provinceList: [],
            cityList: [],
            areaList: [],
        };
    }

    componentDidMount() {
        console.warn(this.props.provinceId)
        this.fetchData()
    }

    render() {
        let provinceArr = [];
        let cityArr = [];
        let areaArr = [];
        this.state.provinceList.map(value => {
            provinceArr.push(
                <Picker.Item label={value.name} value={value.value}/>
            )
        });
        this.state.cityList.map(value => {
            cityArr.push(
                <Picker.Item label={value.name} value={value.value}/>
            )
        });
        this.state.areaList.map(value => {
            areaArr.push(
                <Picker.Item label={value.name} value={value.value}/>
            )
        });
        return (
            <View style={styles.addressSelectView}>
                <Picker style={styles.pickerStyle}
                        selectedValue={this.state.provinceId + ''}
                        onValueChange={(provinceId) => {
                            this.changeProvince(provinceId);
                            let cityList = this.getCityList(provinceId);
                            this.setState({cityList: cityList});
                            this.changeCity(cityList[0].value);
                            let areaList = this.getAreaList(cityList[0].value);
                            this.setState({areaList: areaList});
                            this.changeArea(areaList[0].value);
                        }}>
                    {provinceArr}
                </Picker>
                <Picker style={styles.pickerStyle}
                        selectedValue={this.state.cityId + ''}
                        onValueChange={(cityId) => {
                            this.changeCity(cityId);
                            let areaList = this.getAreaList(cityId);
                            this.setState({areaList: areaList});
                            this.changeArea(areaList[0].value);
                        }}>
                    {cityArr}
                </Picker>
                <Picker style={styles.pickerStyle}
                        selectedValue={this.state.areaId + ''}
                        onValueChange={(areaId) => this.changeArea(areaId)}>
                    {areaArr}
                </Picker>
            </View>
        );
    }

    selectRegionList() {
        return new Promise((resolve, reject) => {
            storage.load({key: 'addressData'}).then(res => {
                resolve(res)
            }).catch(e => {
                HttpUtils.get('/region/selectRegionList', {}, data => {
                    storage.save({key: 'addressData', data: data.data.list});
                    resolve(data.data.list)
                })
            })
        });

    }

    async fetchData() {
        this.state.addressData = await this.selectRegionList();
        let provinceList = this.getProvinceList();
        this.setState({provinceList: provinceList})
        if (this.props.provinceId) {
            this.changeProvince(this.props.provinceId);
            let cityList = this.getCityList(this.props.provinceId);
            this.setState({cityList: cityList});
            this.changeCity(this.props.cityId);
            let areaList = this.getAreaList(this.props.cityId);
            this.setState({areaList: areaList});
            this.changeArea(this.props.areaId);
        } else {
            this.changeProvince(provinceList[0].value);
            let cityList = this.getCityList(provinceList[0].value);
            this.setState({cityList: cityList});
            this.changeCity(cityList[0].value);
            let areaList = this.getAreaList(cityList[0].value);
            this.setState({areaList: areaList});
            this.changeArea(areaList[0].value);
        }
    }

    getProvinceList() {
        let arr = [];
        this.state.addressData.filter(value => !value.parent).map(value => {
            arr.push(value)
        });
        return arr;
    }

    getCityList(provinceId) {
        let arr = [];
        this.state.addressData.filter(value => value.parent == provinceId).map(value => {
            arr.push(value)
        });
        return arr;
    }

    changeProvince(provinceId) {//
        this.state.provinceId = provinceId;
        this.state.provinceName = this.state.addressData.find(value => value.value == provinceId).name;
    }


    changeCity(cityId) {
        this.state.cityId = cityId;
        this.state.cityName = this.state.addressData.find(value => value.value == cityId).name;
    }

    getAreaList(cityId) {
        let arr = [];
        this.state.addressData.filter(value => value.parent == cityId).map(value => {
            arr.push(value)
        });
        return arr;
    }

    changeArea(areaId) {
        this.state.areaId = areaId;
        this.state.areaName = this.state.addressData.find(value => value.value == areaId).name;
        this.setState({
            provinceId: this.state.provinceId,
            cityId: this.state.cityId,
            areaId: this.state.areaId
        });
        this.props.onChange({
            provinceId: this.state.provinceId,
            cityId: this.state.cityId,
            areaId: this.state.areaId,
            provinceName: this.state.provinceName,
            cityName: this.state.cityName,
            areaName: this.state.areaName,
        });
    }
}

const styles = StyleSheet.create({
    pickerStyle: {
        width: screenWidth / 3,
        backgroundColor: whiteColor
    },
    addressSelectView: {
        width: screenWidth,
        flexDirection: 'row',
        backgroundColor: whiteColor
    },

});
