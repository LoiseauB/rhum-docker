// eslint-disable-next-line import/named
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from './store';

// Utilisez ces hooks dans vos composants au lieu des hooks bruts de redux
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
