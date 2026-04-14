<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactFormMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $contactName,
        public string $contactEmail,
        public ?string $contactPhone,
        public string $contactMessage,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '[Site] Contato — '.$this->contactName,
            replyTo: [
                new Address($this->contactEmail, $this->contactName),
            ],
        );
    }

    /**
     * Texto puro sem Blade — não usa storage/framework/views (evita erro de permissão no deploy).
     *
     * @return array{raw: string}
     */
    protected function buildView(): array
    {
        return ['raw' => $this->plainBody()];
    }

    private function plainBody(): string
    {
        $lines = [
            'Novo contato pelo site Eden System',
            '',
            'Nome: '.$this->contactName,
            'E-mail: '.$this->contactEmail,
        ];

        if ($this->contactPhone !== null && $this->contactPhone !== '') {
            $lines[] = 'Telefone: '.$this->contactPhone;
        }

        $lines[] = '';
        $lines[] = '---';
        $lines[] = 'Mensagem:';
        $lines[] = '';
        $lines[] = $this->contactMessage;

        return implode("\n", $lines);
    }
}
