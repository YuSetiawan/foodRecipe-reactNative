import {StyleSheet} from 'react-native';
import React from 'react';
import axios from 'axios';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Icon, Box, Input, NativeBaseProvider, Center, Image, Text, Button} from 'native-base';
import {Link, useRouter} from 'expo-router';
import {Formik} from 'formik';

const register = () => {
  const router = useRouter();

  const handleSubmit = (values) => {
    axios
      .post('https://food-recipe-server-six.vercel.app/user/register', values)
      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
        router.push('/login');
      })
      .catch((err) => {
        console.log(err);
        alert(err.data.message);
      });
  };
  return (
    <NativeBaseProvider>
      <Box style={styles.container} marginTop="12">
        <Link href="/">
          <Box borderRadius="4" backgroundColor="#F8F8FA" padding="2">
            <Icon size="7" as={<FeatherIcon name="chevron-left" />} />
          </Box>
        </Link>
      </Box>
      <Box style={styles.container}>
        <Center>
          <Text color="#EFC81A" fontWeight="bold" fontSize="2xl">
            Let's Get Started !
          </Text>
          <Text color="#C4C4C4" fontWeight="semibold">
            Create new account to access all feautures
          </Text>
        </Center>
      </Box>
      <Box style={styles.container}>
        <Formik initialValues={{name: '', email: '', phone: '', password: ''}} onSubmit={handleSubmit}>
          {({handleChange, handleBlur, submitForm, values}) => (
            <>
              <Input InputLeftElement={<Icon as={<FeatherIcon name="user" />} margin="4" />} style={styles.form} marginBottom="4" placeholder="Name" onChangeText={handleChange('name')} onBlur={handleBlur('name')} value={values.name} />
              <Input
                InputLeftElement={<Icon as={<FeatherIcon name="mail" />} margin="4" />}
                style={styles.form}
                marginBottom="4"
                placeholder="E-mail"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                isRequired
              />
              <Input
                InputLeftElement={<Icon as={<FeatherIcon name="phone" />} margin="4" />}
                style={styles.form}
                marginBottom="4"
                placeholder="Phone Number"
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
              />
              <Input
                InputLeftElement={<Icon as={<FeatherIcon name="lock" />} margin="4" />}
                style={styles.form}
                marginBottom="4"
                placeholder="New Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {/* <Input InputLeftElement={<Icon as={<FeatherIcon name="lock" />} margin="4" />} style={styles.form} marginBottom="4" placeholder="Confirm New Password" onChangeText={handleChange('name')} onBlur={handleBlur('name')} value={values.name} /> */}
              <Button backgroundColor="#EFC81A" marginTop="8" onPress={submitForm}>
                <Text color="#FFFFFF" fontWeight="semibold" textAlign="center">
                  CREATE{' '}
                </Text>
              </Button>
            </>
          )}
        </Formik>
        <Text color="#999999" fontWeight="semibold" textAlign="center" marginTop="4">
          Already have account?{' '}
          <Link href="/login">
            <Text color="#EFC81A">Log in</Text>
          </Link>
        </Text>
      </Box>
    </NativeBaseProvider>
  );
};

export default register;

const styles = StyleSheet.create({
  icon: {
    size: '32px',
  },
  container: {
    padding: 16,
  },
  form: {
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
  },
});
