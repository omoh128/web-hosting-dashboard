// src/utils/formatting.ts

// Format date to a readable format
export const formatDate = (date: string | Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  
  // Format a number as currency (e.g., USD)
  export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
    }).format(amount);
  };
  
  // Format large numbers with commas (e.g., 1000000 -> 1,000,000)
  export const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };
  