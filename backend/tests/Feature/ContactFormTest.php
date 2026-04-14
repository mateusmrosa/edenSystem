<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactFormTest extends TestCase
{
    public function test_contact_accepts_valid_payload(): void
    {
        Mail::fake();

        config(['mail.contact_recipient' => 'inbox@example.test']);
        config(['mail.from.address' => 'noreply@example.test']);
        config(['mail.from.name' => 'Test']);

        $response = $this->postJson('/api/contact', [
            'name' => 'Maria Silva',
            'email' => 'maria@cliente.com',
            'phone' => '11 99999-0000',
            'message' => 'Preciso automatizar o faturamento.',
            'company' => '',
            'form_started_at' => now()->subSeconds(5)->getTimestampMs(),
        ]);

        $response->assertOk()
            ->assertJsonPath('message', 'Recebemos sua mensagem. Retornamos em breve.');

        Mail::assertSent(\App\Mail\ContactFormMail::class, function (\App\Mail\ContactFormMail $mail): bool {
            return $mail->contactName === 'Maria Silva'
                && $mail->contactEmail === 'maria@cliente.com'
                && $mail->contactPhone === '11 99999-0000'
                && str_contains($mail->contactMessage, 'faturamento');
        });
    }

    public function test_contact_validates_required_fields(): void
    {
        $response = $this->postJson('/api/contact', []);

        $response->assertStatus(422);
    }

    public function test_contact_rejects_submission_that_is_too_fast(): void
    {
        $response = $this->postJson('/api/contact', [
            'name' => 'Bot',
            'email' => 'bot@example.test',
            'message' => 'spam',
            'company' => '',
            'form_started_at' => now()->getTimestampMs(),
        ]);

        $response->assertStatus(422);
    }

    public function test_contact_rejects_invalid_recaptcha_when_enabled(): void
    {
        Http::fake([
            'https://www.google.com/recaptcha/api/siteverify' => Http::response([
                'success' => false,
            ], 200),
        ]);

        config(['services.recaptcha.enabled' => true]);
        config(['services.recaptcha.secret' => 'test-secret']);

        $response = $this->postJson('/api/contact', [
            'name' => 'Maria Silva',
            'email' => 'maria@cliente.com',
            'message' => 'Teste',
            'company' => '',
            'form_started_at' => now()->subSeconds(4)->getTimestampMs(),
            'recaptcha_token' => 'invalid-token',
        ]);

        $response->assertStatus(422);
    }
}
