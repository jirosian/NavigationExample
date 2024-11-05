// RainbowAnimation.js
import React, { useEffect } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function RainbowAnimation() {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000, // 3秒で虹が現れる
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);
  

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.rainbowContainer, { opacity: fadeAnim }]}>
        <LinearGradient
          colors={[
            "rgba(255, 182, 193, 0.4)",  // ピンク
            "rgba(255, 223, 186, 0.4)",  // オレンジ
            "rgba(255, 255, 204, 0.4)",  // 黄色
            "rgba(204, 255, 204, 0.4)",  // 緑
            "rgba(204, 229, 255, 0.4)",  // 青
            "rgba(204, 204, 255, 0.4)",  // 藍
            "rgba(229, 204, 255, 0.4)"   // 紫
          ]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0.3 }}
          end={{ x: 0.5, y: 1 }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    
  },
  rainbowContainer: {
    width: 400,
    height: 200,
    overflow: "hidden",
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    marginTop: 100, // 上部に少し余白を持たせる
  },
  gradient: {
    width: "100%",
    height: "100%",
  },
});
