
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ProjectFormFields from './ProjectFormFields';
import { validateProjectForm } from './ProjectFormValidation';
import { ProjectFormProps, ProjectFormData, FormErrors } from './ProjectFormTypes';

const ProjectForm = ({ project, onSubmit, onCancel }: ProjectFormProps) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: project?.title || '',
    description: project?.description || '',
    status: project?.status || 'Planning',
    dueDate: project?.dueDate || '',
    teamMembers: project?.teamMembers || 1,
    progress: project?.progress || 0,
    priority: project?.priority || 'Medium'
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('ProjectForm: handleSubmit called');
    
    const validationErrors = validateProjectForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      console.log('ProjectForm: Form validation failed');
      setErrors(validationErrors);
      return;
    }
    
    console.log('ProjectForm: Form valid, submitting:', formData);
    onSubmit(formData);
  };

  const handleFieldChange = (field: string, value: string | number) => {
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

  return (
    <div>
      <DialogHeader>
        <DialogTitle>
          {project ? 'Edit Project' : 'Create New Project'}
        </DialogTitle>
        <DialogDescription>
          {project ? 'Update your project details below.' : 'Fill in the details to create a new project.'}
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="mt-4">
        <ProjectFormFields 
          formData={formData}
          errors={errors}
          onFieldChange={handleFieldChange}
        />

        <div className="flex justify-end space-x-2 pt-4 mt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            {project ? 'Update Project' : 'Create Project'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
