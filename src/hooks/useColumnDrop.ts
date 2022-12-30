import { ColumnType, ItemType } from "../utils/enum";
import { DragItem, TaskModel } from "../utils/models";
import { useDrop } from "react-dnd";

const useColumnDrop = (
  column: ColumnType,
  handleDrop: (fromColumn: ColumnType, taskId: TaskModel['id']) => void
  ) => {
    const [{isOver}, dropRef] = useDrop<DragItem, void, {isOver: boolean}>({
      accept: ItemType.TASK,
      drop: dragItem => {
        if(dragItem && dragItem.from !== column) {
          handleDrop(dragItem.from, dragItem.id)
        }
      },
      collect: monitor => ({isOver: monitor.isOver()})
    });

    return {
      isOver,
      dropRef
    }
};

export default useColumnDrop;