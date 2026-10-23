import { useEffect } from "react";
import { socket } from "../services/socket";
import { useNotification } from "./useNotification";

export function useSocket() {
  const { addNotification } = useNotification();

  useEffect(() => {
    socket.on("notification", data => {
      addNotification({
        id: Date.now(),
        message: data.message,
        read: false
      });
    });

    return () => socket.off("notification");
  }, [addNotification]);
}