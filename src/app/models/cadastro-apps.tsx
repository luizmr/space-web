export interface AppOutput {
    Id?: number;
    Nome?: string;
    Descricao?: string;
    Logo?: string;
    Imagens?: Array<string>;
    Link?: string;
    Cobranca?: Array<CobrancaOutput>;
}

export interface CobrancaOutput {
    CobrancaTipo?: string;
    CobrancaDescricao?: string;
    CobrancaValor?: number;
}
