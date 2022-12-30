import { useCallback } from "react";
import { v4 } from "uuid";
import { ColumnType } from "../utils/enum"
import { pickChakraRandomColor } from "../utils/helper";
import { TaskModel } from "../utils/models";
import useTaskCollection from "./useTaskCollection";

const MAX_TASKS_PER_COLUMN = 50;

const useColumnTasks = (column: ColumnType) => {
  const [tasks, setTasks] = useTaskCollection();

  const addEmptyTask = useCallback(() => {
    console.log(`Adding new empty task to ${column} column`);

    setTasks((allTasks) => {
      const columnTasks = allTasks[column];

      if (columnTasks.length > MAX_TASKS_PER_COLUMN) {
        console.log('Too many tasks!')
        return allTasks
      }

      const newColumnTask: TaskModel = {
        id: v4(),
        title: `New ${column} task`,
        color: pickChakraRandomColor('.300'),
        column
      }

      return {
        ...allTasks,
        [column]: [newColumnTask, ...columnTasks]
      }
    })
  }, [column, setTasks])

  const updateTask = useCallback(
    (id: TaskModel['id'], updatedTask: Omit<Partial<TaskModel>, 'id'>) => {
      console.log(`Updating tasg ${id} with ${JSON.stringify(updatedTask)}`);

      setTasks(allTasks => {
        const columnTasks = allTasks[column];

        return {
          ...allTasks,
          [column]: columnTasks.map(task =>
            task.id === id ? { ...task, ...updatedTask } : task
          ),
        }
      })
    }, [column, setTasks]);

  const deleteTask = useCallback((id: TaskModel['id']) => {
    console.log(`Removeng tsk ${id}..`)

    setTasks(allTasks => {
      const columnTasks = allTasks[column];
      return {
        ...allTasks,
        [column]: columnTasks.filter(task => task.id !== id)
      }
    })
  }, [column, setTasks])

  const dropTaskFrom = useCallback((from: ColumnType, id: TaskModel['id']) => {
    setTasks(allTasks => {
      const fromColumnTasks = allTasks[from];
      const toColumnTasks = allTasks[column];
      const movingTask = fromColumnTasks.find(task => task.id === id);

      console.log(`Moving task ${movingTask} from ${from} to ${column}`)

      if(!movingTask) {
        return allTasks
      }

      return {
        ...allTasks,
        [from]: fromColumnTasks.filter(task => task.id !== id),
        [column]: [{...movingTask, column}, ...toColumnTasks]
      }
    })
  }, [column, setTasks])

  return {
    tasks: tasks[column],
    addEmptyTask,
    updateTask,
    deleteTask,
    dropTaskFrom
  }
};

export default useColumnTasks;