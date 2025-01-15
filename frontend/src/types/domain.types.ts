// src/types/domain.types.ts

// Type for a domain object
export interface Domain {
    id: string;
    name: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  }
  
  // Type for the request payload when creating or updating a domain
  export interface DomainRequest {
    name: string;
    type: string;
  }
  
  // Type for the response when fetching a list of domains
  export interface DomainListResponse {
    domains: Domain[];
  }
  
  // Type for the response when fetching a single domain
  export interface DomainResponse {
    domain: Domain;
  }
  