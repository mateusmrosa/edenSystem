<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\ContactRequest;
use App\Mail\ContactFormMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Throwable;

class ContactController extends Controller
{
    public function store(ContactRequest $request): JsonResponse
    {
        $data = $request->validated();

        if (! $this->isRecaptchaValid($request)) {
            return response()->json([
                'message' => 'Falha na validação de segurança. Atualize a página e tente novamente.',
            ], 422);
        }

        $to = config('mail.contact_recipient');
        if (! is_string($to) || $to === '') {
            Log::error('MAIL_CONTACT_TO / MAIL_FROM_ADDRESS não configurado para receber contatos.');

            return response()->json([
                'message' => 'Envio de mensagens não configurado no servidor. Use o WhatsApp ou o e-mail direto.',
            ], 503);
        }

        try {
            Mail::to($to)->send(new ContactFormMail(
                contactName: $data['name'],
                contactEmail: $data['email'],
                contactPhone: $data['phone'] ?? null,
                contactMessage: $data['message'],
            ));
        } catch (Throwable $e) {
            Log::error('Falha ao enviar e-mail de contato', [
                'exception' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'message' => 'Não foi possível enviar agora. Tente de novo em instantes ou fale pelo WhatsApp.',
            ], 503);
        }

        Log::info('Contato via site enviado por e-mail', [
            'name' => $data['name'],
            'email' => $data['email'],
        ]);

        return response()->json([
            'message' => 'Recebemos sua mensagem. Retornamos em breve.',
        ]);
    }

    private function isRecaptchaValid(ContactRequest $request): bool
    {
        $enabled = (bool) config('services.recaptcha.enabled');
        if (! $enabled) {
            return true;
        }

        $secret = (string) config('services.recaptcha.secret', '');
        $token = (string) $request->input('recaptcha_token', '');
        $minScore = (float) config('services.recaptcha.min_score', 0.5);

        if ($secret === '' || $token === '') {
            return false;
        }

        try {
            $response = Http::asForm()
                ->timeout(8)
                ->post('https://www.google.com/recaptcha/api/siteverify', [
                    'secret' => $secret,
                    'response' => $token,
                    'remoteip' => $request->ip(),
                ]);
        } catch (Throwable) {
            return false;
        }

        if (! $response->ok()) {
            return false;
        }

        $json = $response->json();
        if (! is_array($json) || ! ($json['success'] ?? false)) {
            return false;
        }

        $score = (float) ($json['score'] ?? 0);
        $action = (string) ($json['action'] ?? '');

        return $score >= $minScore && $action === 'contact_form';
    }
}
