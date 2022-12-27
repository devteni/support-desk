import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Header from "./components/Header";
import { useAppDispatch } from "./hooks/redux";
import API, { updateAPI } from "./lib/API";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./partials/Layout";
import protectedRoutes from "./routes/protectedRoutes";
import publicRoutes from "./routes/publicRoutes";
import { setExpiry, setUser } from "./slices/auth/auth";
import store from "./store";



function App() {
  const dispatch = useAppDispatch();
  const authData = store.getState().auth;
  const [refreshed, setRefreshed] = useState(false);
  const [auth, setAuth] = useState({});

  const refreshToken = () => {
    API.get("/auth/refresh-access-token")
      .then((res) => {
        if (res === undefined) {
          console.log("We could not connect to the server");
        }
        setAuth(res.data.user);
        dispatch(setExpiry(res.data.expires_in));
        setRefreshed(true);

        updateAPI(res.data.token);

        dispatch(setUser(res.data.user));
      })
      .catch((err) => {
        setAuth(err.response.data);
        setRefreshed(true);
      });
  };


  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  // expires_in value in milliseconds
  if (authData.expires_in > 0) {
    setTimeout(() => {
      console.log('triggered', authData.expires_in)
      refreshToken();
    }, authData.expires_in * 1000 - 500);
  }

  useEffect(() => {
    refreshToken();
  }, []);

  if (!refreshed) {
    return <></>;
  } else {
    return (
      <Suspense fallback={null}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
        <Router>
          <Header />
            <Routes>
                {/* Public routes */}
                {/* <Route element={<Layout auth={auth} />}>
                  {publicRoutes.map((route, i) => {
                    return (
                      <Route key={i} path={route.path} element={route.element} />
                    );
                  })}
                </Route> */}

                {/* <Route path="*" element={<NotFound />} /> */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="/forgotpassword" element={<ForgotPassword />} /> */}
                {/* <Route path="/app/password/reset" element={<ResetPassword />} /> */}

                {/* Private routes */}
                <Route element={<Layout auth={auth} secured />}>
                  {protectedRoutes.map((route: any, idx: number) => {
                    return (
                      <Route key={idx} path={route.path} element={route.element} />
                    );
                  })}
                </Route>
            </Routes>
          </Router>      
          <ToastContainer />  
        </div>
      </QueryClientProvider>
      </Suspense>
    )
  }
}

export default App
