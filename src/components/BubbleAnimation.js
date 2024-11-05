// BubbleAnimation.js
import React, { useEffect } from "react";
import { View, Animated, StyleSheet, Dimensions, Easing } from "react-native";

const { width, height } = Dimensions.get("window");

export default function BubbleAnimation() {
  const bubbles = Array.from({ length: 5 }).map(() => ({
    translateY: new Animated.Value(height / 2), // 初期位置を画面中央に設定
    translateX: new Animated.Value(0), // 横方向の初期位置
    opacity: new Animated.Value(1), // 初期の透明度を1（完全に見える）に設定
    size: Math.random() * 60 + 30, // ランダムなサイズ
    xPosition: Math.random() * width, // ランダムなX位置
  }));

  useEffect(() => {
    bubbles.forEach((bubble) => {
      const animateBubble = () => {
        bubble.translateY.setValue(height / 2); // 初期位置にリセット
        bubble.translateX.setValue(0); // 横方向もリセット
        bubble.opacity.setValue(1); // 透明度もリセット

        const randomXDirection = Math.random() < 0.5 ? -1 : 1; // ランダムに左か右に飛ぶ
        const randomXDistance = Math.random() * 50 * randomXDirection; // ランダムな距離を設定

        Animated.parallel([
          Animated.timing(bubble.translateY, {
            toValue: -50, // 上に移動
            duration: Math.random() * 7000 + 8000, // ランダムな速度でゆっくり上昇
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(bubble.translateX, {
            toValue: randomXDistance, // 左右に移動
            duration: Math.random() * 7000 + 10000, // 同じくゆっくり移動
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(bubble.opacity, {
            toValue: 0, // 完全に透明になる
            duration: Math.random() * 7000 + 8000, // translateYと同じ速度でフェードアウト
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start(() => animateBubble()); // アニメーション終了後に再び実行
      };

      animateBubble();
    });
  }, []);

  return (
    <View style={styles.container}>
      {bubbles.map((bubble, index) => (
        <Animated.View
          key={index}
          style={[
            styles.bubble,
            {
              width: bubble.size,
              height: bubble.size,
              borderRadius: bubble.size / 2,
              transform: [
                { translateY: bubble.translateY },
                { translateX: bubble.translateX }, // 横方向のアニメーションを追加
              ],
              opacity: bubble.opacity, // 透明度をアニメーションにリンク
              position: 'absolute',
              left: bubble.xPosition,
            },
          ]}
        >
          {/* 内部に水っぽい光と影の要素を追加 */}
          <View style={styles.innerBubble}>
            <View style={styles.lightReflection} />
          </View>
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  bubble: {
    backgroundColor: "rgba(255, 255, 255, 0.3)", // 透明感のある白色
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)", // 縁の色を少し淡く
    justifyContent: "center",
    alignItems: "center",
  },
  innerBubble: {
    width: "70%", // バブル内の光の反射サイズ
    height: "70%",
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.1)", // 内部のグラデーションに近い色
    alignItems: "center",
    justifyContent: "center",
  },
  lightReflection: {
    width: "30%", // 小さな光の反射
    height: "30%",
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // 輝きのある白色
    position: "absolute",
    top: 5,
    left: 5,
  },
});
