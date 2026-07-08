import { format } from 'date-fns';
import Button from '../common/Button';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const priorityColors = {
    LOW: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    MEDIUM: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    HIGH: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };
  const statusColors = {
    TODO: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    IN_PROGRESS: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    DONE: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold dark:text-white">{task.title}</h3>
        <div className="flex space-x-2">
          <Button variant="secondary" size="sm" onClick={() => onEdit(task)}>Edit</Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(task.id)}>Delete</Button>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mt-1">{task.description || 'No description'}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
        <span className={`px-2 py-1 text-xs rounded-full ${statusColors[task.status]}`}>
          {task.status.replace('_', ' ')}
        </span>
        {task.due_date && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Due: {format(new Date(task.due_date), 'MMM dd, yyyy')}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;