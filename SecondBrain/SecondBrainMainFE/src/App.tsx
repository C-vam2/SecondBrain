import { RecoilRoot } from "recoil";
import { Dashboard } from "./pages/Dashboard";
import { Homepage } from "./pages/Homepage";
import { Signin } from "./pages/SignIn";
import { Signup } from "./pages/Signup";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { ProtectedRoutes } from "./customRoutes/ProtectedRoutes";

export default function App(){
  return <>
  <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="signup" element={<Signup/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </>
}