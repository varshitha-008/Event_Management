import { FormControl, FormLabel, Input, Button, VStack } from '@chakra-ui/react';

const AuthForm = ({ isRegister, onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());
    onSubmit(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" />
        </FormControl>
        {isRegister && (
          <FormControl id="confirmPassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" name="confirmPassword" />
          </FormControl>
        )}
        <Button colorScheme="blue" type="submit">
          {isRegister ? 'Register' : 'Login'}
        </Button>
      </VStack>
    </form>
  );
};

export default AuthForm;
