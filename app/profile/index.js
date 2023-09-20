import {Modal, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import profileImg from '../../assets/icon/Users.png';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Icon, Box, FormControl, Input, NativeBaseProvider, Center, Image, Text, Button, Divider, HStack, View} from 'native-base';
import {Link, useRouter, useSearchParams} from 'expo-router';
import FooterMenu from '../../components/footerTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  // const {id} = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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
    const idUser = await AsyncStorage.getItem('id');
    await axios
      .get(`https://food-recipe-server-six.vercel.app/user/profile/${idUser}`)
      .then((response) => {
        setData(response.data.data[0]);
      })
      .catch((error) => console.log(error));
  };
  return (
    <NativeBaseProvider>
      <Box style={styles.containerImg} paddingTop="16">
        <Center>
          <Image source={!data.photo ? profileImg : {uri: data.photo}} alt="Welcome" style={styles.imgProfile} />
          {!data.name ? (
            <Text color="white" fontWeight="bold" fontSize="2xl" marginTop="2">
              User name{' '}
            </Text>
          ) : (
            <Text color="white" fontWeight="bold" fontSize="2xl" marginTop="2">
              {data.name}
            </Text>
          )}
        </Center>
      </Box>
      <Box style={styles.container} marginTop="-8" margin="2" backgroundColor="white">
        <Box style={styles.boxIcon}>
          <Icon color="#EFC81A" size="7" as={<FeatherIcon name="user" />} />
          <Text style={styles.textList} fontWeight="bold">
            Edit Profile
          </Text>
          <Link href="/profile/editProfile">
            <Icon size="7" as={<FeatherIcon name="chevron-right" />} />
          </Link>
        </Box>
        <Box style={styles.boxIcon}>
          <Icon color="#EFC81A" size="7" as={<FeatherIcon name="award" />} />
          <Text style={styles.textList} fontWeight="bold">
            My Recipe
          </Text>
          <Link href="/profile/myRecipe">
            <Icon size="7" as={<FeatherIcon name="chevron-right" />} />
          </Link>{' '}
        </Box>
        <Box style={styles.boxIcon}>
          <Icon color="#EFC81A" size="7" as={<FeatherIcon name="save" />} />
          <Text style={styles.textList} fontWeight="bold">
            Saved Recipe{' '}
          </Text>
          <Link href="/profile/savedRecipe">
            <Icon size="7" as={<FeatherIcon name="chevron-right" />} />
          </Link>{' '}
        </Box>
        <Box style={styles.boxIcon}>
          <Icon color="#EFC81A" size="7" as={<FeatherIcon name="thumbs-up" />} />
          <Text style={styles.textList} fontWeight="bold">
            Liked Recipe
          </Text>
          <Link href="/profile/likedRecipe">
            <Icon size="7" as={<FeatherIcon name="chevron-right" />} />
          </Link>{' '}
        </Box>
        <Divider color="#D2122E" marginBottom="4" marginTop="40" />
        <Box style={styles.boxIcon}>
          <Icon color="#D2122E" size="7" as={<FeatherIcon name="log-out" />} />
          <Text style={styles.textList} fontWeight="bold" color="#D2122E" onPress={() => setModalVisible(!modalVisible)}>
            Log Out
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
                Sure want to Log Out?
              </Text>

              <HStack mt={5} style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <Button onPress={() => setModalVisible(!modalVisible)} mr={3} backgroundColor="#EFC81A">
                  Cancel
                </Button>
                <Button
                  backgroundColor="#D2122E"
                  w={20}
                  onPress={() => {
                    AsyncStorage.clear();
                    router.push('/login');
                  }}
                >
                  Log Out
                </Button>
              </HStack>
            </View>
          </Modal>
          <Icon size="7" color="#D2122E" as={<FeatherIcon name="chevron-right" />} />
        </Box>
      </Box>
      <FooterMenu />
    </NativeBaseProvider>
  );
};

export default Profile;

const styles = StyleSheet.create({
  containerImg: {
    padding: 12,
    height: 300,
    backgroundColor: '#EFC81A',
  },
  imgProfile: {
    height: 150,
    width: 150,
    borderRadius: 150,
  },
  container: {
    padding: 12,
    borderRadius: 12,
  },
  textList: {
    width: 290,
    paddingLeft: 100,
    marginTop: 4,
    fontSize: 16,
    fontWeight: 600,
  },
  boxIcon: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 4,
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
