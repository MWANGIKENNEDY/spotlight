import React from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  ScrollView,
} from "react-native";

const KeyboardAvoidingComponent = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.inner}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.header}>Header</Text>

          {Array.from({ length: 11 }).map((_, i) => (
            <TextInput
              key={i}
              placeholder={`Input ${i + 1}`}
              style={styles.textInput}
              returnKeyType="next"
            />
          ))}

          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={() => null} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flexGrow: 1,
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 50,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  btnContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
});

export default KeyboardAvoidingComponent;
