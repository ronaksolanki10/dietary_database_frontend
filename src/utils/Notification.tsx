import { enqueueSnackbar } from 'notistack';

/**
 * Display a notification message.
 * 
 * @param {string} message
 * @param {'default' | 'error' | 'success' | 'warning'} [variant='default']
 */
export const notify = (message: string, variant: 'default' | 'error' | 'success' | 'warning' = 'default') => {
  enqueueSnackbar(message, { variant });
};