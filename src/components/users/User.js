import React, { Component } from "react";
import UserItem from "./UserItem";
import Spinner from "../layouts/Spinner";

const User = ({ users, loading }) => {
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gridGap: "1rem",
          }}
        >
          {users.map((user) => (
            <UserItem user={user} key={user.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default User;
