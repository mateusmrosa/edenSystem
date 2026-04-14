<?php

namespace App\Http\Requests\Api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class ContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:40'],
            'message' => ['required', 'string', 'max:5000'],
            'company' => ['nullable', 'string', 'max:0'],
            'form_started_at' => ['required', 'integer'],
            'recaptcha_token' => ['nullable', 'string', 'max:4096'],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            $startedAt = (int) $this->input('form_started_at');
            $now = now()->getTimestampMs();

            // Bots costumam enviar imediatamente ou reutilizar payloads antigos.
            if ($startedAt <= 0 || $startedAt > $now + 60_000) {
                $validator->errors()->add('message', 'Não foi possível validar o envio.');
                return;
            }

            $elapsedMs = $now - $startedAt;
            if ($elapsedMs < 2_500 || $elapsedMs > 7_200_000) {
                $validator->errors()->add('message', 'Não foi possível validar o envio.');
            }
        });
    }
}
