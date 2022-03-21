import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const LadingPage = () => {
    return (
        <View   style={styles.container}> 
            <Text> this is the landing page</Text>
        </View>
    )
}

export default LadingPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },

})
