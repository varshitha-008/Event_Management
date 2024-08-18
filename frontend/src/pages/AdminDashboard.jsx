import React, { useState ,useEffect} from 'react';
import { Box, Button, VStack, Text, Heading, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  return (
    <Box bg="gray.800" color="white" w="200px" h="100vh" p="5">
      <VStack spacing="4" align="stretch">
        <Button as={Link} to="/create-event" colorScheme="teal">
          Create Event
        </Button>
        <Button as={Link} to="/my-events" colorScheme="teal">
          My Events
        </Button>
        <Button as={Link} to="/analytics">Event Analytics</Button>

      </VStack>
    </Box>
  );
};

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await axios.get('https://event-management-ngu0.onrender.com/api/auth/check-admin', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };

    checkAdminStatus();
  }, []);

  const requestAdminAccess = async () => {
    try {
      const response = await axios.post(
        'https://event-management-ngu0.onrender.com/api/auth/request-admin-access',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        setIsAdmin(true);
        toast({
          title: 'Access Granted',
          description: 'You are now an admin and can create events.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not request admin access. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box display="flex">
      <Sidebar />
      <Box flex="1" p="6">
        <Heading>Welcome to Admin Dashboard</Heading>
        <Box mt="8" p="6" borderWidth="1px" borderRadius="lg">
          <Heading size="md" mb="4">
            Request Admin Access
          </Heading>
          <Text mb="4">
            By clicking the button below, you will request admin access. Once granted, you'll have the ability to create events.
          </Text>
          {!isAdmin && (
            <Button colorScheme="teal" onClick={requestAdminAccess}>
              Request Admin Access
            </Button>
          )}
          {isAdmin && (
            <Text color="teal.500" fontWeight="bold">
              You are now an admin!
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;