import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Question from "./components/Question";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [sessionId, setSessionId] = useState("");
  // const history = useNavigate();
  function NotFound() {
    return (
      <div>
        <h1>404 - Page not found</h1>
        {/* You can also add a link to go back to the homepage */}
        <Link to="/">Go back to the homepage</Link>
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            {!isLoggedIn ? (
              <Route
                path="/question"
                element={
                  <Question sessionId={sessionId} setSessionId={setSessionId} />
                }
              />
            ) : (
              <Route
                exact
                path="/"
                element={
                  <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                }
              />
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
