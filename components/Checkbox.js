import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Checkbox({ isChecked, onCheck }) {
  // On click of the checkbox, call the function that was passed in via the parent component
  const toggleCheck = () => {
    if (onCheck) onCheck();
  };

  return (
    <TouchableOpacity
      onPress={toggleCheck}
      style={[
        styles.checkbox,
        // Styling changes based on the state of the checkbox
        isChecked ? styles.checkedBox : styles.uncheckedBox,
      ]}
    >
      {/* If the checkbox is checked, display the checkmark */}
      {isChecked && <Ionicons name="checkmark-sharp" size={15} color="#A4B0E4"/>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 12,
    borderColor: 'white',
    justifyContent: "center",
    alignItems: "center",
  },
  checkedBox: {
    backgroundColor: "white",
  },
  uncheckedBox: {
    backgroundColor: "transparent",
    borderWidth: 2,
  },
});