import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

type DomainFormData = {
  domainName: string;
  years: number;
  autoRenew: boolean;
};

type DomainFormProps = {
  onSubmit: (data: DomainFormData) => void;
  isAvailable?: boolean;
  isChecking?: boolean;
};

const DomainForm = ({ onSubmit, isAvailable, isChecking }: DomainFormProps) => {
  const { register, handleSubmit, watch } = useForm<DomainFormData>();

  const domainName = watch('domainName');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register New Domain</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Domain Name</label>
            <div className="flex gap-2">
              <Input
                {...register('domainName')}
                placeholder="example.com"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                disabled={!domainName || isChecking}
              >
                Check Availability
              </Button>
            </div>
            {isAvailable !== undefined && (
              <p className={`text-sm ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                {isAvailable ? 'Domain is available!' : 'Domain is not available'}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Registration Period</label>
            <select
              {...register('years')}
              className="w-full p-2 border rounded-md"
            >
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="5">5 Years</option>
              <option value="10">10 Years</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('autoRenew')}
              className="rounded border-gray-300"
            />
            <label className="text-sm">Enable Auto-Renewal</label>
          </div>

          <Button type="submit" className="w-full">
            Register Domain
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DomainForm;