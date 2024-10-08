"use client"
import { Inter } from 'next/font/google';
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ErrorProvider } from "@/context/ErrorContext";
import { AuthProvider } from "@/context/AuthContext";
import { extendTheme } from '@chakra-ui/react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const config = {
    initialColorMode: "system", // Initialized as current system color mode
    useSystemColorMode: true, // Attached to system value
  };
  
  const theme = extendTheme({ config });

  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning={true} >
      <body className={`bg-white grid min-h-[100dvh] grid-rows-[auto_1fr_auto] ${inter.className} font-HelveticaNeue text-black bg-gray-50 dark:bg-black relative dark:text-white dark:text-opacity-90 transition duration-1000`} >
        <ChakraProvider theme={theme}>
          <ErrorProvider className="z-[9999]">
            <AuthProvider>
              <div className="min-h-screen">
                {children}
              </div>
            </AuthProvider>
          </ErrorProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
