"use client";
import Loader from "@/components/loader";
import { ThemeProvider } from "@/components/theme-provider";
import store, { persister, useAppSelector } from "@/redux/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persister}>
            <Toaster position="top-center" />
            <LoaderProvider>{children}</LoaderProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </div>
  );
};

const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const isLoading = useAppSelector((state) => state.loader.loading);
  return (
    <>
      {isLoading && <Loader />}
      {children}
    </>
  );
};

export default AppProvider;
