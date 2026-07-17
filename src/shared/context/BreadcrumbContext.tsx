import { createContext, useContext, useState, type ReactNode } from 'react';

interface BreadcrumbContextType {
  productName: string | null;
  setProductName: (name: string | null) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [productName, setProductName] = useState<string | null>(null);

  return (
    <BreadcrumbContext.Provider value={{ productName, setProductName }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }
  return context;
}
