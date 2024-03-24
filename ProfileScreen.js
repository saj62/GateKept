import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, TextInput, ScrollView, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [description, setDescription] = useState('');
  const [postedPictures, setPostedPictures] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfilePic(result.uri);
    }
  };

  const handlePostPicture = () => {
    // Logic to post picture
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={profilePic ? { uri: profilePic } : require('./defaultProfilePic.png')} style={styles.profilePic} />
        <Button title="John Doe" onPress={pickImage} color = '#606C38'/>
      </View>
      <TextInput
        style={styles.descriptionInput}
        multiline
        placeholder="Write a description..."
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <Button title="Post Picture" onPress={handlePostPicture} color = '#606C38'/>
      <View style={styles.postedPicturesContainer}>
        {/* Display posted pictures */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F0EDDB',
    alignItems: 'flex-start'
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    backgroundColor: '#F0EDDB', 
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: 390,
    marginBottom: 5,
    minHeight: 100
  },
  postedPicturesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default ProfileScreen;
