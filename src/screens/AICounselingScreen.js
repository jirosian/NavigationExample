import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import axios from "axios";

export default function AICounselingScreen() {
  const [inputText, setInputText] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleSendMessage = async () => {
    if (inputText.trim() === "") return;

    // ユーザーの入力を会話に追加
    const newMessage = { text: inputText, sender: "user" };
    setConversation((prevConversation) => [...prevConversation, newMessage]);

    try {
      // Wit.ai APIリクエストの設定
      const response = await axios.get("https://api.wit.ai/message", {
        params: { q: inputText },
        headers: {
          Authorization: `Bearer NZOPOH7DHBME64FYPE4QBNTJ5HH5IZ7D`, // ここにWit.aiのサーバーアクセストークンを入力
        },
      });

      // Wit.aiの返答を会話に追加
      const aiMessage = {
        text: response.data.text, // Wit.aiからの応答
        sender: "ai",
      };
      setConversation((prevConversation) => [...prevConversation, aiMessage]);
    } catch (error) {
      console.error("APIリクエストエラー:", error);
    }

    // 入力欄をクリア
    setInputText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Counseling</Text>
      <ScrollView style={styles.conversationContainer}>
        {conversation.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              message.sender === "user" ? styles.userBubble : styles.aiBubble,
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="How are you feeling today?"
      />
      <Button title="Send" onPress={handleSendMessage} color="#7BAF9F" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C6D7C3",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#567B74",
    marginBottom: 20,
    textAlign: "center",
  },
  conversationContainer: {
    flex: 1,
    marginBottom: 10,
  },
  messageBubble: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#A4D4AE",
  },
  aiBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#F0D9FF",
  },
  messageText: {
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: "#7BAF9F",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
});
