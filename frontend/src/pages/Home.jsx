import React from 'react';
import { Box, Heading, Text, SimpleGrid, Button, VStack, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaRegCalendarAlt, FaSignInAlt, FaShareAlt } from 'react-icons/fa'; // Importing icons

const Home = () => {
  const features = [
    {
      id: 1,
      title: 'Browse Events',
      description: 'Explore a wide range of events happening around you and never miss out on exciting opportunities.',
      icon: FaRegCalendarAlt,
    },
    {
      id: 2,
      title: 'Register & Attend',
      description: 'Easily register for events with just a click, and join like-minded people for amazing experiences.',
      icon: FaSignInAlt,
    },
    {
      id: 3,
      title: 'Share Events',
      description: 'Share events with your friends and family to spread the word and make events more popular.',
      icon: FaShareAlt,
    },
  ];

  return (
    <Box p={8} h={'100vh'} >
      <Heading mb={8} textAlign="center" color="white">
        How Our Platform Works
      </Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {features.map((feature) => (
          <Box
            key={feature.id}
            bg="gray.100"
            p={6}
            borderRadius="lg"
            boxShadow="lg"
            textAlign="center"
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)' }}
          >
            <VStack spacing={4}>
              <Icon as={feature.icon} w={12} h={12} color="teal.500" />
              <Heading size="md">{feature.title}</Heading>
              <Text>{feature.description}</Text>
              <Button colorScheme="gray" as={Link} to="/login">
                Learn More
              </Button>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
