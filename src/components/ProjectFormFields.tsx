
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ProjectFormData, FormErrors } from './ProjectFormTypes';

interface ProjectFormFieldsProps {
  formData: ProjectFormData;
  errors: FormErrors;
  onFieldChange: (field: string, value: string | number) => void;
}

const ProjectFormFields = ({ formData, errors, onFieldChange }: ProjectFormFieldsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Title *
        </label>
        <Input
          value={formData.title}
          onChange={(e) => onFieldChange('title', e.target.value)}
          placeholder="Enter project title"
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <Textarea
          value={formData.description}
          onChange={(e) => onFieldChange('description', e.target.value)}
          placeholder="Enter project description"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <Select 
            value={formData.status} 
            onValueChange={(value: 'Planning' | 'In Progress' | 'Completed') => onFieldChange('status', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Planning">Planning</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <Select 
            value={formData.priority} 
            onValueChange={(value: 'Low' | 'Medium' | 'High') => onFieldChange('priority', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <Input
            value={formData.dueDate}
            onChange={(e) => onFieldChange('dueDate', e.target.value)}
            placeholder="e.g., Jan 30, 2024"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Team Members
          </label>
          <Input
            type="number"
            min="1"
            value={formData.teamMembers}
            onChange={(e) => onFieldChange('teamMembers', parseInt(e.target.value) || 1)}
            className={errors.teamMembers ? 'border-red-500' : ''}
          />
          {errors.teamMembers && <p className="text-red-500 text-xs mt-1">{errors.teamMembers}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Progress (%)
        </label>
        <Input
          type="number"
          min="0"
          max="100"
          value={formData.progress}
          onChange={(e) => onFieldChange('progress', parseInt(e.target.value) || 0)}
          className={errors.progress ? 'border-red-500' : ''}
        />
        {errors.progress && <p className="text-red-500 text-xs mt-1">{errors.progress}</p>}
      </div>
    </div>
  );
};

export default ProjectFormFields;
