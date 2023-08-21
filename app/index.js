import {StyleSheet, ScrollView, View, LogBox} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {VStack, Icon, Box, Input, NativeBaseProvider, Center, Image, Text} from 'native-base';
import {Link, useRouter} from 'expo-router';
import FooterMenu from '../components/footerTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useDispatch, useSelector} from 'react-redux';
// import getRecipeAction from './config/redux/actions/getRecipeAction';

const login = () => {
  const router = useRouter();
  // const dispatch = useDispatch();
  function SearchBar() {
    return (
      <VStack w="100%" space={5} alignSelf="center">
        <Input placeholder="Search People & Places" width="100%" backgroundColor="#F5F5F5" py="3" px="1" fontSize="14" InputLeftElement={<Icon m="4" as={<FeatherIcon name="search" />} />} />
      </VStack>
    );
  }
  const [data, setData] = useState([]);
  const [recipes, setRecipes] = useState([]);
  // const {recipe} = useSelector((state) => state.recipe);

  useEffect(() => {
    LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);
    getData();
    getRecipe();
  }, []);

  const getData = async () => {
    const idUser = await AsyncStorage.getItem('id');
    axios
      .get(`http://192.168.1.9:4000/user/profile/${idUser}`)
      .then((response) => {
        setData(response.data.data[0]);
      })
      .catch((error) => console.log(error));
  };

  // const getRecipe = async () => {
  //   dispatch(getRecipeAction());
  // };

  const getRecipe = async () => {
    axios
      .get(`http://192.168.1.9:4000/recipes`)
      .then((response) => {
        setRecipes(response.data.data);
      })
      .catch((error) => console.log(error));
  };
  return (
    <NativeBaseProvider>
      <ScrollView>
        <Box style={styles.container} marginY="10">
          <SearchBar />
          <Box marginY={7}>
            {!data ? (
              <Text textAlign="center" fontWeight="semibold">
                <Link href="/login">
                  <Text>Log In</Text>
                </Link>{' '}
                /{' '}
                <Link href="/register">
                  <Text color="#EFC81A">Sign Up</Text>
                </Link>
              </Text>
            ) : (
              <Center>
                <Text color="#EFC81A" fontWeight="bold">
                  Let's explore new recipes {data.name}!
                </Text>
              </Center>
            )}
          </Box>
          <Text color="#3F3A3A" fontWeight="semibold" fontSize="xl">
            Popular for You{' '}
          </Text>
          <ScrollView horizontal>
            <View style={styles.boxPopular}>
              <Center>
                <Image source={require('../assets/icon/meals-icon.png')} alt="menuImg" />
                <Text>Meals</Text>
              </Center>
            </View>
            <View style={styles.boxPopular}>
              <Center>
                <Image source={require('../assets/icon/seafood-icon.png')} alt="menuImg" />
                <Text>Seafood</Text>
              </Center>
            </View>
            <View style={styles.boxPopular}>
              <Center>
                <Image source={require('../assets/icon/soup-icon.png')} alt="menuImg" />
                <Text>Soup</Text>
              </Center>
            </View>
            <View style={styles.boxPopular}>
              <Center>
                <Image source={require('../assets/icon/seafood-icon.png')} alt="menuImg" />
                <Text>Seafood</Text>
              </Center>
            </View>
          </ScrollView>
          <Text color="#3F3A3A" fontWeight="semibold" fontSize="xl" marginTop="4">
            New Recipes{' '}
          </Text>
          <ScrollView horizontal>
            {recipes.map((recipe) => (
              <Link href={`/detailRecipe/${recipe.recipes_id}`}>
                <Box>
                  <View style={styles.boxRecipe}>
                    <Image source={{uri: recipe?.recipes_photo}} alt="menuImg" size="200" resizeMode="cover" borderRadius="14" />
                    <Text style={styles.textMenu} color="white">
                      {recipe?.recipes_title}
                    </Text>
                  </View>
                </Box>
              </Link>
            ))}
          </ScrollView>
          <Box flexDirection="row" justifyContent="space-between" marginTop="4">
            <Text color="#3F3A3A" fontWeight="semibold" fontSize="xl" marginTop="4">
              Popular Recipes{' '}
            </Text>
            <Link href="/popular">
              <Box>
                <Text color="#6D61F2" fontWeight="semibold" fontSize="sm" marginTop="5">
                  More info{' '}
                </Text>
              </Box>
            </Link>
          </Box>
          <Box marginBottom={6}>
            {recipes.map((recipe) => (
              <Link href={`/detailRecipe/${recipe.recipes_id}`}>
                <View style={styles.boxListRecipe}>
                  <Image source={{uri: recipe?.recipes_photo}} alt="menuImg" style={styles.imgList} />
                  <View>
                    <Text style={styles.textList}>{recipe?.recipes_title}</Text>
                    <Text style={styles.textListB}>Category</Text>
                    <Box style={styles.boxRate}>
                      <Image source={require('../assets/icon/star-rate.png')} alt="stars" marginTop="1" />
                      <Text marginLeft="2" fontSize="12">
                        4.5
                      </Text>
                    </Box>
                  </View>
                </View>
              </Link>
            ))}
          </Box>
        </Box>
      </ScrollView>
      <FooterMenu />
    </NativeBaseProvider>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    padding: 18,
  },
  textMenu: {
    marginTop: -90,
    padding: 24,
    fontSize: 16,
    fontWeight: 600,
  },
  boxPopular: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginTop: 14,
  },
  boxRecipe: {
    width: 150,
    height: 200,
    marginTop: 14,
    marginRight: 10,
  },
  boxListRecipe: {
    flexDirection: 'row',
    height: 110,
    marginTop: 4,
    marginRight: 10,
  },
  imgList: {
    width: 90,
    height: 90,
    borderRadius: 16,
    margin: 14,
  },
  textList: {
    marginTop: 4,
    padding: 14,
    fontSize: 16,
    fontWeight: 600,
  },
  textListB: {
    paddingHorizontal: 14,
    fontSize: 12,
  },
  boxRate: {
    flexDirection: 'row',
    paddingHorizontal: 14,
  },
});
