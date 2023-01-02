import { Badge, Box, Heading, IconButton, Stack, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import useColumnDrop from '../hooks/useColumnDrop';
import useColumnTasks from '../hooks/useColumnTasks';
import { ColumnType } from '../utils/enum';
import Task from './Task';

const ColumnColorScheme: Record<ColumnType, string> = {
  Todo: 'gray',
  'In progress': 'blue',
  Blocked: 'red',
  Completed: 'green'
}

const Column = ({ column }: { column: ColumnType }) => {

  const { tasks, addEmptyTask, updateTask, deleteTask, dropTaskFrom, swapTasks} = useColumnTasks(column);

  const { dropRef, isOver } = useColumnDrop(column, dropTaskFrom)

  const columnTasks = tasks.map((task, index) =>
    <Task
      key={task.id}
      index={index}
      task={task}
      onDelete={deleteTask}
      onUpdate={updateTask}
      onDropHover={swapTasks}
    />)

  return (
    <Box>
      <Heading fontSize={'md'} mb={4} letterSpacing={'wide'}>
        <Badge
          px={2}
          py={1}
          rounded={'lg'}
          colorScheme={ColumnColorScheme[column]}
        >
          {column}
        </Badge>
      </Heading>
      <IconButton
        aria-label={'add task'}
        size={'xs'}
        w={'full'}
        color={useColorModeValue('gray.500', 'gray.400')}
        bgColor={useColorModeValue('gray.100', 'gray.700')}
        _hover={{ bgColor: useColorModeValue('gray.200', 'gray.600') }}
        py={2}
        variant={'solid'}
        colorScheme={'black'}
        icon={<FaPlus />}
        onClick={addEmptyTask}
      />
      <Stack
        ref={dropRef}
        direction={{ base: 'row', md: 'column' }}
        h={{ base: '255', md: '600' }}
        p={4}
        mt={2}
        spacing={4}
        bgColor={useColorModeValue('gray.50', 'gray.900')}
        rounded={'lg'}
        boxShadow={'md'}
        overflow={'auto'}
        opacity={isOver ? 0.85 : 1}
        alignItems={'flex-start'}
      >{columnTasks}
      </Stack>
    </Box>
  );
};

export default Column;