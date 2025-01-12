import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, Settings, Trash2 } from 'lucide-react';

type Domain = {
  id: string;
  name: string;
  status: 'active' | 'expired' | 'pending';
  registrationDate: string;
  expiryDate: string;
  autoRenew: boolean;
};

type DomainListProps = {
  domains: Domain[];
  onManageDNS: (domainId: string) => void;
  onDeleteDomain: (domainId: string) => void;
};

const DomainList = ({ domains, onManageDNS, onDeleteDomain }: DomainListProps) => {
  const getStatusColor = (status: Domain['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Your Domains</CardTitle>
          <Button variant="outline" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Register New Domain
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Domain Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Auto Renew</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {domains.map((domain) => (
              <TableRow key={domain.id}>
                <TableCell className="font-medium">{domain.name}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(domain.status)}>
                    {domain.status.charAt(0).toUpperCase() + domain.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{domain.registrationDate}</TableCell>
                <TableCell>{domain.expiryDate}</TableCell>
                <TableCell>
                  <Badge variant={domain.autoRenew ? "default" : "outline"}>
                    {domain.autoRenew ? "Yes" : "No"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onManageDNS(domain.id)}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteDomain(domain.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DomainList;