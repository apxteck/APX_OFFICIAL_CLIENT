import React from 'react';
import { EmployeeClientWrapper } from './_components/EmployeeClientWrapper';

export const metadata = {
  title: 'Employee Portal - APXTeck',
  description: 'APXTeck Internal Employee Workspace',
};

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  return <EmployeeClientWrapper>{children}</EmployeeClientWrapper>;
}
