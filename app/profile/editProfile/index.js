import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import axios from 'axios';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Icon, Box, Input, NativeBaseProvider, Center, Image, Text, Button, Divider, View} from 'native-base';
import {Link, useRouter, useSearchParams} from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import FooterMenu from '../../../components/footerTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';

const editProfile = () => {
  const router = useRouter();
  // const {id} = useSearchParams();
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async () => {
    try {
      const idUser = await AsyncStorage.getItem('id');
      const formData = new FormData();
      formData.append('name', name);
      if (photo) {
        formData.append('photo', {
          uri: photo,
          name: 'photo.jpg',
          type: 'image/jpeg',
        });
      }
      const response = await axios.put(`https://food-recipe-server-six.vercel.app/user/profile/${idUser}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('API Response:', response.data);
      router.push('/profile');
    } catch (error) {
      console.log(err);
    }
  };

  const handlePickPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Allow Camera!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setPhoto(pickerResult.uri);
    }
  };

  return (
    <NativeBaseProvider>
      <Box style={styles.container} marginTop="12">
        <Link href="/profile">
          <Box borderRadius="4" backgroundColor="#F8F8FA" padding="2">
            <Icon size="7" as={<FeatherIcon name="chevron-left" />} />
          </Box>
        </Link>
        <Center marginTop="-9">
          <Text color="#EFC81A" fontWeight="bold" fontSize="2xl">
            Edit Profile{' '}
          </Text>
        </Center>{' '}
      </Box>
      <Box style={styles.container}>
        <View paddingX="4">
          <Text fontSize="2xl">Change Profile Picture </Text>
          <Box marginY={4}>
            <>
              <Input InputLeftElement={<Icon as={<FeatherIcon name="user" />} margin="4" />} style={styles.form} backgroundColor="white" marginBottom="4" placeholder="Change Name" onChangeText={setName} value={name} />
              <View style={{backgroundColor: '#fff', borderRadius: 10, width: 350}}>
                <TouchableOpacity onPress={handlePickPhoto} style={{flexDirection: 'row', alignItems: 'center', marginVertical: 15}}>
                  <Icon as={<FeatherIcon name="image" />} size={7} ml="5" color="muted.500" />
                  <Text style={{marginLeft: 10, fontSize: 13, fontWeight: '200'}}>Add Image</Text>
                </TouchableOpacity>
                <Center>{photo && <Image alt="imgUser" source={{uri: photo}} style={{width: 80, height: 80, marginBottom: 8}} />}</Center>
              </View>
              <Button backgroundColor="#EFC81A" onPress={handleSubmit}>
                <Text color="#FFFFFF" fontWeight="semibold" textAlign="center">
                  Change Profile{' '}
                </Text>
              </Button>
            </>
          </Box>
          <Divider my="2" />
        </View>
      </Box>
      <FooterMenu />
    </NativeBaseProvider>
  );
};

export default editProfile;

const styles = StyleSheet.create({
  icon: {
    size: '32px',
  },
  container: {
    padding: 12,
  },
  form: {
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
  },
});
