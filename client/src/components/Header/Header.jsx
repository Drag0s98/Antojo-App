import React from "react";
import { auth } from "../../firebase";

const Header = () => {

  const logOut = async () => {
    let res = await auth.signOut();
    console.log(res);
  }

  return (
    <header>
      <h4>Header</h4>
      <button onClick={logOut}>
        Log Out
      </button>
    </header>
  );
};

export default Header;
