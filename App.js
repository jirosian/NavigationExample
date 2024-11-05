import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import AICounselingScreen from "./src/screens/AICounselingScreen"; 


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// AuthStack: SignInScreen과 SignUpScreen을 포함
function AuthStack({ setIsSignedIn }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn">
        {(props) => <SignInScreen {...props} setIsSignedIn={setIsSignedIn} />}
      </Stack.Screen>
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

// MainTabs: HomeScreen과 SettingsScreen을 포함
function MainTabs({ setIsSignedIn }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Counseling" component={AICounselingScreen} />
      <Tab.Screen name="Settings">
        {(props) => <SettingsScreen {...props} setIsSignedIn={setIsSignedIn} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <NavigationContainer>
      {isSignedIn ? (
        <MainTabs setIsSignedIn={setIsSignedIn} />
      ) : (
        <AuthStack setIsSignedIn={setIsSignedIn} />
      )}
    </NavigationContainer>
  );
}
