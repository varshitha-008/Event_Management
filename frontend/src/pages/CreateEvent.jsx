import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Heading, useToast } from '@chakra-ui/react';
import axios from 'axios';

const CreateEvent = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [participantLimit, setParticipantLimit] = useState('');
  const toast = useToast();

  const handleCreateEvent = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://event-management-ngu0.onrender.com/api/events',
        {
          name,
          date,
          time,
          location,
          description,
          participantLimit,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: 'Event created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error creating event',
        description: error.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="8">
      <Heading textAlign="center" mb="4">Create Event</Heading>
      <FormControl id="name" isRequired mb="4">
        <FormLabel>Name</FormLabel>
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl id="date" isRequired mb="4">
        <FormLabel>Date</FormLabel>
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </FormControl>
      <FormControl id="time" isRequired mb="4">
        <FormLabel>Time</FormLabel>
        <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </FormControl>
      <FormControl id="location" isRequired mb="4">
        <FormLabel>Location</FormLabel>
        <Input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </FormControl>
      <FormControl id="description" mb="4">
        <FormLabel>Description</FormLabel>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </FormControl>
      <FormControl id="participantLimit" mb="4">
        <FormLabel>Participant Limit</FormLabel>
        <Input
          type="number"
          value={participantLimit}
          onChange={(e) => setParticipantLimit(e.target.value)}
        />
      </FormControl>
      <Button colorScheme="teal" width="full" onClick={handleCreateEvent}>
        Create Event
      </Button>
    </Box>
  );
};

export default CreateEvent;
