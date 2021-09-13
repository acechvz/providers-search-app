import { useContext } from 'react';
import { AppContext } from '../providers/AppProvider';

export const useAppStore = () => {
  const context = useContext(AppContext);

  if (!context) throw Error('useAppStore must be used within a AppProvider.');

  return context;
};
