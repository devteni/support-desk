import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./partials/Layout";
import protectedRoutes from "./routes/protectedRoutes";
import publicRoutes from "./routes/publicRoutes";



function App() {
  // const refreshToken = () => {
  //   API.get("/auth/refresh-access-token")
  //     .then((res) => {
  //       if (res === undefined) {
  //         console.log("We could not connect to the server");
  //       }
  //       setAuth(res.data);
  //       setRefreshed(true);

  //       updateAPI(res.data.access_token);

  //       store.dispatch(setUser(res.data.user));
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       setAuth(err.response.data);
  //       setRefreshed(true);
  //     });
  // };
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

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
              {/* <Route element={<Layout auth={auth} secured />}>
                {protectedRoutes.map((route, i) => {
                  return (
                    <Route key={i} path={route.path} element={route.element} />
                  );
                })}
              </Route> */}
          </Routes>
        </Router>        
      </div>
    </QueryClientProvider>
    </Suspense>
  )
}

export default App
