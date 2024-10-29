import {configureStore} from '@reduxjs/toolkit';
import authedUser from "./authedUser";
import users from "./users";
import questions from "./questions";

export const store = configureStore({
  reducer: {
    authedUser,
    users,
    questions,
  },
});
