"use client"
import { Box } from "@chakra-ui/react";
import React, { useContext, useLayoutEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ErrorContext = React.createContext();

export default function useError() {
  return useContext(ErrorContext);
}

export function ErrorProvider({ children }) {
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    if (error) {
      messages.forEach((message) => {
        toast.error(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    } else {
      if (messages) {
        messages.forEach((message) => {
          toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      }
    }
    setError(null);
    setMessages([]);
  }, [error]);

  const value = {
    error,
    setError,
    messages,
    setMessages,
  };
  return (
    <ErrorContext.Provider value={value}>
      <Box zIndex={9999}>
        <ToastContainer />
      </Box>
      {children}
    </ErrorContext.Provider>
  );
}
