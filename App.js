import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { style } from 'style.js';

// Component reusable (reutilizável)
import { Button } from './components/atomic/Button.js';

export default function App() {
  return (
    <View style={style.container}>
      <Button
        onPress={() => {
          // press event
        }}
        onLongPress={() => {
          // long press event
        }}
        title="Button"
        iconLeft={}
        iconRight={}
        style={styles.customButton}
        textStyle={styles.customButtonText}
      />
    </View>
  );
}
