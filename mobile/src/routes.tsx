import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./pages/Home";
import Points from "./pages/Points";
import Detail from "./pages/Detail";

const ApplicationStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <ApplicationStack.Navigator headerMode="none" screenOptions={{
        cardStyle: {
          backgroundColor: "#F0F0F5",
        }
      }}>
        <ApplicationStack.Screen name="Home" component={Home} />
        <ApplicationStack.Screen name="Points" component={Points} />
        <ApplicationStack.Screen name="Detail" component={Detail} />
      </ApplicationStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;