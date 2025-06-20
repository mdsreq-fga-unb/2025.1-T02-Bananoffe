
# Ata de Reunião 05

**Data:** 09/06/2025  
**Horário:** 20:30  
**Local:** Google Meets   
**Participantes:** Filipe, Andrezza,  Anne, Bruno, Fábio, Guilherme, Mateus e Marcos 

## Objetivo da Reunião
Discutir a implementação da funcionalidade de pagamento no aplicativo.

## Principais Assuntos Tratados

### Tentativa de Integração com Stripe
- Inicialmente, foi avaliada a utilização do Stripe para processar pagamentos.  
- Identificou-se que a cobrança de taxas, ainda que pequenas, entraria em conflito com o propósito do app de evitar as taxas do iFood.

### Decisão de Simplificação do Pagamento
- Debateu‑se com o cliente a viabilidade de oferecer apenas pagamento via Pix.  
- A confirmação do pagamento seria manual, verificando-se o recebimento do Pix antes de liberar o pedido.

## Próximas Entregas (Próximas Semanas)
- **Gerador de QR Code/Pix:** desenvolver e integrar a geração dinâmica de código Pix para cada pedido.  
- **Deploy do Site:** publicar a versão atualizada do site em ambiente de produção para testes e demonstração.

## Próxima Reunião
- **Data:** 23/06/2025 
- **Objetivo:** Apresentação do gerador de Pix e status do deploy  
---

## Histórico de Versão

| Data     | Versão | Descrição             | Autor              |
| -------- | ------ | --------------------- | ------------------ |
| 20/06/25 | 1.0    | Criação do Documento  | Marcos Bezerra     |