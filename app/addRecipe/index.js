import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Icon, Box, Input, NativeBaseProvider, Center, Text, Button, ScrollView, TextArea} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import FooterMenu from '../../components/footerTabs';
import {useState, useEffect} from 'react';
import {useRouter} from 'expo-router';
import {useDispatch} from 'react-redux';
import {createRecipeActions} from '../config/redux/actions/recipeAction';

const addRecipe = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetToken();
  }, []);

  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem('token');
    if (!dataToken) {
      router.push('/login');
    }
    const idUser = await AsyncStorage.getItem('id');
    setUserId(idUser);
  };

  const [userId, setUserId] = useState();
  const [recipes_title, setRecipes_title] = useState('');
  const [recipes_ingredients, setRecipes_ingredients] = useState('');
  const [recipes_photo, setRecipes_photo] = useState(null);
  const [recipes_video, setRecipes_video] = useState('');

  const handleSubmit = async () => {
    dispatch(createRecipeActions(recipes_title, recipes_ingredients, recipes_video, recipes_photo, userId));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setRecipes_photo(result.assets[0].uri);
    }
  };

  return (
    <NativeBaseProvider>
      <ScrollView backgroundColor="#E7E7E7" height="full">
        <Box style={styles.container} marginTop="20">
          <Center>
            <Text color="#EFC81A" fontWeight="bold" fontSize="2xl">
              Add Your Recipe{' '}
            </Text>
          </Center>{' '}
        </Box>
        <Box style={styles.container}>
          <Center>
            <Input backgroundColor="#fff" borderRadius={10} w={350} h={60} InputLeftElement={<Icon as={<FeatherIcon name="book-open" />} size={7} ml="5" color="muted.500" />} placeholder="Title" onChangeText={setRecipes_title} />
            <TextArea backgroundColor="#fff" borderRadius={10} w={350} h={120} mt={18} placeholder="Description" onChangeText={setRecipes_ingredients} />
            <Box mt={18}>
              <Input
                backgroundColor="#fff"
                borderRadius={10}
                w={350}
                h={60}
                InputLeftElement={<Icon as={<FeatherIcon name="video" />} size={7} ml="5" color="muted.500" />}
                placeholder="Masukan Url Video"
                value={recipes_video}
                onChangeText={setRecipes_video}
              />
            </Box>

            <Box my={18}>
              <View style={{backgroundColor: '#fff', borderRadius: 10, width: 350}}>
                <TouchableOpacity onPress={pickImage} style={{flexDirection: 'row', alignItems: 'center', marginVertical: 15}}>
                  <Icon as={<FeatherIcon name="image" />} size={7} ml="5" color="muted.500" />
                  <Text style={{marginLeft: 10, fontSize: 13, fontWeight: '200'}}>Add Image</Text>
                </TouchableOpacity>
                <Center>{recipes_photo && <Image source={{uri: recipes_photo}} style={{width: 80, height: 80, marginBottom: 8}} />}</Center>
              </View>
            </Box>
          </Center>

          <Button onPress={handleSubmit} style={{height: 50, borderRadius: 10, backgroundColor: '#EFC81A', margin: 8}}>
            <Text style={{color: '#fff', fontSize: 16, fontWeight: '500'}}>Create Recipe</Text>
          </Button>
        </Box>
      </ScrollView>
      <FooterMenu />
    </NativeBaseProvider>
  );
};

export default addRecipe;

const styles = StyleSheet.create({
  icon: {
    size: '32px',
  },
  container: {
    padding: 12,
  },
  form: {
    borderRadius: 4,
    backgroundColor: 'white',
  },
  details: {
    paddingBottom: 100,
    backgroundColor: 'white',
  },
});
