import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';

import {NativeBaseProvider, Text, Center} from 'native-base';
import axios from 'axios';
import {useSearchParams} from 'expo-router';
// import YouTube from 'react-native-youtube';
// import YoutubeIframe from 'react-native-youtube-iframe';

const DetailVideo = () => {
  const {id} = useSearchParams();
  const [title, setTitle] = useState();
  const [link, setLink] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get(`http://192.168.1.9:4000/recipes/${id}`)
      .then((response) => {
        setTitle(response.data.data[0].recipes_title);
        const videoLink = response.data.data[0].recipes_video;
        const videoSlice = videoLink.slice(17);
        console.log(videoLink);
        console.log(videoSlice);
        setLink(videoSlice);
      })
      .catch((error) => console.log(error));
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} px={3}>
        <View style={{margin: 5}}>
          {/* <YouTube key={link} height={300} width={400} videoId={link} apiKey={link} /> */}
          {/* <YoutubeIframe height={300} width={400} videoId={link} /> */}
        </View>
        <Text style={{paddingTop: 20, fontSize: 30}}>{title}</Text>
      </Center>
    </NativeBaseProvider>
  );
};

export default DetailVideo;

const styles = StyleSheet.create({});
