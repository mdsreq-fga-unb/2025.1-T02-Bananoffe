import { Injectable } from '@nestjs/common';
import { crc16ccitt as crc16 } from 'crc';

@Injectable()
export class PagamentosService {
    private format(id: string, value: string) {
        const length = String(value.length).padStart(2, '0');
        return `${id}${length}${value}`;
    }

    gerarPix({ chave, nome, cidade, valor, txid }: { chave: string; nome: string; cidade: string; valor: number; txid?: string }) {
        const payloadformatIndicator = this.format('00', '01') + this.format('01', '11');

        const merchantAccountInfo =
            this.format('26', this.format('00', 'br.gov.bcb.pix') + this.format('01', chave));

        const merchantCategoryCode = this.format('52', '0000');
        const transactionCurrency = this.format('53', '986');
        const transactionAmount = valor ? this.format('54', valor.toFixed(2)) : '';
        const countryCode = this.format('58', 'BR');
        const merchantName = this.format('59', nome);
        const merchantCity = this.format('60', cidade);

        const txidGerado = txid || `${Date.now()}${Math.floor(Math.random() * 1000)}`;
        // Limitar TXID a 25 caracteres:
        const txidFinal = (txid || '***').substring(0, 25);
        const additionalDataTemplate = this.format('62', this.format('05', txidFinal));

        const rawPix =
            payloadformatIndicator +
            merchantAccountInfo +
            merchantCategoryCode +
            transactionCurrency +
            transactionAmount +
            countryCode +
            merchantName +
            merchantCity +
            additionalDataTemplate +
            '6304';

        return rawPix + this.generateCRC(rawPix);
    }


    private generateCRC(rawPix) {
        const encoder = new TextEncoder();
        const data = encoder.encode(rawPix);
        const crc = crc16(data);
        return crc.toString(16).toUpperCase().padStart(4, '0');
    }
}
