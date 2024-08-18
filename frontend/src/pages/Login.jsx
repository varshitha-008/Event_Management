import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post('https://event-management-ngu0.onrender.com/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', data.token);
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/admin-dashboard'); 
    } catch (error) {
      toast({
        title: 'Error logging in',
        description: error.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="8">
      <Heading textAlign="center" mb="4">Login</Heading>
      <FormControl id="email" isRequired mb="4">
        <FormLabel>Email</FormLabel>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl id="password" isRequired mb="4">
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Button colorScheme="teal" width="full" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
