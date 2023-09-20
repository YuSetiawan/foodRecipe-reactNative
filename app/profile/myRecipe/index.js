import {Modal, StyleSheet} from 'react-native';
import React from 'react';
import axios from 'axios';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Icon, Box, ScrollView, Input, NativeBaseProvider, Center, Image, Text, Button, View, Divider, HStack} from 'native-base';
import {Link, useRouter} from 'expo-router';
import FooterMenu from '../../../components/footerTabs';
import {useState} from 'react';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {deleteRecipeActions} from '../../config/redux/actions/recipeAction';
import UpdateModal from '../../../components/updateRecipe';

const MyRecipe = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const idUser = await AsyncStorage.getItem('id');
    console.log(idUser);
    axios
      .get(`https://food-recipe-server-six.vercel.app/recipes/users/${idUser}`)
      .then((response) => {
        setRecipes(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (recipes_id) => {
    getData();
    dispatch(deleteRecipeActions(recipes_id));
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
            My Recipe{' '}
          </Text>
        </Center>{' '}
      </Box>
      <ScrollView marginLeft="4">
        <Box style={styles.container}>
          {recipes.map((recipe) => (
            <>
              <View style={styles.boxListRecipe}>
                <Image key={recipe.recipes_photo} source={{uri: recipe.recipes_photo}} alt="menuImg" style={styles.imgList} />
                <View w={48}>
                  <Text style={styles.textList} key={recipe.recipes_title}>
                    {recipe.recipes_title}{' '}
                  </Text>
                  <Text style={styles.textListB}>Taste</Text>
                  <Text style={styles.textList}>Menu</Text>
                </View>
                <Box flexDirection="column" justifyContent="space-around">
                  <UpdateModal
                    recipes_id={recipe.recipes_id}
                    recipes_title={recipe.recipes_title}
                    recipes_ingredients={recipe.recipes_ingredients}
                    recipes_photo={recipe.recipes_photo}
                    recipes_video={recipe.recipes_video}
                    getData={getData}
                  />
                  <Icon size="7" color="#D2122E" as={<FeatherIcon name="trash-2" />} onPress={() => setModalVisible(!modalVisible)} />
                </Box>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={styles.modalView}>
                    <Text marginLeft={'auto'} marginRight={'auto'} fontSize={20}>
                      Sure want to delete this recipe? this action is permanent
                    </Text>

                    <HStack mt={5} style={{marginLeft: 'auto', marginRight: 'auto'}}>
                      <Button onPress={() => setModalVisible(!modalVisible)} mr={3} backgroundColor="#EFC81A">
                        Cancel
                      </Button>
                      <Button backgroundColor="#D2122E" w={20} onPress={() => handleDelete(recipe.recipes_id)}>
                        Delete
                      </Button>
                    </HStack>
                  </View>
                </Modal>
              </View>
              <Divider marginY="4" />
            </>
          ))}
        </Box>
      </ScrollView>
      <FooterMenu />
    </NativeBaseProvider>
  );
};

export default MyRecipe;

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
    margin: 8,
  },
  textList: {
    padding: 12,
    fontSize: 16,
    fontWeight: 600,
  },
  textListB: {
    paddingHorizontal: 12,
    fontSize: 12,
  },
  modalView: {
    marginTop: 100,
    marginHorizontal: 10,
    backgroundColor: '#EFEFEF',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
