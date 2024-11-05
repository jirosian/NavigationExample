// TributeMessage.js
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

export default function TributeMessage() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [message, setMessage] = useState("");

  const messages = [
    "Thank you for everything. I'm living well up here. Please don't worry about me.",
    "I carry all the love you gave me. I'm at peace and watching over you with a smile.",
    "Though we may be apart, my love for you remains close. Keep going; I'm cheering for you.",
    "I see your joy and your strength every day. Remember, I’m always with you in spirit.",
    "I am surrounded by light and peace. Keep your heart light, knowing I am safe and happy.",
    "Thank you for all the memories. I’m holding each one close, feeling loved and content.",
    "Your kindness and love fill my heart still. Smile for me, and know I’m with you always.",
    "Though I am far, I am never truly gone. Look to the sky, and you will find me there.",
    "Each time you laugh, I feel it too. I'm happy knowing you’re living fully, just as I am here.",
    "I’m in a place of beauty and peace. Live boldly and carry my love in your heart.",
  ];

  useEffect(() => {
    // 一度だけランダムなメッセージを設定し、フェードインを開始
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMessage);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, []); // 依存配列を空にして、再レンダリングでリセットされないようにする

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.message, { opacity: fadeAnim }]}>
        {message}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  message: {
    fontSize: 26,
    color: "#7BAF9F",
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "500",
    fontFamily: "serif",
  },
});
