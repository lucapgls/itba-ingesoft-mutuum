import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native';
import {Link} from 'expo-router';
import SignIn from './(auth)/sign-in';
import SignUp from './(auth)/sign-up';

export default function App() {
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Text className='text-3xl'>Mutuum (index)</Text>
      <StatusBar style="auto" />
      {/* <Link href="/home" style={{color: 'blue'}}> Go to home</Link> */}
      <SignUp/>
      <SignIn/>
      {/* <Link href="/auth/sign-in" style={{color: 'blue'}}> Go to sign-in</Link> */}
    </View>
  );
}
