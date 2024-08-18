import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';

const Home = () => {
  const events = [
    { id: 1, name: 'Event One', date: '2024-08-17', location: 'Location One', description: 'Description One' },
    // Add more events here
  ];

  const handleRegister = (event) => {
    // Handle registration logic here
  };

  return (
    <Box p={4}>
      {/* <Heading mb={4}>Upcoming Events</Heading>
      <Box mb={8}>
        {events.map(event => (
          <EventCard key={event.id} event={event} onRegister={handleRegister} />
        ))}
      </Box> */}
      <Box
        p={4}
        bg="gray.100"
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
      >
        <Heading size="lg" mb={4}>Welcome to Our Event Platform</Heading>
        <Text mb={4}>
          Discover and register for amazing events. Explore various events happening around you, and be a part of the excitement.
        </Text>
        <Button
          colorScheme="teal"
          as={Link}
          to="/login"
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
