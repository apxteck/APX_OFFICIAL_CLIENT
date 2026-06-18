"use client";
import React from 'react';
import { ReimbursementsHeader } from './ReimbursementsHeader';
import { ReimbursementForm } from './ReimbursementForm';
import { ReimbursementList } from './ReimbursementList';
import { useReimbursementsLogic } from '../_hooks/useReimbursementsLogic';
import { Reimbursement } from "@/services/employee/reimbursements.service";

interface Props {
  initialReimbursements: Reimbursement[];
  initialTotalPages: number;
  initialPage: number;
}

export default function ReimbursementsManager({ initialReimbursements, initialTotalPages, initialPage }: Props) {
  const {
    reimbursements, isLoading, isSubmitting, successMessage, error,
    title, setTitle, amount, setAmount, category, setCategory,
    description, setDescription, receiptFile, fileInputRef,
    page, totalPages, handleFileChange, handleSubmit, handleDelete, fetchReimbursements
  } = useReimbursementsLogic(initialReimbursements, initialTotalPages, initialPage);

  return (
    <div className="w-full space-y-8">
      <ReimbursementsHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ReimbursementForm 
          title={title} setTitle={setTitle}
          amount={amount} setAmount={setAmount}
          category={category} setCategory={setCategory}
          description={description} setDescription={setDescription}
          receiptFile={receiptFile} fileInputRef={fileInputRef}
          handleFileChange={handleFileChange} handleSubmit={handleSubmit}
          isSubmitting={isSubmitting} error={error} successMessage={successMessage}
        />
        
        <ReimbursementList 
          reimbursements={reimbursements}
          isLoading={isLoading}
          page={page}
          totalPages={totalPages}
          handleDelete={handleDelete}
          fetchReimbursements={fetchReimbursements}
        />
      </div>
    </div>
  );
}
