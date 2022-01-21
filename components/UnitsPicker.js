import React from 'react';
import { StyleSheet , View, Platform, Picker } from 'react-native';
//import { Picker } from '@react-native-picker/picker';


export default function UnitsPicker({unitsSystem , setUnitsSystem}) {
return (
        <View style= {styles.unitsSystem}>
            <Picker 
            //style={{width: 100}}
            mode="dropdown"
            selectedValue={unitsSystem} onValueChange={(item) => setUnitsSystem(item)} >
                <Picker.Item label='C°' value='metric' />
                <Picker.Item label='F°' value='imperial' />
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    unitsSystem: {
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: -30,
            },
            android: {
                top: 30,
            },
        }),
        left: -100,
        height: 50,
        width: 100,
    },
})