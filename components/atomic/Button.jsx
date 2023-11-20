import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

// low fidelity or problem in fidelity (problema de fidelidade de cores)
const CustomButton = ({ onPress, title }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

// solve problem UI no fidelity (modo de resolução com condição para plataforma)
const CustomButton = ({ onPress, title }) => (
  <TouchableOpacity
    style={[
      styles.button,
      { borderColor: Platform.OS === "ios" ? "blue" : "green" },
    ]}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default Button;
