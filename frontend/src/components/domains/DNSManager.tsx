import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Save, Trash2 } from 'lucide-react';

type DNSRecord = {
  id: string;
  type: 'A' | 'AAAA' | 'CNAME' | 'MX' | 'TXT';
  name: string;
  content: string;
  ttl: number;
};

type DNSManagerProps = {
  domainName: string;
  records: DNSRecord[];
  onSave: (records: DNSRecord[]) => void;
};

const DNSManager = ({ domainName, records: initialRecords, onSave }: DNSManagerProps) => {
  const [records, setRecords] = useState<DNSRecord[]>(initialRecords);

  const addRecord = () => {
    const newRecord: DNSRecord = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'A',
      name: '',
      content: '',
      ttl: 3600,
    };
    setRecords([...records, newRecord]);
  };

  const updateRecord = (id: string, field: keyof DNSRecord, value: string | number) => {
    setRecords(records.map(record =>
      record.id === id ? { ...record, [field]: value } : record
    ));
  };

  const deleteRecord = (id: string) => {
    setRecords(records.filter(record => record.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>DNS Manager - {domainName}</CardTitle>
          <div className="space-x-2">
            <Button variant="outline" onClick={addRecord}>
              <Plus className="h-4 w-4 mr-2" />
              Add Record
            </Button>
            <Button onClick={() => onSave(records)}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>TTL</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  <select
                    value={record.type}
                    onChange={(e) => updateRecord(record.id, 'type', e.target.value as DNSRecord['type'])}
                    className="border rounded p-1"
                  >
                    <option value="A">A</option>
                    <option value="AAAA">AAAA</option>
                    <option value="CNAME">CNAME</option>
                    <option value="MX">MX</option>
                    <option value="TXT">TXT</option>
                  </select>
                </TableCell>
                <TableCell>
                  <Input
                    value={record.name}
                    onChange={(e) => updateRecord(record.id, 'name', e.target.value)}
                    placeholder="@"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={record.content}
                    onChange={(e) => updateRecord(record.id, 'content', e.target.value)}
                    placeholder="192.0.2.1"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={record.ttl}
                    onChange={(e) => updateRecord(record.id, 'ttl', parseInt(e.target.value))}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteRecord(record.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DNSManager;