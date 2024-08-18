import { FormControl, FormLabel, Input, Button, VStack } from '@chakra-ui/react';

const EventForm = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const eventData = Object.fromEntries(formData.entries());
    onSubmit(eventData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl id="name" isRequired>
          <FormLabel>Event Name</FormLabel>
          <Input name="name" />
        </FormControl>
        <FormControl id="date" isRequired>
          <FormLabel>Date</FormLabel>
          <Input type="date" name="date" />
        </FormControl>
        <FormControl id="location" isRequired>
          <FormLabel>Location</FormLabel>
          <Input name="location" />
        </FormControl>
        <FormControl id="description" isRequired>
          <FormLabel>Description</FormLabel>
          <Input name="description" />
        </FormControl>
        <Button colorScheme="blue" type="submit">Submit</Button>
      </VStack>
    </form>
  );
};

export default EventForm;
