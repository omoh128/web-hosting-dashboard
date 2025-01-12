import React from 'react';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DomainManagement = () => {
  const [domains, setDomains] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isAddingDomain, setIsAddingDomain] = React.useState(false);
  const [newDomain, setNewDomain] = React.useState({ name: '', type: 'A' });

  const handleDomainSearch = async (term) => {
    try {
      const response = await fetch(`/api/domains/search?term=${term}`);
      if (response.ok) {
        const data = await response.json();
        setDomains(data);
      }
    } catch (error) {
      console.error('Failed to search domains:', error);
    }
  };

  const handleAddDomain = async () => {
    try {
      const response = await fetch('/api/domains', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDomain)
      });
      
      if (response.ok) {
        const domain = await response.json();
        setDomains([...domains, domain]);
        setIsAddingDomain(false);
        setNewDomain({ name: '', type: 'A' });
      }
    } catch (error) {
      console.error('Failed to add domain:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Add Domain */}
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search domains..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleDomainSearch(e.target.value);
            }}
          />
        </div>
        <button
          onClick={() => setIsAddingDomain(true)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Domain
        </button>
      </div>

      {/* Domains List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Domains</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {domains.map((domain) => (
              <div 
                key={domain.id} 
                className="py-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium">{domain.name}</h3>
                  <p className="text-sm text-gray-500">
                    Expires: {new Date(domain.expiryDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 hover:text-blue-500">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Domain Modal */}
      {isAddingDomain && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add New Domain</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Domain Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={newDomain.name}
                  onChange={(e) => setNewDomain({ 
                    ...newDomain, 
                    name: e.target.value 
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Record Type
                </label>
                <select
                  className="w-full p-2 border rounded"
                  value={newDomain.type}
                  onChange={(e) => setNewDomain({ 
                    ...newDomain, 
                    type: e.target.value 
                  })}
                >
                  <option value="A">A Record</option>
                  <option value="CNAME">CNAME Record</option>
                  <option value="MX">MX Record</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsAddingDomain(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddDomain}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Domain
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainManagement;