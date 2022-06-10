import { useDispatch } from 'react-redux';
import { ActionDispatch } from '../config';

export const useTypedDispatch = () => useDispatch<ActionDispatch>();
