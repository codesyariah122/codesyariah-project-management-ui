
import { useState } from 'react';
import { pencil, calendar-plus, users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
}

const TaskBoard = () => {
  const [tasks] = useState({
    todo: [
      {
        id: '1',
        title: 'Design Landing Page',
        description: 'Create wireframes and mockups for the new landing page',
        assignee: 'Sarah Chen',
        priority: 'High' as const,
        dueDate: '2024-01-15'
      },
      {
        id: '2',
        title: 'Setup Analytics',
        description: 'Implement Google Analytics and conversion tracking',
        assignee: 'Mike Johnson',
        priority: 'Medium' as const,
        dueDate: '2024-01-18'
      }
    ],
    inProgress: [
      {
        id: '3',
        title: 'Mobile App Development',
        description: 'Build React Native mobile application',
        assignee: 'Alex Rivera',
        priority: 'High' as const,
        dueDate: '2024-01-20'
      }
    ],
    done: [
      {
        id: '4',
        title: 'Brand Guidelines',
        description: 'Complete brand identity and style guide',
        assignee: 'Emma Davis',
        priority: 'Medium' as const,
        dueDate: '2024-01-10'
      }
    ]
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const TaskCard = ({ task }: { task: Task }) => (
    <Card className="mb-3 hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-gray-800 text-sm">{task.title}</h4>
          <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </Badge>
        </div>
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{task.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <users className="h-3 w-3" />
            <span>{task.assignee}</span>
          </div>
          <div className="flex items-center space-x-1">
            <calendar-plus className="h-3 w-3" />
            <span>{task.dueDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* To Do Column */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 flex items-center">
            <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
            To Do ({tasks.todo.length})
          </h3>
          <Button variant="ghost" size="sm">
            <pencil className="h-4 w-4" />
          </Button>
        </div>
        {tasks.todo.map(task => <TaskCard key={task.id} task={task} />)}
      </div>

      {/* In Progress Column */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            In Progress ({tasks.inProgress.length})
          </h3>
          <Button variant="ghost" size="sm">
            <pencil className="h-4 w-4" />
          </Button>
        </div>
        {tasks.inProgress.map(task => <TaskCard key={task.id} task={task} />)}
      </div>

      {/* Done Column */}
      <div className="bg-green-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            Done ({tasks.done.length})
          </h3>
          <Button variant="ghost" size="sm">
            <pencil className="h-4 w-4" />
          </Button>
        </div>
        {tasks.done.map(task => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
};

export default TaskBoard;
