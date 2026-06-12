"use client";
import React from "react";
import { PermissionsRoleSelector } from "./PermissionsRoleSelector";
import { PermissionsMatrix } from "./PermissionsMatrix";

export default function PermissionsManager() {
  return (
    <>
      <PermissionsRoleSelector />
      <PermissionsMatrix />
    </>
  );
}
