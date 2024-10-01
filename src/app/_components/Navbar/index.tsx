"use client";

import React from "react";
import Mobile from "./Mobile";
import Desktop from "./Desktop";

function Navbar() {
  return (
    <div>
      <div className="block md:hidden">
        <Mobile />
      </div>

      <div className="hidden md:block h-full">
        <Desktop />
      </div>
    </div>
  );
}

export default Navbar;
