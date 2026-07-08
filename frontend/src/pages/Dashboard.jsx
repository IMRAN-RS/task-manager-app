import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getTasks, createTask, updateTask, deleteTask } from '../services/tasks';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import TaskFilter from '../components/tasks/TaskFilter';
import Navbar from '../components/common/Navbar';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: '', priority: '' });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      const res = await getTasks(params);
      setTasks(res.data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const handleCreate = async (data) => {
    try {
      await createTask(data);
      toast.success('Task created');
      setIsFormOpen(false);
      fetchTasks();
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateTask(editingTask.id, data);
      toast.success('Task updated');
      setEditingTask(null);
      setIsFormOpen(false);
      fetchTasks();
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this task?')) {
      try {
        await deleteTask(id);
        toast.success('Task deleted');
        fetchTasks();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">Your Tasks</h2>
          <Button onClick={() => { setEditingTask(null); setIsFormOpen(true); }}>+ New Task</Button>
        </div>

        <TaskFilter filters={filters} setFilters={setFilters} />

        {isFormOpen && (
          <div className="mb-6">
            <TaskForm
              initialData={editingTask}
              onSubmit={editingTask ? handleUpdate : handleCreate}
              onCancel={closeForm}
            />
          </div>
        )}

        <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Dashboard;