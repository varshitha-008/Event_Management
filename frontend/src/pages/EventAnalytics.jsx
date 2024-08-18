import React, { useEffect, useState } from 'react';
import { Box, Heading, VStack, Text } from '@chakra-ui/react';
import axios from 'axios';

const EventAnalytics = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('https://event-management-ngu0.onrender.com/api/events/stats', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Box p="6">
      <Heading mb="6">Event Analytics</Heading>
      <VStack spacing="4" align="stretch">
        {stats.map((stat, index) => (
          <Box key={index} p="4" borderWidth="1px" borderRadius="lg">
            <Heading size="md">{stat.eventName}</Heading>
            <Text mt="2">Total Participants: {stat.totalParticipants}</Text>
            <Text mt="2">Waitlisted Participants: {stat.waitlistedParticipants}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default EventAnalytics;
