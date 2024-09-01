import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Button, Link, useToast, SimpleGrid, Center } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const response = await axios.get('https://event-management-ngu0.onrender.com/api/events/my-events', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchMyEvents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://event-management-ngu0.onrender.com/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEvents(events.filter(event => event._id !== id));
      toast({
        title: 'Event Deleted',
        description: 'The event has been deleted successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not delete the event. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p="6"  minH="100vh">
      <Heading mb="6" textAlign={'center'} color="#1a202c">My Events</Heading>
      {events.length > 0 ? (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing="6">
          {events.map((event) => (
            <Box   bg="#1a202c"
              key={event._id}
              p="4"
              borderWidth="1px"
              borderRadius="lg"
              
              color="white"
            >
              <Heading size="md" mb="2">{event.name}</Heading>
              <Text>{event.description}</Text>
              <Text mt="2">Date: {new Date(event.date).toLocaleDateString()}</Text>
              <Box mt="4">
                <Button
                  as={RouterLink}
                  to={`/events/${event._id}`}
                  bg="gray.600"
                  color="white"
                  mr="2"
                  _hover={{ bg: 'gray.500' }}
                >
                  View & Register
                </Button>
                <Button
                  as={RouterLink}
                  to={`/update-event/${event._id}`}
                  bg="gray.600"
                  color="white"
                  mr="2"
                  _hover={{ bg: 'gray.500' }}
                >
                  Update
                </Button>
                <Button
                  bg="gray.600"
                  color="white"
                  onClick={() => handleDelete(event._id)}
                  _hover={{ bg: 'gray.500' }}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Text color="white">No events found.</Text>
      )}
    </Box>
  );
};

export default EventList;