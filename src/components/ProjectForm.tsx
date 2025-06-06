
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Project {
  id: number;
  title: string;
  description: string;
  status: 'In Progress' | 'Completed' | 'Planning';
  dueDate: string;
  teamMembers: number;
  progress: number;
  priority: 'High' | 'Medium' | 'Low';
}

interface ProjectFormProps {
  project?: Project;
  onSubmit: (projectData: Omit<Project, 'id'>) => void;
  onCancel: () => void;
}

const ProjectForm = ({ project, onSubmit, onCancel }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    status: project?.status || 'Planning' as const,
    dueDate: project?.dueDate || '',
    teamMembers: project?.teamMembers || 1,
    progress: project?.progress || 0,
    priority: project?.priority || 'Medium' as const
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    }
    
    if (formData.teamMembers < 1) {
      newErrors.teamMembers = 'Team members must be at least 1';
    }
    
    if (formData.progress < 0 || formData.progress > 100) {
      newErrors.progress = 'Progress must be between 0 and 100';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('ProjectForm: handleSubmit called with data:', formData);
    
    if (isSubmitting) {
      console.log('ProjectForm: Already submitting, ignoring duplicate submission');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (!validateForm()) {
        console.log('ProjectForm: Form validation failed:', errors);
        setIsSubmitting(false);
        return;
      }
      
      console.log('ProjectForm: Form validation passed, calling onSubmit');
      await onSubmit(formData);
      console.log('ProjectForm: onSubmit completed successfully');
      
    } catch (error) {
      console.error('ProjectForm: Error during submission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    console.log('ProjectForm: Field changed:', field, value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleCancel = () => {
    console.log('ProjectForm: Cancel button clicked');
    onCancel();
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle>
          {project ? 'Edit Project' : 'Create New Project'}
        </DialogTitle>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Title *
          </label>
          <Input
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Enter project title"
            className={errors.title ? 'border-red-500' : ''}
            disabled={isSubmitting}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <Textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Enter project description"
            rows={3}
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <Select 
              value={formData.status} 
              onValueChange={(value: 'Planning' | 'In Progress' | 'Completed') => handleChange('status', value)}
              disabled={isSubmitting}
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
              onValueChange={(value: 'Low' | 'Medium' | 'High') => handleChange('priority', value)}
              disabled={isSubmitting}
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
              onChange={(e) => handleChange('dueDate', e.target.value)}
              placeholder="e.g., Jan 30, 2024"
              disabled={isSubmitting}
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
              onChange={(e) => handleChange('teamMembers', parseInt(e.target.value) || 1)}
              className={errors.teamMembers ? 'border-red-500' : ''}
              disabled={isSubmitting}
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
            onChange={(e) => handleChange('progress', parseInt(e.target.value) || 0)}
            className={errors.progress ? 'border-red-500' : ''}
            disabled={isSubmitting}
          />
          {errors.progress && <p className="text-red-500 text-xs mt-1">{errors.progress}</p>}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : (project ? 'Update Project' : 'Create Project')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
