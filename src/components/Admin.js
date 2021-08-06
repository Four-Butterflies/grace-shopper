import React from 'react';

const Admin = ({ user, admin }) => {
  return admin ? (
    <>
      <h1>ADMIN PANEL</h1>
      <h3>Welcome {`${user.username.split(' ')[0]}`}</h3>
    </>
  ) : (
    <h1>Nothing to see here... Move along.</h1>
  );
};

export default Admin;
