import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Filter,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

// Types
type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
type TicketPriority = 'low' | 'medium' | 'high';

interface Ticket {
  id: string;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  createdAt: string;
  lastUpdated: string;
  messageCount: number;
}

interface TicketListProps {
  tickets: Ticket[];
  onViewTicket: (ticketId: string) => void;
  onCreateTicket: () => void;
  onUpdateStatus: (ticketId: string, newStatus: TicketStatus) => void;
}

const TicketList = ({ 
  tickets, 
  onViewTicket, 
  onCreateTicket,
  onUpdateStatus 
}: TicketListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const [sortField, setSortField] = useState<keyof Ticket>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Status styling
  const getStatusColor = (status: TicketStatus) => {
    const colors = {
      'open': 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'resolved': 'bg-green-100 text-green-800',
      'closed': 'bg-gray-100 text-gray-800'
    };
    return colors[status];
  };

  // Priority styling
  const getPriorityColor = (priority: TicketPriority) => {
    const colors = {
      'low': 'bg-gray-100 text-gray-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-red-100 text-red-800'
    };
    return colors[priority];
  };

  // Sorting and filtering
  const sortedAndFilteredTickets = tickets
    .filter(ticket => 
      (statusFilter === 'all' || ticket.status === statusFilter) &&
      (ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
       ticket.category.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const direction = sortDirection === 'asc' ? 1 : -1;
      
      return direction * (aValue < bValue ? -1 : aValue > bValue ? 1 : 0);
    });

  const handleSort = (field: keyof Ticket) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: keyof Ticket }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <CardTitle>Support Tickets</CardTitle>
          <Button onClick={onCreateTicket}>
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <div className="mt-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TicketStatus | 'all')}
            className="p-2 border rounded-md"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('subject')}
                >
                  <div className="flex items-center gap-2">
                    Subject
                    <SortIcon field="subject" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Category</TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center gap-2">
                    Created
                    <SortIcon field="createdAt" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('lastUpdated')}
                >
                  <div className="flex items-center gap-2">
                    Last Updated
                    <SortIcon field="lastUpdated" />
                  </div>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAndFilteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {ticket.subject}
                      {ticket.messageCount > 0 && (
                        <Badge variant="secondary">
                          {ticket.messageCount}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <select
                      value={ticket.status}
                      onChange={(e) => onUpdateStatus(ticket.id, e.target.value as TicketStatus)}
                      className={`${getStatusColor(ticket.status)} px-2 py-1 rounded-md text-sm`}
                    >
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{ticket.category}</TableCell>
                  <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(ticket.lastUpdated).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewTicket(ticket.id)}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {sortedAndFilteredTickets.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No tickets found matching your criteria
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketList;