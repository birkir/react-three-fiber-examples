import React from 'react';
import { View, Button, YellowBox } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { useScreens } from 'react-native-screens';
import { Stars } from './src/screens/Stars';
import { Physics } from './src/screens/Physics';
import { Reparenting } from './src/screens/Reparenting';
import { MultiRender } from './src/screens/MultiRender';
import { Montage } from './src/screens/Montage';
import { Font } from './src/screens/Font';
import { Lines } from './src/screens/Lines';
import { MeshLine } from './src/screens/MeshLine';

useScreens();

YellowBox.ignoreWarnings([
  'Accessing view manager configs',
  'Warning: Can\'t perform a React state update'
]);

window.performance = {
  clearMarks() {},
  measure() {},
  clearMeasures() {},
  mark() {},
}

const menuItems = [
  { key: 'Physics', value: 'Physics' },
  { key: 'Stars', value: 'Stars' },
  { key: 'Reparenting', value: 'Reparenting' },
  { key: 'MultiRender', value: 'Multi Render'},
  { key: 'Montage', value: 'Montage' },
  { key: 'Font', value: 'Font' },
  { key: 'Lines', value: 'Lines' },
  { key: 'MeshLine', value: 'MeshLine' },
];

function Main(props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {menuItems.map(({ key, value }) => (
        <Button key={key} title={value} onPress={() => props.navigation.push(key)} />
      ))}
    </View>
  );
}

Main.navigationOptions = {
  title: 'react-three-fiber examples',
};

const AppNavigator = createStackNavigator({
  Main,
  Physics,
  Stars,
  Reparenting,
  MultiRender,
  Montage,
  Font,
  Lines,
  MeshLine,
}, {
  initialRouteName: 'Main',
});

export default createAppContainer(AppNavigator);