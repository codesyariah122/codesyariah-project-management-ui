
export interface Project {
  id: number;
  title: string;
  description: string;
  status: 'In Progress' | 'Completed' | 'Planning';
  dueDate: string;
  teamMembers: number;
  progress: number;
  priority: 'High' | 'Medium' | 'Low';
}

export interface ProjectFormProps {
  project?: Project;
  onSubmit: (projectData: Omit<Project, 'id'>) => void;
  onCancel: () => void;
}

export interface ProjectFormData {
  title: string;
  description: string;
  status: 'In Progress' | 'Completed' | 'Planning';
  dueDate: string;
  teamMembers: number;
  progress: number;
  priority: 'High' | 'Medium' | 'Low';
}

export interface FormErrors {
  [key: string]: string;
}
