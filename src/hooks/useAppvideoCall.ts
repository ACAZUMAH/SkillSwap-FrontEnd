import { useCallback } from "react";
import { useAppDispatch, useAppSelctor } from "./useReduxHooks";
import { videoActions } from "src/redux/video/slice";
import { IncomingVideoCall, VideoCall } from "src/interfaces";

export const useAppVideoCall = () => {
  const dispatch = useAppDispatch();
  const videoCall = useAppSelctor((state) => state.videos.videoCall);
  const incomingVideoCall = useAppSelctor((state) => state.videos.incomingVideoCall);

  const setVideoCall = useCallback(
    (videoCall: VideoCall | undefined) => {
      dispatch(videoActions.setVideoCall(videoCall));
    },
    [dispatch]
  );

  const setIncomingVideoCall = useCallback(
    (incomingVideoCall: IncomingVideoCall | undefined) => {
      dispatch(videoActions.setIncomingVideoCall(incomingVideoCall));
    },
    [dispatch]
  );

    const resetVideoCall = useCallback(() => {
        dispatch(videoActions.reset());
    }, [dispatch]);

  return {
    videoCall,
    incomingVideoCall,
    setVideoCall,
    setIncomingVideoCall,
    resetVideoCall
  };
}