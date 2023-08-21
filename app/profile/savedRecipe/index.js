import {Modal, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Icon, Box, ScrollView, NativeBaseProvider, Center, Image, Text, Button, View, Divider, HStack} from 'native-base';
import {Link, useRouter} from 'expo-router';
import FooterMenu from '../../../components/footerTabs';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteSaveActions} from '../../config/redux/actions/saveAction';

const MyRecipe = () => {
  // const {id} = useSearchParams();
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
      .get(`http://192.168.1.9:4000/bookmarks/${idUser}`)
      .then((response) => {
        setRecipes(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (bookmarks_id) => {
    getData();
    dispatch(deleteSaveActions(bookmarks_id));
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
            Saved Recipe{' '}
          </Text>
        </Center>{' '}
      </Box>
      <Box style={styles.container}>
        <ScrollView marginLeft="4">
          {recipes.map((recipe) => (
            <>
              <View style={styles.boxListRecipe}>
                <Image key={recipe.recipes_photo} source={{uri: recipe.recipes_photo}} alt="menuImg" style={styles.imgList} />
                <View w={40}>
                  <Text style={styles.textList}>{recipe.recipes_title}</Text>
                  <Text style={styles.textListB}>Category</Text>
                  <Text style={styles.textListB}>by {recipe.name}</Text>
                </View>
                <Box margin="8">
                  <Icon size="7" color="#D2122E" as={<FeatherIcon name="save" />} onPress={() => setModalVisible(!modalVisible)} />
                  <Text color="#D2122E" marginLeft={-2}>
                    Unsave
                  </Text>
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
                        Sure want to unsaved this recipe?
                      </Text>

                      <HStack mt={5} style={{marginLeft: 'auto', marginRight: 'auto'}}>
                        <Button onPress={() => setModalVisible(!modalVisible)} mr={3} backgroundColor="#EFC81A">
                          Cancel
                        </Button>
                        <Button backgroundColor="#D2122E" w={20} onPress={() => handleDelete(recipe.bookmarks_id)}>
                          Delete
                        </Button>
                      </HStack>
                    </View>
                  </Modal>
                </Box>
              </View>
              <Divider marginY="4" />
            </>
          ))}
        </ScrollView>
      </Box>
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
  boxRate: {
    flexDirection: 'row',
    paddingHorizontal: 10,
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
