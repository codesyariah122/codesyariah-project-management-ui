
import { useState } from 'react';
import { PencilLine, CalendarPlus, Users, Edit, Trash2 } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import TaskForm from './TaskForm';
import { useToast } from '@/hooks/use-toast';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  status: 'todo' | 'inProgress' | 'done';
}

const TaskBoard = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Record<string, Task[]>>({
    todo: [
      {
        id: '1',
        title: 'Design Landing Page',
        description: 'Create wireframes and mockups for the new landing page',
        assignee: 'Sarah Chen',
        priority: 'High' as const,
        dueDate: '2024-01-15',
        status: 'todo' as const
      },
      {
        id: '2',
        title: 'Setup Analytics',
        description: 'Implement Google Analytics and conversion tracking',
        assignee: 'Mike Johnson',
        priority: 'Medium' as const,
        dueDate: '2024-01-18',
        status: 'todo' as const
      }
    ],
    inProgress: [
      {
        id: '3',
        title: 'Mobile App Development',
        description: 'Build React Native mobile application',
        assignee: 'Alex Rivera',
        priority: 'High' as const,
        dueDate: '2024-01-20',
        status: 'inProgress' as const
      }
    ],
    done: [
      {
        id: '4',
        title: 'Brand Guidelines',
        description: 'Complete brand identity and style guide',
        assignee: 'Emma Davis',
        priority: 'Medium' as const,
        dueDate: '2024-01-10',
        status: 'done' as const
      }
    ]
  });

  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString()
    };

    setTasks(prev => ({
      ...prev,
      [taskData.status]: [...prev[taskData.status], newTask]
    }));

    toast({
      title: "Task Created",
      description: "New task has been created successfully.",
    });
  };

  const handleEditTask = (taskData: Omit<Task, 'id'>) => {
    if (!editingTask) return;

    // Remove from old status
    setTasks(prev => {
      const newTasks = { ...prev };
      Object.keys(newTasks).forEach(status => {
        newTasks[status] = newTasks[status].filter(task => task.id !== editingTask.id);
      });

      // Add to new status
      const updatedTask: Task = { ...taskData, id: editingTask.id };
      newTasks[taskData.status] = [...newTasks[taskData.status], updatedTask];

      return newTasks;
    });

    setEditingTask(undefined);
    toast({
      title: "Task Updated",
      description: "Task has been updated successfully.",
    });
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => {
      const newTasks = { ...prev };
      Object.keys(newTasks).forEach(status => {
        newTasks[status] = newTasks[status].filter(task => task.id !== taskId);
      });
      return newTasks;
    });

    setDeletingTaskId(null);
    toast({
      title: "Task Deleted",
      description: "Task has been deleted successfully.",
    });
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];
    const task = sourceColumn.find(t => t.id === draggableId);

    if (!task) return;

    const updatedTask = { ...task, status: destination.droppableId as 'todo' | 'inProgress' | 'done' };

    setTasks(prev => {
      const newTasks = { ...prev };
      
      // Remove from source
      newTasks[source.droppableId] = sourceColumn.filter(t => t.id !== draggableId);
      
      // Add to destination
      const newDestColumn = [...destColumn];
      newDestColumn.splice(destination.index, 0, updatedTask);
      newTasks[destination.droppableId] = newDestColumn;

      return newTasks;
    });

    toast({
      title: "Task Moved",
      description: `Task moved to ${destination.droppableId === 'todo' ? 'To Do' : destination.droppableId === 'inProgress' ? 'In Progress' : 'Done'}.`,
    });
  };

  const TaskCard = ({ task, index }: { task: Task; index: number }) => (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Card 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-3 hover:shadow-md transition-shadow cursor-pointer"
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-800 text-sm">{task.title}</h4>
              <div className="flex items-center space-x-1">
                <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingTask(task);
                  }}
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeletingTaskId(task.id);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-3 line-clamp-2">{task.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>{task.assignee}</span>
              </div>
              <div className="flex items-center space-x-1">
                <CalendarPlus className="h-3 w-3" />
                <span>{task.dueDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );

  const columnConfig = [
    { id: 'todo', title: 'To Do', bgColor: 'bg-gray-50', dotColor: 'bg-gray-400' },
    { id: 'inProgress', title: 'In Progress', bgColor: 'bg-blue-50', dotColor: 'bg-blue-500' },
    { id: 'done', title: 'Done', bgColor: 'bg-green-50', dotColor: 'bg-green-500' }
  ];

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columnConfig.map(column => (
            <div key={column.id} className={`${column.bgColor} rounded-lg p-4`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800 flex items-center">
                  <div className={`w-3 h-3 ${column.dotColor} rounded-full mr-2`}></div>
                  {column.title} ({tasks[column.id].length})
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setIsTaskFormOpen(true)}>
                  <PencilLine className="h-4 w-4" />
                </Button>
              </div>
              
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[200px]">
                    {tasks[column.id].map((task, index) => (
                      <TaskCard key={task.id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <TaskForm
        isOpen={isTaskFormOpen || !!editingTask}
        onClose={() => {
          setIsTaskFormOpen(false);
          setEditingTask(undefined);
        }}
        onSubmit={editingTask ? handleEditTask : handleCreateTask}
        task={editingTask}
        mode={editingTask ? 'edit' : 'create'}
      />

      <AlertDialog open={!!deletingTaskId} onOpenChange={() => setDeletingTaskId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this task? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deletingTaskId && handleDeleteTask(deletingTaskId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TaskBoard;
