import React from 'react';
import {StyleSheet} from 'react-native';
import {NativeBaseProvider, Box, Text, Icon, HStack, Center, Pressable} from 'native-base';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useRouter} from 'expo-router';

function FooterMenu() {
  const router = useRouter();
  return (
    <NativeBaseProvider>
      <Box style={styles.position} flex={1} bg="white" safeAreaTop width="100%" alignSelf="center">
        <HStack bg="white" alignItems="center" safeAreaBottom shadow={6}>
          <Pressable cursor="pointer" py="3" flex={1} onPress={() => router.push('/')}>
            <Center>
              <Icon mb="1" color="black" size="sm" as={<FeatherIcon name="home" />} />
              <Text color="black" fontSize="12">
                Home
              </Text>
            </Center>
          </Pressable>
          <Pressable cursor="pointer" py="2" flex={1} onPress={() => router.push('/addRecipe')}>
            <Center>
              <Icon mb="1" color="black" size="sm" as={<FeatherIcon name="plus-square" />} />
              <Text color="black" fontSize="12">
                Add Recipe
              </Text>
            </Center>
          </Pressable>
          {/* <Pressable cursor="pointer" py="2" flex={1} onPress={() => router.push('/chat')}>
            <Center>
              <Icon mb="1" color="black" size="sm" as={<FeatherIcon name="message-circle" />} />
              <Text color="black" fontSize="12">
                Chat
              </Text>
            </Center>
          </Pressable> */}
          <Pressable cursor="pointer" py="2" flex={1} onPress={() => router.push('/profile')}>
            <Center>
              <Icon mb="1" color="black" size="sm" as={<FeatherIcon name="user" />} />
              <Text color="black" fontSize="12">
                Account
              </Text>
            </Center>
          </Pressable>
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  position: {
    position: 'absolute',
    bottom: 0,
    marginTop: 0,
    backgroundColor: 'transparent',
  },
});

export default FooterMenu;
