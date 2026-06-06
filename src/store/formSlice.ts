import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FormValues } from "../types/types";

type Submission = {
  id: string;
  type: "uncontrolled" | "rhf";
  data: FormValues;
};

type FormState = {
  submissions: Submission[];
};

const initialState: FormState = {
  submissions: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addSubmission(state, action: PayloadAction<Submission>) {
      state.submissions.push(action.payload);
    },
  },
});

export const { addSubmission } = formSlice.actions;
export default formSlice.reducer;