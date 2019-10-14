import React, { useEffect, useState } from "react";
import Routes from "./Routes";
import { setAccessToken } from "./accessToken";
import { UnaryFn } from "./utils/functionsTypes";
import { refreshAccessToken } from "./requests/login";

const refreshUserAccessToken = (setLoading: UnaryFn<boolean, void>): void => {
    refreshAccessToken()
      .then(async result => {
      const { accessToken, ok } = await result.json();
      
      try {
        if (ok && ok === true && accessToken) {
          setAccessToken(accessToken);
        }
      } catch (err) {
        console.error("Refreshing Token: ", err);
      }
      setLoading(false);
    });
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect( () => {
    refreshUserAccessToken(setLoading);
  }, []);
  
  if (loading) {
    return <div>loading...</div>
  }
  
  return <Routes />;
};

export default App;
