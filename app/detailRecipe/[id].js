import React, {useState, useEffect} from 'react';
import axios from 'axios';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Icon, Box, NativeBaseProvider, Center, Image, Text, Button, ScrollView, TextArea, Divider} from 'native-base';
import {Link, useRouter, useSearchParams} from 'expo-router';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import FooterMenu from '../../components/footerTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {createCommentActions} from '../config/redux/actions/commentAction';

const DetailRecipe = () => {
  const {id} = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [comment, setComment] = useState('');

  const [activeTab, setActiveTab] = useState('Ingredients');
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    handleGetToken();
    getData();
    getComment();
  }, []);

  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem('token');
    if (!dataToken) {
      router.push('/login');
    } else {
    }
  };

  // Handle GET
  const getData = async () => {
    await axios
      .get(`http://192.168.1.9:4000/recipes/${id}`)
      .then((response) => {
        setRecipes(response.data.data[0]);
      })
      .catch((error) => console.log(error));
  };

  const getComment = async () => {
    await axios
      .get(`http://192.168.1.9:4000/comments/${id}`)
      .then((response) => {
        setCommentData(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  // Handle POST
  const handleLike = async () => {
    try {
      const idUser = await AsyncStorage.getItem('id');
      const res = await axios.post(`http://192.168.1.9:4000/likeds/`, {
        users_id: idUser,
        recipes_id: id,
      });
      alert('Recipes Liked');
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      const idUser = await AsyncStorage.getItem('id');
      const res = await axios.post(`http://192.168.1.9:4000/bookmarks/`, {
        users_id: idUser,
        recipes_id: id,
      });
      alert('Recipes Saved');
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async () => {
    const idUser = await AsyncStorage.getItem('id');
    dispatch(createCommentActions(id, idUser, comment));
    setComment('');
    getComment();
  };
  return (
    <NativeBaseProvider>
      <ScrollView>
        <Box paddingTop="10">
          <Center>
            <Image source={{uri: recipes.recipes_photo}} alt="Welcome" style={styles.containerImg} />
          </Center>
        </Box>
        <Box style={styles.container} marginTop="-80">
          <Link href="/">
            <Icon size="10" color="white" fontWeight="extrabold" as={<FeatherIcon name="arrow-left" />} />
          </Link>
          <Box flexDirection="row" marginTop="12">
            <Button backgroundColor="white" borderRadius="16" marginRight="2" onPress={handleSave}>
              <Icon size="5" color="#EFC81A" as={<FeatherIcon name="save" />} />
            </Button>
            <Button backgroundColor="white" borderRadius="16" onPress={handleLike}>
              <Icon size="5" color="#EFC81A" as={<FeatherIcon name="thumbs-up" />} />
            </Button>
          </Box>
          <Text style={styles.headlineRecipe} color="white" fontWeight="bold" fontSize="4xl">
            {recipes.recipes_title}
          </Text>
        </Box>
        <Box style={styles.container} backgroundColor="white" marginBottom={6}>
          <View style={styles.tabsContainer}>
            <TouchableOpacity style={[styles.tabButton, activeTab === 'Ingredients' && styles.activeTab]} onPress={() => handleTabChange('Ingredients')}>
              <Text style={[styles.tabText, activeTab === 'Ingredients' && styles.activeTabText]}>Ingredients</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tabButton, activeTab === 'StepVideo' && styles.activeTab]} onPress={() => handleTabChange('StepVideo')}>
              <Text style={[styles.tabText, activeTab === 'StepVideo' && styles.activeTabText]}>Video Step</Text>
            </TouchableOpacity>
          </View>
          {activeTab === 'Ingredients' && (
            <ScrollView>
              <View style={styles.tabContent}>
                <View style={styles.Ingredients}>
                  <Text style={{padding: 20, fontSize: 14, color: '#666666'}}>{recipes.recipes_ingredients}</Text>
                </View>
              </View>
            </ScrollView>
          )}
          {activeTab === 'StepVideo' && (
            <View style={styles.tabContent}>
              <View style={styles.StepVideo}>
                <Button backgroundColor="#EFC81A" borderRadius="16" margin="1">
                  <Icon size="5" color="white" as={<FeatherIcon name="play" />} />
                </Button>
                <Link href={`/detailVideo/${id}`}>
                  <Box style={styles.textVideo} marginTop={0}>
                    <Text fontSize="lg" color="#B6B6B6">
                      Video Tutorial
                    </Text>
                    <Text>Press to see the video</Text>
                  </Box>
                </Link>
              </View>
              <View style={styles.tabContent}>
                <View style={styles.Ingredients}>
                  <TextArea style={{fontSize: 14}} placeholder="Comment" value={comment} onChangeText={setComment} />
                </View>
                <Button backgroundColor="#EFC81A" margin="4" marginLeft="2" borderRadius="10" onPress={handleComment}>
                  <Text color="#FFFFFF" fontWeight="semibold" textAlign="center">
                    Post Comment{' '}
                  </Text>
                </Button>
              </View>
              <View style={styles.tabContent}>
                <Text margin="3">Comment :</Text>
                {commentData.map((comment) => (
                  <>
                    <View style={styles.boxListRecipe}>
                      {!comment.photo ? <Image source={require('../../assets/icon/Auth-image.png')} alt="menuImg" style={styles.imgList} /> : <Image key={comment.photo} source={{uri: comment.photo}} alt="menuImg" style={styles.imgList} />}
                      <Box mt={-2}>
                        <Text style={styles.textList}>{comment.name} </Text>
                        <Box maxWidth="64">
                          <Text style={styles.textListB}>{comment.comment_text}</Text>
                        </Box>
                      </Box>
                    </View>
                    <Divider mb={4} />
                  </>
                ))}
              </View>
            </View>
          )}
        </Box>
      </ScrollView>
      <FooterMenu />
    </NativeBaseProvider>
  );
};

export default DetailRecipe;

const styles = StyleSheet.create({
  containerImg: {
    padding: 12,
    height: 350,
    width: '100%',
  },
  imgProfile: {
    height: 150,
    width: 150,
    borderRadius: 150,
  },
  container: {
    padding: 12,
    borderRadius: 26,
  },
  headlineRecipe: {
    paddingLeft: 8,
    paddingRight: 48,
  },
  textList: {
    marginTop: 4,
    paddingLeft: 98,
    fontSize: 16,
    fontWeight: 600,
  },
  boxIcon: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '65%',
    paddingLeft: 70,
  },
  tabButton: {
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  activeTab: {
    borderBottomColor: '#EEC302',
    borderBottomWidth: 5,
  },
  tabText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: 'bold',
  },
  activeTabText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  Ingredients: {
    marginLeft: 12,
    width: 340,
    backgroundColor: '#FAF7ED',
    borderRadius: 20,
  },
  StepVideo: {
    backgroundColor: '#FAF7ED',
    borderRadius: 20,
    width: 340,
    height: 80,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 20,
    marginLeft: 10,
  },
  textVideo: {
    margin: 8,
  },
  boxListRecipe: {
    flexDirection: 'row',
    height: 110,
    margin: 4,
    marginBottom: 2,
    marginRight: 10,
  },
  imgList: {
    width: 60,
    height: 60,
    borderRadius: 60,
    margin: 8,
  },
  textList: {
    paddingTop: 16,
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: 600,
  },
  textListB: {
    paddingTop: 4,
    paddingHorizontal: 12,
    fontSize: 17,
  },
});
