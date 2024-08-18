import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post('https://event-management-ngu0.onrender.com/api/auth/register', {
        email,
        password,
        name,
      });
      toast({
        title: 'Signup successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
    } catch (error) {
      // toast({
      //   title: 'Error signing up',
      //   description: error.response.data.message,
      //   status: 'error',
      //   duration: 3000,
      //   isClosable: true,
      // });
      console.log("Error in signup",error)
    }
   
  };

  return (
    <Box maxW="md" mx="auto" mt="8">
      <Heading textAlign="center" mb="4">Signup</Heading>
      <FormControl id="name" isRequired mb="4">
        <FormLabel>Name</FormLabel>
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl id="email" isRequired mb="4">
        <FormLabel>Email</FormLabel>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl id="password" isRequired mb="4">
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Button colorScheme="teal" width="full" onClick={handleSignup}>
        Signup
      </Button>
    </Box>
  );
};

export default Register;
