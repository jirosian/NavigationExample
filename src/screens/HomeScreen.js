import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from "react-native";
import * as ImagePicker from "expo-image-picker";
import TributeMessage from "./TributeMessage";
import BackgroundMusic from "../components/BackgroundMusic";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firestore, storage, auth } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import RainbowAnimation from "../components/RainbowAnimation"; // 虹のアニメーションコンポーネントをインポート
import BubbleAnimation from "../components/BubbleAnimation"; // シャボン玉アニメーションをインポート


export default function HomeScreen({ navigation }) {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    console.log("Image Picker Result:", result);

    if (!result.canceled && result.assets) {
      const newImages = [];
      for (const asset of result.assets) {
        const imageUri = asset.uri;
        const userId = auth.currentUser?.uid;
        if (userId) {
          const fileName = imageUri.split('/').pop();
          const imageRef = ref(storage, `images/${userId}/${Date.now()}-${fileName}`);

          const response = await fetch(imageUri);
          const blob = await response.blob();

          // アップロードタスクを作成
          const uploadTask = uploadBytesResumable(imageRef, blob);

          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              console.error("Upload failed:", error);
              Alert.alert("Error", "Failed to upload image.");
            },
            async () => {
              // アップロードが完了したら、ダウンロードURLを取得
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              newImages.push({ uri: downloadURL, size: getRandomSize() });

              // Firestoreに画像情報を保存
              const userImagesRef = collection(firestore, "users", userId, "images");
              await addDoc(userImagesRef, {
                url: downloadURL,
                uploadedAt: new Date(),
              });

              // 画面に反映
              setImages((prevImages) => [...prevImages, { uri: downloadURL, size: getRandomSize() }]);
            }
          );
        }
      }
    }
  };

  const getRandomSize = () => {
    const sizes = [
      { width: 120, height: 120 },
      { width: 180, height: 120 },
      { width: 120, height: 180 },
      { width: 180, height: 180 },
    ];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  const deleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleDeleteMode = () => {
    setDeleteMode(!deleteMode);
  };

  return (
    <View style={styles.container}>
      <BackgroundMusic source={require("../../assets/calm-and-soft-piano-music-250818.mp3")} />
      <RainbowAnimation /> 
      <BubbleAnimation />

      <Text style={styles.text}>Home Screen</Text>
      <TributeMessage />
      <Button title="Upload Image" onPress={pickImage} color="#7BAF9F" />
      <Button title={deleteMode ? "Cancel Delete" : "Delete Mode"} onPress={handleDeleteMode} color="#FF6B6B" />

      <ScrollView contentContainerStyle={styles.imageContainer}>
        {images.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => (deleteMode ? deleteImage(index) : setSelectedImage(item.uri))}
            style={styles.collageImageWrapper}
          >
            <Image source={{ uri: item.uri }} style={[styles.collageImage, item.size]} />
            {deleteMode && <View style={styles.deleteOverlay}><Text style={styles.deleteText}>X</Text></View>}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={!!selectedImage} transparent={true} onRequestClose={() => setSelectedImage(null)}>
        <TouchableOpacity style={styles.modalBackground} onPress={() => setSelectedImage(null)}>
          <Image source={{ uri: selectedImage }} style={styles.modalImage} />
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C6D7C3",
    paddingTop: 50,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#567B74",
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingTop: 20,
  },
  collageImageWrapper: {
    position: "relative",
    margin: 5,
  },
  collageImage: {
    borderRadius: 10,
    backgroundColor: "#F6ECD8",
  },
  deleteOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "90%",
    height: "80%",
    borderRadius: 10,
  },
});
