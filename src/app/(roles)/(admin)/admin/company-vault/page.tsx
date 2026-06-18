import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { CompanyVaultManager } from './_components/CompanyVaultManager';
import CompanyVaultLoading from './loading';
import { companyVaultService } from '@/services/admin/companyVault.service';
import { CompanyVaultDocument } from '@/services/admin/companyVault.service';

export const metadata: Metadata = {
  title: 'Company Vault | APXTeck Admin',
  description: 'Secure repository for critical company documents.',
};

async function CompanyVaultDataFetcher() {
  let initialDocuments: CompanyVaultDocument[] = [];
  try {
    const response = await companyVaultService.getAllCompanyVault({ limit: 100 });
    initialDocuments = response.data || [];
  } catch (error) {
    console.error('Failed to fetch initial company vault documents:', error);
  }
  return <CompanyVaultManager initialDocuments={initialDocuments} />;
}

export default function CompanyVaultPage() {
  return (
    <Suspense fallback={<CompanyVaultLoading />}>
      <div className="space-y-6">
        <CompanyVaultDataFetcher />
      </div>
    </Suspense>
  );
}
