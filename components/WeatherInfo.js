import React from 'react';
import { View, Text , StyleSheet, Image } from 'react-native';
import { colors } from '../utils/index';

const {PRIMARY_COLOR, SECONDARY_COLOR} = colors

export default function WeatherInfo({currentWeather}) {
    const {
        main : {temp}, 
        weather: [details], 
        name,  
    } = currentWeather
    const { icon, main , description } = details
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
    return (
        <View sytle={styles.weatherInfo}>  
            <Text>{name}</Text>
            <Image style ={styles.weatherIcon} source={{ uri: iconUrl }} />
            <Text style={styles.textPrimary}>{temp}°</Text>
            <Text style={styles.weatherDescription}>{description}</Text>
            <Text style={styles.textSecondary}>{main}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherInfo: {
        alignItems: 'center',
    },

    weatherDescription: {
        textTransform: 'capitalize',
        textAlign: 'center',
    },

    weatherIcon: {
        width: 150,
        height: 200,    
        alignItems : 'center',
    },

    textPrimary: {
        fontSize: 40,
        color: PRIMARY_COLOR,
        textAlign: 'center',
    },

    textSecondary: {
        fontSize: 20,
        color: SECONDARY_COLOR,
        fontWeight: '500',
        marginTop: 10,
        textAlign: 'center',
    },


})