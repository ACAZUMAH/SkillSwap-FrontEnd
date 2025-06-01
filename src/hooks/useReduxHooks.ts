import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import {  AppDispatch, RootState } from "src/redux/store";

export const useAppSelctor: TypedUseSelectorHook<RootState> = useSelector

export const useAppDispatch: () => AppDispatch = useDispatch;