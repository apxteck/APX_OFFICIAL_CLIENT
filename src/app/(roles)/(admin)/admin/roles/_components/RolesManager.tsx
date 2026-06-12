"use client";
import React from "react";
import { RolesHeader } from "./RolesHeader";
import { RolesTable } from "./RolesTable";
import { RoleModal } from "./RoleModal";

export default function RolesManager() {
  return (
    <>
      <RolesHeader />
      <RolesTable />
      <RoleModal />
    </>
  );
}
