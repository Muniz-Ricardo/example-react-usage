import { React } from react;
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from react-native;

const Button = ({
  style,
  title,
  iconLeft,
  iconRight,
  onPress,
  onLongPress,
  textStyle,
  disabled,
  activeOpacity,
  loading,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      style={[disabled ? styles.disabledButton : styles.button, style]}
    >
      {iconLeft}
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
      {iconRight}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#42a5f5',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    disabledButton: {
      backgroundColor: 'grey',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
  });

  export default Button;
  