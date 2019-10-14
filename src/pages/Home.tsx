import React from 'react';
import { useUsersQuery } from "../generated/graphql";

interface Props {}

const Home: React.FC<Props> = () => {
  const {data, loading} = useUsersQuery({
    // Not looking on cache, forcing request to be will always done
    fetchPolicy: 'network-only'
  });
  return (
    <div>
      <h1>Home page</h1>
      {!data && loading ? (
        <div>loading users...</div>
      ) : (
        <div>
          <h2>Users</h2>
          <ul>
            {
              data && data.users.map(user => (
                <li key={user.id}>{user.email} - {user.id}</li>
              ))
            }
          </ul>
        </div>
      )}
    </div>
  )
};

export default Home;
