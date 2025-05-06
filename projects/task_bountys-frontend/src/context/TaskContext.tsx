import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Task } from '../types';

interface TaskState {
  postedTasks: Task[];  // Store all posted tasks
  claimedTasks: Task[]; // Store only claimed tasks
}

type TaskAction = 
  | { type: 'POST_TASK'; payload: Task }        // Action to post a new task
  | { type: 'CLAIM_TASK'; payload: Task }       // Action to claim a task
  | { type: 'SUBMIT_TASK'; payload: { taskId: string; submissionLink: string } }  // Action to submit a task
  | { type: 'CLEAR_TASKS' };                    // Action to clear tasks

const initialState: TaskState = {
  postedTasks: [],    // Initial empty list for posted tasks
  claimedTasks: [],   // Initial empty list for claimed tasks
};

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'POST_TASK':
      return {
        ...state,
        postedTasks: [...state.postedTasks, action.payload],  // Add posted task to state
      };
    case 'CLAIM_TASK':
      return {
        ...state,
        claimedTasks: [...state.claimedTasks, { ...action.payload, status: 'claimed' }],
      };
    case 'SUBMIT_TASK':
      return {
        ...state,
        claimedTasks: state.claimedTasks.map(task => 
          task.id === action.payload.taskId 
            ? { 
                ...task, 
                status: 'completed',
                submissionLink: action.payload.submissionLink,
                submissionDate: new Date(),
              }
            : task
        ),
      };
    case 'CLEAR_TASKS':
      return initialState;
    default:
      return state;
  }
};

interface TaskContextType {
  state: TaskState;
  postTask: (task: Task) => void;   // Function to post a new task
  claimTask: (task: Task) => void;  // Function to claim a task
  submitTask: (taskId: string, submissionLink: string) => void;  // Function to submit a claimed task
  clearTasks: () => void;           // Function to clear tasks
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const postTask = (task: Task) => {
    dispatch({ type: 'POST_TASK', payload: task });
  };

  const claimTask = (task: Task) => {
    dispatch({ type: 'CLAIM_TASK', payload: task });
  };

  const submitTask = (taskId: string, submissionLink: string) => {
    dispatch({ type: 'SUBMIT_TASK', payload: { taskId, submissionLink } });
  };

  const clearTasks = () => {
    dispatch({ type: 'CLEAR_TASKS' });
  };

  return (
    <TaskContext.Provider value={{ state, postTask, claimTask, submitTask, clearTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};
