import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Flex, Input, Spinner, Center, Alert, AlertIcon, Select, Image, Text } from '@chakra-ui/react';

const EventSearch = () => {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('name'); // Default sort by name
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://event-management-ngu0.onrender.com/api/events');
        setEvents(response.data);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort events based on user input
  const filteredAndSortedEvents = events
    .filter(event =>
      event.name.toLowerCase().includes(query.toLowerCase()) ||
      event.date.toLowerCase().includes(query.toLowerCase()) ||
      event.location.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'date') {
        return new Date(a.date) - new Date(b.date);
      }
      return 0;
    });

  return (
    <Box p={5}>
      <Flex mb={5} justify="space-between">
        <Input
          type="text"
          placeholder="Search by name, date, or location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select
          width="200px"
          ml={4}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="date">Sort by Date</option>
        </Select>
      </Flex>

      {loading ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      ) : (
        <Flex flexWrap="wrap" gap={5} justify="center">
          {filteredAndSortedEvents.map(event => (
            <Box key={event._id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={3} maxWidth="200px">
              {/* <Image src={event.image} alt={event.name} /> */}
              <Box p={2}>
                <Text fontWeight="bold">{event.name}</Text>
                <Text>{new Date(event.date).toLocaleDateString()}</Text>
                <Text>{event.location}</Text>
              </Box>
            </Box>
          ))}
          {filteredAndSortedEvents.length === 0 && !loading && (
            <Text>No events found for "{query}".</Text>
          )}
        </Flex>
      )}
    </Box>
  );
};

export default EventSearch;
