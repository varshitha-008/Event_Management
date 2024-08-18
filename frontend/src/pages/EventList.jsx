import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Button, Link, useToast } from '@chakra-ui/react';
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
    <Box p="6">
      <Heading mb="6">My Events</Heading>
      {events.length > 0 ? (
        <VStack spacing="4" align="stretch">
          {events.map((event) => (
            <Box key={event._id} p="4" borderWidth="1px" borderRadius="lg">
              <Heading size="md">{event.name}</Heading>
              <Text mt="2">{event.description}</Text>
              <Text mt="2">Date: {new Date(event.date).toLocaleDateString()}</Text>
              <Box mt="4">
                <Button
                  as={RouterLink}
                  to={`/events/${event._id}`}
                  colorScheme="teal"
                  mr="2"
                >
                  View & Register
                </Button>
                <Button
                  as={RouterLink}
                  to={`/update-event/${event._id}`}
                  colorScheme="blue"
                  mr="2"
                >
                  Update
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => handleDelete(event._id)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          ))}
        </VStack>
      ) : (
        <Text>No events found.</Text>
      )}
    </Box>
  );
};

export default EventList;
