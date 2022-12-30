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
}

const Task = ({
  index,
  task,
  onDelete: handleDelete,
  onUpdate: handleUpdate
}: TaskProps) => {

  const { ref, isDragging } = useTaskDragAndDrop<HTMLDivElement>({
    task,
    index
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
      pr={7}
      pt={3}
      pb={1}
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
        value={task.title}
        fontWeight={'semibold'}
        cursor={'inherit'}
        border={'none'}
        p={0}
        resize={'none'}
        minH={70}
        maxH={200}
        focusBorderColor={'none'}
        color={'gray.700'}
        onChange={handleTitleChange}
      />

    </Box>
  );
};

export default Task;