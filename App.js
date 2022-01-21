import { StatusBar } from 'expo-status-bar';
import React , { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';
import { colors } from './utils/index';
import ReloadIcon from './components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails';
import { WEATHER_API_KEY } from 'react-native-dotenv'

//const WEATHER_API_KEY = 'a9da47cadc13a1e3521454cac90e77e6'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather , setCurrentWeather] = useState(null)
  const [unitsSystem , setUnitsSystem] = useState('metric')

  useEffect(() => {
    load()
}, [unitsSystem])
  
  async function load() {
    setCurrentWeather(null)
    setErrorMessage(null)
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()   

      if(status !== 'granted') {
        setErrorMessage('Access to location is needed to run the app')
        return 
      }
      const location = await Location.getCurrentPositionAsync()

      const { latitude, longitude } = location.coords

       //alert(`Latitude : ${latitude} , Longitude : ${longitude}`)

      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`

      const response = await fetch(weatherUrl)      

      const result = await response.json()

      if(response.ok) {
        setCurrentWeather(result)
      }   
      else {
        setErrorMessage(result.message)
      }

    } catch (error) {
      setErrorMessage(error.message)
    }
  } 
  if(currentWeather) {
    /*const { 
      main : {temp} ,
      } = currentWeather*/
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
          <View style = {styles.reloadError}>
            <ReloadIcon load={load} />          
          </View>           
          <View style = {styles.main}>
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
            <WeatherInfo currentWeather={currentWeather} />
          </View> 
            <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem} />   
        </View>
    )
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
          <ReloadIcon load={load} />
          <Text style={{ textAlign: 'center' }}>{errorMessage}</Text>
          <StatusBar style="auto" />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <StatusBar style="auto" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {
        justifyContent: 'center',
        flex: 1, 
    },
    reloadError: {
      right: -200,
    },
})