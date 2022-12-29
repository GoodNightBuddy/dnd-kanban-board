import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/react';
import React, { useState } from 'react';

const Form: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const isInvalid = !password || !email;

  const handleSignIn: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
  }

  return (
    <form method='POST' onSubmit={handleSignIn}>
      <Stack maxW={600} margin={'auto'} spacing={5} mt={10}>
        <FormControl isInvalid={isInvalid}>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <InputGroup>
            <Input
              type={'email'}
              id={'email'}
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
              isRequired
              aria-describedby='email-helper-text'
            />
          </InputGroup>

          {!isInvalid ? (
            <FormHelperText>
              Enter the email you'd like to receive the newsletter on.
            </FormHelperText>
          ) : (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              id={'password'}
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
              isRequired
              aria-describedby='email-helper-text'
            />
            <InputRightElement w={'4.5rem'}>
              <Button size={'sm'} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>

          {!isInvalid ? (
            <FormHelperText>
              Enter the password you'd like to receive the newsletter on.
            </FormHelperText>
          ) : (
            <FormErrorMessage>EPassword is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl>
          <Button type='submit' disabled={isInvalid} colorScheme='blue'>
            Sign In
          </Button>
        </FormControl>
      </Stack>
    </form>
  );
};

export default Form;