import { View, Text, Image, ImageSourcePropType, StyleSheet } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import {icons} from '../../constants'
import { Platform } from 'react-native';



const TabIcon = ({ icon, iconFocused, color, name, focused }: { icon: ImageSourcePropType, iconFocused: ImageSourcePropType, color: string, name: string, focused: boolean }) => {
  return (
    <View style={styles.container}>
      <Image
        source={focused ? iconFocused : icon}
        resizeMode='contain'
        style={[styles.icon, { tintColor: color }]}
      />
      <Text style={[styles.text, { color: color }]}>{name}</Text>
    </View>
  );
};

const tabBarHeight = Platform.OS === 'ios' ? 90 : 70;

const TabsLayout = () => {
  return (
    <>
    <Tabs screenOptions={
        {
            tabBarActiveTintColor: '#FFF',
            tabBarInactiveTintColor: '#c8b5ff',
           tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: '#8E66FF',
                height: tabBarHeight,
                borderTopWidth: 0,
               
                shadowColor: '#000000',
                shadowOpacity: 0.1,
                shadowRadius: 10,
            },
        }
    }>
        <Tabs.Screen name='home' options={{title: 'Home',
            headerShown: false,
            headerLeft: () => null,
            tabBarIcon: ({color, focused}) => (
                <TabIcon icon={icons.home} iconFocused={icons.homeFocus} color={color} name='Home' focused={focused} />
            )
            }}
         />
         <Tabs.Screen name='explore' options={{title: 'Explore',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
                <TabIcon icon={icons.explore} iconFocused={icons.exploreFocus} color={color} name='Explore' focused={focused} />
            )
            }}
         />
          <Tabs.Screen name='myloans' options={{title: 'My Loans',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
                <TabIcon icon={icons.loan} iconFocused={icons.loanFocus} color={color} name='My Loans' focused={focused} />
            )
            }}
         />
          <Tabs.Screen name='profile' options={{title: 'Profile',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
                <TabIcon icon={icons.profile} iconFocused={icons.profileFocus} color={color} name='Profile' focused={focused} />
            )
            }}
         />
        
    </Tabs>
    </>
  )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
    },
    icon: {
      width: 32, // Tailwind's w-6 is 24px
      height: 32, // Tailwind's h-6 is 24px
    },
    text: {
      fontSize: 12,
    },
  });

export default TabsLayout