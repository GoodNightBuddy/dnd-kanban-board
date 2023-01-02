import { Box, IconButton, } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import React from 'react';
import { TaskModel } from '../utils/models';
import { AutoResizeTextarea } from './AutoResizeTextArea';
import { useTaskDragAndDrop } from '../hooks/useTaskDragAndDrop'

interface TaskProps {
  index: number;
  task: TaskModel;
  onUpdate: (id: TaskModel['id'], updatedTask: TaskModel) => void;
  onDelete: (id: TaskModel['id']) => void;
  onDropHover: (i: number, j: number) => void;
}

const Task = ({
  index,
  task,
  onDelete: handleDelete,
  onUpdate: handleUpdate,
  onDropHover: handleDropHover
}: TaskProps) => {

  const { ref, isDragging } = useTaskDragAndDrop<HTMLDivElement>({
    task,
    index,
    handleDropHover
  });

  const handleTitleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const newTitle = e.target.value;
    handleUpdate(task.id, { ...task, title: newTitle });
  };

  const handleDeleteClick = () => {
    handleDelete(task.id);
  };

  return (
    <Box
      as='div'
      role={'group'}
      ref={ref}
      position="relative"
      rounded={'lg'}
      w={200}
      pl={3}
      pr={2}
      pt={3}
      pb={1}
      minW={{ base: 40, md: 'unset' }}
      boxShadow='xl'
      cursor={'grab'}
      bgColor={task.color}
      opacity={isDragging ? 0.5 : 1}
    >
      <IconButton
        position={'absolute'}
        top={0}
        right={0}
        zIndex={100}
        aria-label={'delete task'}
        size={'md'}
        colorScheme={'solid'}
        color={'gray.700'}
        icon={<FaTrash />}
        opacity={0}
        _groupHover={{
          opacity: 1
        }}
        onClick={handleDeleteClick}
      />
      <AutoResizeTextarea
        fontSize={{ base: 'small', sm: '0.9rem', md: 'md'}}
        lineHeight={{ base: '1', md: 'md'}}
        value={task.title}
        fontWeight={'semibold'}
        cursor={'inherit'}
        border={'none'}
        p={0}
        resize={'none'}
        minH={70}
        maxH={200}
        maxW={'100%'}
        focusBorderColor={'none'}
        color={'gray.700'}
        onChange={handleTitleChange}
        _focusVisible={{border: 'none'}}
      />

    </Box>
  );
};

export default Task;