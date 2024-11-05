import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen({ setIsSignedIn }) {
  // setIsSignedIn을 props로 받음
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("");
  const [savedUsername, setSavedUsername] = useState("");
  const [savedLanguage, setSavedLanguage] = useState("");

  // Load settings from AsyncStorage on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedUsername = await AsyncStorage.getItem("username");
        const savedLanguage = await AsyncStorage.getItem("language");

        if (savedUsername) {
          setUsername(savedUsername);
          setSavedUsername(savedUsername); // 저장된 사용자 이름 표시
        }
        if (savedLanguage) {
          setLanguage(savedLanguage);
          setSavedLanguage(savedLanguage); // 저장된 언어 표시
        }
      } catch (error) {
        console.log("Error loading settings: ", error);
      }
    };

    loadSettings();
  }, []);

  // Save settings to AsyncStorage
  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("language", language);

      // 화면에 표시할 저장된 내용을 업데이트
      setSavedUsername(username);
      setSavedLanguage(language);

      Alert.alert("Success", "Settings saved successfully!");
    } catch (error) {
      console.log("Error saving settings: ", error);
    }
  };

  // 로그아웃 버튼 핸들러
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => setIsSignedIn(false) }, // 로그아웃 시 isSignedIn을 false로 설정
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Settings</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Preferred Language"
        value={language}
        onChangeText={setLanguage}
      />

      <Button title="Save Settings" onPress={saveSettings} />

      {/* 저장된 내용 표시 */}
      <View style={styles.savedContainer}>
        <Text style={styles.savedTitle}>Saved Settings:</Text>
        <Text>Username: {savedUsername}</Text>
        <Text>Preferred Language: {savedLanguage}</Text>
      </View>

      {/* 로그아웃 버튼 추가 */}
      <Button title="Logout" color="red" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  header: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  savedContainer: {
    marginTop: 30,
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  savedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
