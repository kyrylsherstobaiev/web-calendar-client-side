import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Home } from "./pages/Home.jsx";
import { SignUp } from "./pages/SignUp.jsx";
import { PageNotFound } from "./pages/PageNotFound.jsx";
import { SignIn } from "./pages/SignIn.jsx";

const client = new QueryClient();

const customTheme = extendTheme(
  withDefaultColorScheme({ colorScheme: "green" }),
);

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <ChakraProvider theme={customTheme}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </Router>
        <ReactQueryDevtools />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
