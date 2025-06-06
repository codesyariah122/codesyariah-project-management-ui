
import { ProjectFormData, FormErrors } from './ProjectFormTypes';

export const validateProjectForm = (formData: ProjectFormData): FormErrors => {
  const errors: FormErrors = {};
  
  if (!formData.title.trim()) {
    errors.title = 'Project title is required';
  }
  
  if (formData.teamMembers < 1) {
    errors.teamMembers = 'Team members must be at least 1';
  }
  
  if (formData.progress < 0 || formData.progress > 100) {
    errors.progress = 'Progress must be between 0 and 100';
  }
  
  return errors;
};
