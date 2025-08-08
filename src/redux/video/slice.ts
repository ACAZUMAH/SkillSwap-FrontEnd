import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IncomingVideoCall, VideoCall, VideoCallState } from "src/interfaces";

const initialState: VideoCallState = {
  videoCall: undefined,
  incomingVideoCall: undefined,
};

const videoCallSlice = createSlice({
  name: "videoCall",
  initialState,
  reducers: {
    setVideoCall(state, action: PayloadAction<VideoCall | undefined>) {
      return { ...state, videoCall: action.payload };
    },
    setIncomingVideoCall(
      state,
      action: PayloadAction<IncomingVideoCall | undefined>
    ) {
      return { ...state, incomingVideoCall: action.payload };
    },

    reset: () => {
      return initialState;
    },
  },
});

export default videoCallSlice.reducer;

export const videoActions = videoCallSlice.actions;
