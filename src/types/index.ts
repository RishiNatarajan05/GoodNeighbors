export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  skills: string[];
  isAffiliated: boolean;
  organizationId?: string;
  trainingCompleted: boolean;
  badges: string[];
  createdAt: Date;
}

export interface Organization {
  id: string;
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  verified: boolean;
  createdAt: Date;
}

export interface Need {
  id: string;
  organizationId: string;
  title: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  requiredSkills: string[];
  urgency: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  volunteersNeeded: number;
  volunteersAssigned: number;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  fromId: string;
  toId: string;
  fromType: 'user' | 'organization';
  toType: 'user' | 'organization';
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'need_assigned' | 'need_updated' | 'message_received' | 'training_completed';
  title: string;
  message: string;
  read: boolean;
  timestamp: Date;
  relatedId?: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  content: string;
  duration: number; // in minutes
  required: boolean;
  order: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
} 