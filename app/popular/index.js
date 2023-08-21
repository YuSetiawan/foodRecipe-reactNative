import {StyleSheet} from 'react-native';
import React from 'react';
import axios from 'axios';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Icon, Box, ScrollView, NativeBaseProvider, Center, Image, Text, View, Divider} from 'native-base';
import {Link, useRouter} from 'expo-router';
import FooterMenu from '../../components/footerTabs';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PopularMenu = () => {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    handleGetToken();
    getData();
  }, []);

  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem('token');
    if (!dataToken) {
      router.push('/login');
    } else {
    }
  };

  const getData = async () => {
    axios
      .get(`http://192.168.1.9:4000/recipes`)
      .then((response) => {
        setRecipes(response.data.data);
      })
      .catch((error) => console.log(error));
  };
  return (
    <NativeBaseProvider>
      <Box style={styles.container} marginTop="12">
        <Link href="/">
          <Box borderRadius="4" backgroundColor="#F8F8FA" padding="2">
            <Icon size="7" as={<FeatherIcon name="chevron-left" />} />
          </Box>
        </Link>
        <Center marginTop="-9">
          <Text color="#EFC81A" fontWeight="bold" fontSize="2xl">
            Popular Menu{' '}
          </Text>
        </Center>{' '}
      </Box>
      <Box style={styles.container}>
        <ScrollView marginLeft="4">
          {recipes.map((recipe) => (
            <>
              <View style={styles.boxListRecipe}>
                <Image source={{uri: recipe?.recipes_photo}} key={recipe.recipes_photo} alt="menuImg" style={styles.imgList} />
                <View width="156">
                  <Text style={styles.textList} key={recipe.recipes_title}>
                    {recipe?.recipes_title}
                  </Text>
                  <Text style={styles.textListB}>Category</Text>
                  <Box style={styles.boxRate}>
                    <Image source={require('../../assets/icon/star-rate.png')} alt="stars" marginTop="1" />
                    <Text marginLeft="2" fontSize="12">
                      4.5
                    </Text>
                  </Box>
                </View>
              </View>
              <Divider marginBottom="4" />
            </>
          ))}
        </ScrollView>
      </Box>
      <FooterMenu />
    </NativeBaseProvider>
  );
};

export default PopularMenu;

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
  boxListRecipe: {
    flexDirection: 'row',
    height: 110,
    margin: 4,
    marginBottom: 2,
    marginRight: 10,
  },
  imgList: {
    width: 90,
    height: 90,
    borderRadius: 16,
    margin: 2,
  },
  textList: {
    marginTop: 4,
    padding: 12,
    fontSize: 16,
    fontWeight: 600,
  },
  textListB: {
    paddingHorizontal: 12,
    fontSize: 12,
  },
  boxRate: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});