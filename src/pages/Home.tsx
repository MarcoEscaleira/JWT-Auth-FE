import React from "react";
import { useUsersQuery } from "../generated/graphql";

const Home: React.FC = () => {
  const { data, loading } = useUsersQuery();
  return (
    <div>
      <h1>Home page</h1>
      {loading ? (
        <div>loading users...</div>
      ) : (
        <div>
          <h2>Users</h2>
          <ul>
            {data &&
              data.users.map(user => (
                <li key={user.id}>
                  {user.email} - {user.id}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
