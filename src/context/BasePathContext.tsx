import { createContext, useContext } from 'react';

const basePath = '/v1'; // Define the base URL

const BasePathContext = createContext(basePath);

export const useBasePath = () => useContext(BasePathContext);

export const BasePathProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <BasePathContext.Provider value={basePath}>
      {children}
    </BasePathContext.Provider>
  );
};
