import { Box, Text, Button, VStack } from '@chakra-ui/react';

const EventCard = ({ event, onRegister }) => {
  return (
    <Box borderWidth="1px" borderRadius="md" overflow="hidden" p={4} bg="white">
      <VStack spacing={3} align="start">
        <Text fontSize="lg" fontWeight="bold">{event.name}</Text>
        <Text>Date: {event.date}</Text>
        <Text>Location: {event.location}</Text>
        <Text>{event.description}</Text>
        <Button colorScheme="blue" onClick={() => onRegister(event)}>Register</Button>
      </VStack>
    </Box>
  );
};

export default EventCard;
