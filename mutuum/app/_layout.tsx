import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import "../global.css"


const RootLayout = () => {
  return (
   <Stack>
    <Stack.Screen name='index' options={{headerShown: false}} />
    <Stack.Screen name='(tabs)' options={{headerShown: false, headerTitle: "Inicio"}} />
    <Stack.Screen name='(auth)' options={{headerShown: false}} />
    <Stack.Screen name='create_loan' options={{headerShown: true, headerTitle: "Crear prestamo",  }} />
    </Stack>
  )
}

export default RootLayout