import React from "react";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const KeyboardAvoidingContainer = ({ children }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll={true}
        extraScrollHeight={Platform.OS === "ios" ? 40 : 200} // ⬆ gives lift to focused input
        keyboardOpeningTime={0}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default KeyboardAvoidingContainer;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 100, // extra bottom space so last inputs scroll above keyboard
  },
});
