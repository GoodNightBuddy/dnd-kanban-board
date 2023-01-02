import { IconButton, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const DarkModeIconButton = ({...rest}: React.ComponentPropsWithoutRef<typeof IconButton>) => {
  
  const {colorMode, toggleColorMode} = useColorMode();

  const isDark = colorMode === 'dark';

  return (
    <IconButton
      onClick={toggleColorMode}
      icon={isDark ? <FaMoon /> : <FaSun />}
      aria-label={'dark-mode-toggle'}
      {...rest}
      w={'35px'}
      h={'35px'}
      />
  );
};

export default DarkModeIconButton;