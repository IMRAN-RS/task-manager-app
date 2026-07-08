import { useState, useEffect } from 'react';
import { PRIORITIES, STATUSES } from '../../utils/constants';
import Button from '../common/Button';
import Input from '../common/Input';
import { suggestTask } from '../../services/ai';
import toast from 'react-hot-toast';

const TaskForm = ({ initialData, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    due_date: '',
    priority: 'MEDIUM',
    status: 'TODO',
  });
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        due_date: initialData.due_date ? initialData.due_date.slice(0, 10) : '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      due_date: form.due_date ? `${form.due_date}T00:00:00` : undefined,
    };
    if (!payload.due_date) {
      delete payload.due_date;
    }
    onSubmit(payload);
  };

  const handleAISuggest = async () => {
    if (!form.title.trim()) {
      toast.error('Please enter a task title first');
      return;
    }
    setLoadingAI(true);
    try {
      const res = await suggestTask(form.title);
      const data = res.data;
      setForm((prev) => ({
        ...prev,
        description: data.description,
        priority: data.priority,
      }));
      toast.success('AI suggestion applied');
    } catch (error) {
      toast.error(error.response?.data?.detail || error.message || 'AI suggestion failed');
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <Input label="Title" name="title" value={form.title} onChange={handleChange} required />
      <div className="flex gap-2 items-end">
        <Input label="Description" name="description" value={form.description} onChange={handleChange} className="flex-1" />
        <Button type="button" variant="secondary" onClick={handleAISuggest} disabled={loadingAI} className="mb-4">
          {loadingAI ? '...' : 'AI Suggest'}
        </Button>
      </div>
      <Input label="Due Date" type="date" name="due_date" value={form.due_date} onChange={handleChange} />
      <div className="flex flex-wrap gap-4 mb-4">
        <select name="priority" value={form.priority} onChange={handleChange} className="px-3 py-2 border rounded dark:bg-gray-700 dark:text-white">
          {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <select name="status" value={form.status} onChange={handleChange} className="px-3 py-2 border rounded dark:bg-gray-700 dark:text-white">
          {STATUSES.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{initialData ? 'Update' : 'Create'}</Button>
      </div>
    </form>
  );
};

export default TaskForm;