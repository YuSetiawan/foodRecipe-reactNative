import {StyleSheet} from 'react-native';
import React from 'react';
import axios from 'axios';
import profileImg from '../../assets/icon/Users.png';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Icon, Box, FormControl, Input, NativeBaseProvider, Center, Image, Text, Button} from 'native-base';
import {Link, useRouter} from 'expo-router';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';

const login = () => {
  const router = useRouter();

  const handleSubmit = async (values) => {
    await axios
      .post('http://192.168.1.9:4000/user/login', values)
      .then((res) => {
        console.log(res.data);
        alert('Login Succesfull');
        AsyncStorage.setItem('token', res.data.data.token);
        AsyncStorage.setItem('id', res.data.data.id);
        router.push('/');
      })
      .catch((err) => {
        console.log(err);
        alert('Email/Pass word incorrect');
      });
  };
  return (
    <NativeBaseProvider>
      <Box style={styles.container} marginTop="16">
        <Center>
          <Image source={profileImg} alt="Welcome" />
        </Center>
      </Box>
      <Box style={styles.container}>
        <Center>
          <Text color="#EFC81A" fontWeight="bold" fontSize="2xl">
            Welcome !
          </Text>
          <Text color="#C4C4C4" fontWeight="semibold">
            Log in to your exiting account.
          </Text>
        </Center>
      </Box>
      <Box style={styles.container}>
        <Formik initialValues={{email: '', password: ''}} onSubmit={handleSubmit}>
          {({handleChange, handleBlur, submitForm, values}) => (
            <>
              <FormControl style={{padding: 12}}>
                <Input
                  InputLeftElement={<Icon as={<FeatherIcon name="user" />} margin="4" />}
                  style={styles.form}
                  marginBottom="4"
                  type="email"
                  placeholder="Email"
                  // key={values.email}
                  backgroundColor="#EFC81A"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                <Input
                  InputLeftElement={<Icon as={<FeatherIcon name="lock" />} margin="4" />}
                  style={styles.form}
                  marginBottom="4"
                  type="password"
                  placeholder="Password"
                  // key={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  backgroundColor="#EFC81A"
                />
                <Text color="#999999" fontWeight="semibold" textAlign="right">
                  Forgot Password ?{' '}
                </Text>
                <Button backgroundColor="#EFC81A" marginTop="8" onPress={submitForm}>
                  <Text color="#FFFFFF" fontWeight="semibold" textAlign="center">
                    LOG IN
                  </Text>
                </Button>
              </FormControl>
            </>
          )}
        </Formik>
        <Text color="#999999" fontWeight="semibold" textAlign="center">
          Don't have an account?{' '}
          <Link href="/register">
            <Text color="#EFC81A">Sign Up</Text>
          </Link>
        </Text>
      </Box>
    </NativeBaseProvider>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  form: {
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
  },
});
