"use client";
import React from "react";
import { UsersHeader } from "./UsersHeader";
import { UsersTable } from "./UsersTable";

export default function UsersManager() {
  return (
    <>
      <UsersHeader />
      <UsersTable />
    </>
  );
}
