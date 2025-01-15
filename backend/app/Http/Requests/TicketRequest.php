<?php
// TicketRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TicketRequest extends FormRequest
{
    public function authorize()
    {
        // Verify the domain belongs to the user if domain_id is provided
        if ($this->has('domain_id')) {
            return $this->user()
                ->domains()
                ->where('id', $this->domain_id)
                ->exists();
        }

        return true;
    }

    public function rules()
    {
        $rules = [
            'domain_id' => [
                'required',
                'exists:domains,id',
            ],
            'subject' => 'required|string|min:5|max:255',
            'description' => 'required|string|min:20|max:10000',
            'priority' => [
                'required',
                Rule::in(['low', 'medium', 'high', 'critical'])
            ],
            'attachments' => 'sometimes|array|max:5',
            'attachments.*' => [
                'file',
                'mimes:pdf,doc,docx,txt,jpg,jpeg,png',
                'max:2048' // 2MB limit
            ]
        ];

        // Additional rules for updates
        if ($this->isMethod('PATCH') || $this->isMethod('PUT')) {
            $rules['status'] = [
                'sometimes',
                Rule::in(['open', 'in_progress', 'resolved', 'closed'])
            ];

            // Allow updates to add responses
            $rules['response'] = 'sometimes|required|string|min:20|max:10000';
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'subject.min' => 'The subject must be at least 5 characters long',
            'description.min' => 'Please provide more details in your description',
            'attachments.*.max' => 'Each file must not exceed 2MB',
            'attachments.*.mimes' => 'Only PDF, Word documents, text files, and images are allowed',
        ];
    }

    protected function prepareForValidation()
    {
        // Trim whitespace from text inputs
        if ($this->has('subject')) {
            $this->merge([
                'subject' => trim($this->subject)
            ]);
        }

        if ($this->has('description')) {
            $this->merge([
                'description' => trim($this->description)
            ]);
        }
    }
}
