import {StyleSheet} from 'react-native';
import React from 'react';
import axios from 'axios';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {VStack, Icon, Box, ScrollView, Input, NativeBaseProvider, Center, Image, Text, Button, View, Divider} from 'native-base';
import {Link, useRouter} from 'expo-router';
import FooterMenu from '../../components/footerTabs';

const MyRecipe = () => {
  const router = useRouter();

  const handleSubmit = (values) => {
    axios
      .post('https://6j2m3t-6000.csb.app/api/auth/register', values)
      .then((res) => {
        console.log(res.data);
        alert('Register Succesful');
        // router.push('/');
      })
      .catch((err) => console.log(err));
  };
  return (
    <NativeBaseProvider>
      <ScrollView flexDirection="column">
        <Box style={styles.container} marginTop="12">
          <Link href="/">
            <Box borderRadius="4" backgroundColor="#F8F8FA" padding="2">
              <Icon size="7" as={<FeatherIcon name="chevron-left" />} />
            </Box>
          </Link>
          <Center marginTop="-9">
            <Text color="#EFC81A" fontWeight="bold" fontSize="2xl">
              Message{' '}
            </Text>
          </Center>{' '}
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
});
