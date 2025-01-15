<?php
// DomainRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DomainRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Authorization is handled by middleware
    }

    public function rules()
    {
        $rules = [
            'domain_name' => [
                'required',
                'string',
                'min:3',
                'max:255',
                'regex:/^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/',
                Rule::unique('domains', 'name')->ignore($this->domain),
            ],
            'hosting_plan_id' => [
                'required',
                'exists:hosting_plans,id'
            ],
        ];

        // Additional rules for updates
        if ($this->isMethod('PATCH') || $this->isMethod('PUT')) {
            $rules['status'] = [
                'sometimes',
                'string',
                Rule::in(['active', 'pending', 'suspended', 'expired'])
            ];

            $rules['auto_renew'] = 'sometimes|boolean';
            $rules['nameservers'] = 'sometimes|array|min:2|max:4';
            $rules['nameservers.*'] = 'required|string|regex:/^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/';
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'domain_name.regex' => 'Please enter a valid domain name',
            'domain_name.unique' => 'This domain is already registered in our system',
            'nameservers.*.regex' => 'Please enter valid nameserver addresses',
        ];
    }

    protected function prepareForValidation()
    {
        if ($this->has('domain_name')) {
            $this->merge([
                'domain_name' => strtolower($this->domain_name)
            ]);
        }
    }
}

