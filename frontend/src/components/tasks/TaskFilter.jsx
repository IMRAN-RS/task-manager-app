import { PRIORITIES, STATUSES } from '../../utils/constants';

const TaskFilter = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value || undefined }));
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded">
      <select name="status" value={filters.status || ''} onChange={handleChange} className="px-3 py-2 border rounded dark:bg-gray-800 dark:text-white">
        <option value="">All Status</option>
        {STATUSES.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
      </select>
      <select name="priority" value={filters.priority || ''} onChange={handleChange} className="px-3 py-2 border rounded dark:bg-gray-800 dark:text-white">
        <option value="">All Priorities</option>
        {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
      </select>
      <button onClick={() => setFilters({ status: '', priority: '' })} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded">
        Clear
      </button>
    </div>
  );
};

export default TaskFilter;