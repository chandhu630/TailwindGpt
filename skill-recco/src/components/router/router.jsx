import { Route, Routes } from "react-router-dom";
import Gpt from "../Gpt/Gpt";

function Router() {
    return (
      <div className="App">
        <Routes>
            <Route path="/gpt" element={<Gpt/>} />
               
        </Routes>
  
        
      </div>
    );
  }
  
  export default Router;
  