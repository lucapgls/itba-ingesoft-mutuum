import { View, Text, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import {icons} from '../../constants'
import { Platform } from 'react-native';


const TabIcon = ({icon, color, name, focused}: {icon: ImageSourcePropType, color: string, name: string, focused: boolean}) => {
    return(
        <View className='items-center justify-center gap-2'>
            <Image
            source={icon}
            resizeMode='contain' 
            tintColor={color}
            className="w-6 h-6"
            />
            <Text style={{color: color, fontSize: 12, }}>{name}</Text>
        </View>
    )

}

const tabBarHeight = Platform.OS === 'ios' ? 100 : 70;

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
                <TabIcon icon={icons.home} color={color} name='Home' focused={focused} />
            )
            }}
         />
         <Tabs.Screen name='explore' options={{title: 'Explore',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
                <TabIcon icon={icons.home} color={color} name='Explore' focused={focused} />
            )
            }}
         />
          <Tabs.Screen name='myloans' options={{title: 'My Loans',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
                <TabIcon icon={icons.home} color={color} name='My Loans' focused={focused} />
            )
            }}
         />
          <Tabs.Screen name='profile' options={{title: 'Profile',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
                <TabIcon icon={icons.home} color={color} name='Profile' focused={focused} />
            )
            }}
         />
        
    </Tabs>
    </>
  )
}

export default TabsLayout