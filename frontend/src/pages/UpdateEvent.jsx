import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast, Heading } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [participantLimit, setParticipantLimit] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`https://event-management-ngu0.onrender.com/api/events/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEvent(response.data);
        setName(response.data.name);
        setDate(new Date(response.data.date).toISOString().substring(0, 10));
        setTime(response.data.time);
        setLocation(response.data.location);
        setDescription(response.data.description);
        setParticipantLimit(response.data.participantLimit);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`https://event-management-ngu0.onrender.com/api/events/${id}`, {
        name,
        date,
        time,
        location,
        description,
        participantLimit,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast({
        title: 'Event Updated',
        description: 'The event has been updated successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/my-events');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not update the event. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <Box p="6">
      <Heading mb="6">Update Event</Heading>
      <FormControl mb="4">
        <FormLabel>Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl mb="4">
        <FormLabel>Date</FormLabel>
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </FormControl>
      <FormControl mb="4">
        <FormLabel>Time</FormLabel>
        <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </FormControl>
      <FormControl mb="4">
        <FormLabel>Location</FormLabel>
        <Input value={location} onChange={(e) => setLocation(e.target.value)} />
      </FormControl>
      <FormControl mb="4">
        <FormLabel>Description</FormLabel>
        <Input value={description} onChange={(e) => setDescription(e.target.value)} />
      </FormControl>
      <FormControl mb="4">
        <FormLabel>Participant Limit</FormLabel>
        <Input type="number" value={participantLimit} onChange={(e) => setParticipantLimit(e.target.value)} />
      </FormControl>
      <Button colorScheme="teal" onClick={handleUpdate}>
        Update Event
      </Button>
    </Box>
  );
};

export default UpdateEvent;
