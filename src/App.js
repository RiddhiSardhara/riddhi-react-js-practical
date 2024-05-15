// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

// import { GET_USER_PENDING } from "./redux-saga/users/action/action";
import Product from "./componets/Product";
import Navbar from "./componets/Navbar";



function App() {
  // let dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({ type: GET_USER_PENDING});
  // }, []);

  return (
    <div className="App">
      <Navbar/>
      <Product/>
      
    </div>
  );
}

export default App;