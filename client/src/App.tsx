import { Route, Routes } from "react-router-dom";
import { useStore } from "./store";

// import { useState } from 'react'

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectRoute from "./components/ProtectRout";

import AuthForm from "./pages/AuthForm";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard/index";
import PetForm from "./pages/PetForm";

function App() {
  const { state } = useStore()!;


  return (
    <>
      {state.loading && (
        <div className="loading-overlay d-flex justify-content-center align-items-center">
          <h2>Loading...</h2>
        </div>
      )}

      <Header />

      <main className="flex-fill">
        <Routes>
          <Route path="/" element={<Landing />} />


          <Route path="/register" element={(
            <ProtectRoute>
              <AuthForm isLogin={false} />
            </ProtectRoute>
          )} />
          <Route path="/login" element={(
            <ProtectRoute>
              <AuthForm isLogin={true} />
            </ProtectRoute>
          )} />

          <Route path="/pet/add" element={(
            <ProtectRoute>
              <PetForm />
            </ProtectRoute>
          )} />    

          <Route path="/dashboard" element={(
            <ProtectRoute>
              <Dashboard />
            </ProtectRoute>
          )} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
