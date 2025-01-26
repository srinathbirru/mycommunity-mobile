import React from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./screens/Auth/Login";
import Signup from "./screens/Auth/Signup";

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Login',
  screens: {
    Login: Login,
    Signup: Signup,
  },
});

const Navigation = createStaticNavigation(RootStack);

const App = () => {
  
  return (
    // <SafeAreaView style={styles.container} >
    //   <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
    //     {/* <Login /> */}
    //     <Signup />
    //   </ScrollView>
    // </SafeAreaView>
    <Navigation />
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})