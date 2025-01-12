import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useForm } from 'react-hook-form';
import { Loader2, Paperclip, Send } from 'lucide-react';

// Type definitions
type Priority = 'low' | 'medium' | 'high';
type Category = 'technical' | 'billing' | 'general' | 'security';

interface TicketFormData {
  subject: string;
  category: Category;
  priority: Priority;
  description: string;
  attachments?: FileList;
}

interface TicketFormProps {
  onSubmit: (data: TicketFormData) => Promise<void>;
  initialData?: Partial<TicketFormData>;
  isUpdate?: boolean;
}

const TicketForm = ({ onSubmit, initialData, isUpdate = false }: TicketFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TicketFormData>({
    defaultValues: {
      subject: initialData?.subject || '',
      category: initialData?.category || 'technical',
      priority: initialData?.priority || 'medium',
      description: initialData?.description || '',
    }
  });

  const categories = [
    { value: 'technical', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Account' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'security', label: 'Security Issue' },
  ];

  const priorities = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
  ];

  const onSubmitForm = async (data: TicketFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await onSubmit(data);
      if (!isUpdate) {
        reset(); // Only reset form for new tickets
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit ticket');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{isUpdate ? 'Update Ticket' : 'Create Support Ticket'}</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
          <div className="space-y-4">
            {/* Subject field */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                {...register('subject', { 
                  required: 'Subject is required',
                  minLength: {
                    value: 10,
                    message: 'Subject must be at least 10 characters'
                  }
                })}
                placeholder="Brief description of your issue"
                className={errors.subject ? 'border-red-500' : ''}
              />
              {errors.subject && (
                <p className="text-sm text-red-500">{errors.subject.message}</p>
              )}
            </div>

            {/* Category field */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                {...register('category', { required: 'Please select a category' })}
                className="w-full p-2 border rounded-md"
              >
                {categories.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category.message}</p>
              )}
            </div>

            {/* Priority field */}
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                {...register('priority')}
                className="w-full p-2 border rounded-md"
              >
                {priorities.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Description field */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                {...register('description', {
                  required: 'Description is required',
                  minLength: {
                    value: 30,
                    message: 'Please provide more details (minimum 30 characters)'
                  }
                })}
                rows={6}
                className={`w-full p-2 border rounded-md ${errors.description ? 'border-red-500' : ''}`}
                placeholder="Please provide detailed information about your issue..."
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            {/* File attachment field */}
            <div className="space-y-2">
              <Label htmlFor="attachments">Attachments (Optional)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="attachments"
                  type="file"
                  multiple
                  {...register('attachments')}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('attachments')?.click()}
                >
                  <Paperclip className="h-4 w-4 mr-2" />
                  Add Files
                </Button>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {isUpdate ? 'Updating...' : 'Submitting...'}
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                {isUpdate ? 'Update Ticket' : 'Submit Ticket'}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TicketForm;