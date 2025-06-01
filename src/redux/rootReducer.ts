import authentication from "./authentication/slice";
import { combineReducers } from "@reduxjs/toolkit";
import settings from './settings/slice';

export const rootReducer = combineReducers({
  authentication,
  settings
});

