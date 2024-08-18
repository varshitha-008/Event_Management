import React, { useState } from 'react';
import { Box, Flex, Button, Heading, Input, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
// import { AiOutlineSearch } from 'react-icons/ai';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      onClose(); // Close the drawer after search
    }
  };

  return (
    <Flex as="nav" p={4} bg="gray.800" color="white" align="center" justify="space-between">
      <Heading size="lg">Event Manager</Heading>
      <Box>
        <Button as={Link} to="/" mr={4}>Home</Button>
        <Button as={Link} to="/login" mr={4}>Login</Button>
        <Button as={Link} to="/register">Register</Button>
        <Button onClick={onOpen} ml={4} colorScheme='white' variant="outline" >
          Search
        </Button>
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search Events</DrawerHeader>
          <DrawerBody>
            <Input
              placeholder="Search by name, date, or location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button mt={4} colorScheme="teal" onClick={handleSearch}>
              Search
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Navbar;
