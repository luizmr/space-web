export interface AppOutput {
    Id?: number;
    Nome?: string;
    Descricao?: string;
    Logo?: string;
    Imagens?: Array<string>;
    Link?: string;
    Cobranca?: Array<CobrancaOutput>;
    Status?: string;
    Tipo?: string;
}

export interface CobrancaOutput {
    CobrancaTipo?: number;
    CobrancaDescricao?: string;
    CobrancaValor?: string;
    CobrancaId?: number;
}
