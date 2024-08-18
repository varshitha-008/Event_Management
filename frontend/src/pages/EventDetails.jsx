import React, { useState, useEffect } from 'react';
import { Box, Button, Heading, Text, useToast } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`https://event-management-ngu0.onrender.com/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast({
        title: 'Not Logged In',
        description: 'Please log in to register for the event.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(`https://event-management-ngu0.onrender.com/api/events/${id}/register`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({
        title: response.data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: error.response?.data.message || 'There was a problem registering for the event.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleShare = () => {
    const eventUrl = `${window.location.origin}/events/${id}`;
    navigator.clipboard.writeText(eventUrl).then(() => {
      toast({
        title: 'URL Copied',
        description: 'The event URL has been copied to your clipboard.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }).catch((error) => {
      toast({
        title: 'Copy Failed',
        description: 'There was a problem copying the URL to the clipboard.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Error copying URL:', error);
    });
  };

  return (
    <Box p="6">
      {event ? (
        <>
          <Heading mb="4">{event.name}</Heading>
          <Text mb="2">{event.description}</Text>
          <Text mb="2">Date: {new Date(event.date).toLocaleDateString()}</Text>
          <Text mb="2">Location: {event.location}</Text>
          <Button mt="4" colorScheme="teal" onClick={handleRegister}>
            Register for Event
          </Button>
          <Button mt="4" ml="4" colorScheme="blue" onClick={handleShare}>
            Share Event
          </Button>
        </>
      ) : (
        <Text>Loading event details...</Text>
      )}
    </Box>
  );
};

export default EventDetails;
