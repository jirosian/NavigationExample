// BackgroundMusic.js
import React, { useEffect } from "react";
import { Audio } from "expo-av";

// 音楽インスタンスをグローバルに保持
let sound;

export default function BackgroundMusic({ source }) {
  // 音楽を再生する関数
  async function playSound() {
    // すでにサウンドが再生中であれば、新しいインスタンスを作成しない
    if (!sound) {
      const { sound: newSound } = await Audio.Sound.createAsync(source);
      sound = newSound;
      await sound.playAsync();
      sound.setIsLoopingAsync(true); // 繰り返し再生
    }
  }

  useEffect(() => {
    playSound();

    return () => {
      // コンポーネントがアンマウントされた時にサウンドを解放
      if (sound) {
        sound.unloadAsync();
        sound = null; // グローバル変数をリセット
      }
    };
  }, [source]);

  return null;
}
