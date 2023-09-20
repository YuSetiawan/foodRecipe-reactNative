import React, {useState} from 'react';
import {Text, Input, View, HStack, Button, TextArea, Center} from 'native-base';
import {Modal, StyleSheet} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import {useDispatch} from 'react-redux';
import {updateRecipeActions} from '../app/config/redux/actions/recipeAction';

const UpdateModal = ({recipes_id, recipes_title, recipes_ingredients, recipes_photo, recipes_video, getData}) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState(recipes_title);
  const [ingredients, setIngredients] = useState(recipes_ingredients);
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(recipes_video);

  const updateRecipe = () => {
    dispatch(updateRecipeActions(title, ingredients, photo, video, recipes_id, setModalVisible, getData));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <View marginLeft={-3}>
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
          <Text fontSize={20}>Update</Text>
          <Text mt={3}>Title</Text>
          <Input value={title} onChangeText={(value) => setTitle(value)} />
          <Text mt={3}>Ingredients</Text>
          <TextArea value={ingredients} onChangeText={(value) => setIngredients(value)} />
          <Text mt={3}>Url Video</Text>
          <Input value={video} onChangeText={(value) => setVideo(value)} />
          <Text mt={3}>Picture</Text>
          <Button my={1} onPress={pickImage} backgroundColor={'transparent'} borderWidth={'1'}>
            <Center>
              <FeatherIcon name="camera" size={20} color={'black'} />
              <Text>Add Photo</Text>
            </Center>
          </Button>

          <HStack mt={3}>
            <Button onPress={() => setModalVisible(!modalVisible)} mr={3} backgroundColor="#EFC81A">
              Cancel
            </Button>
            <Button onPress={() => updateRecipe()} backgroundColor="#D2122E">
              Update
            </Button>
          </HStack>
        </View>
      </Modal>
      <Button style={{width: 50, backgroundColor: '#EFC81A'}} onPress={() => setModalVisible(true)}>
        <FeatherIcon name="edit" size={20} color={'white'} />
      </Button>
    </View>
  );
};

export default UpdateModal;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: '#EFEFEF',
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
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
