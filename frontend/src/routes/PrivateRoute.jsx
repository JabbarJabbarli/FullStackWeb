import { useState } from "react";

const PrivateRoute = async ({ children }) => {
  const [isToken, setisTokenReal] = useState(null);

  const response = await fetch("http://localhost:8000/");
};
export default PrivateRoute;
