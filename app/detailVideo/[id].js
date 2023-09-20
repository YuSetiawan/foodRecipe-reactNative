import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';

import {NativeBaseProvider, Text, Center, Box} from 'native-base';
import axios from 'axios';
import {useSearchParams} from 'expo-router';
import YoutubeIframe from 'react-native-youtube-iframe';

const DetailVideo = () => {
  const {id} = useSearchParams();
  const [title, setTitle] = useState();
  const [ingredients, setIngredients] = useState();
  const [link, setLink] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get(`https://food-recipe-server-six.vercel.app/recipes/${id}`)
      .then((response) => {
        setTitle(response.data.data[0].recipes_title);
        setIngredients(response.data.data[0].recipes_ingredients);
        const videoLink = response.data.data[0].recipes_video;
        console.log(videoLink);
        setLink(videoLink);
      })
      .catch((error) => console.log(error));
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} px={3}>
        <View style={{margin: 5, marginTop: 4}}>
          <YoutubeIframe key={link} height={300} width={400} videoId={link} />
        </View>
        <Text style={{paddingTop: 20, fontSize: 30}}>{title}</Text>
        <Box mt={8}>
          <View style={styles.Ingredients}>
            <Text style={{padding: 20, fontSize: 14, color: '#666666'}}>{ingredients}</Text>
          </View>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default DetailVideo;

const styles = StyleSheet.create({
  Ingredients: {
    marginLeft: 12,
    width: 340,
    backgroundColor: '#FAF7ED',
    borderRadius: 20,
  },
});
