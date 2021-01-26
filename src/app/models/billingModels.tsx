export interface AppOutput {
    Id: number;
    Name: string;
}

export interface EventsOutput {
    Id: number;
    AppId: number;
    Name: string;
}

export interface ProdutorOutput {
    Id: number;
    Name: string;
}

export interface ProdutoOutput {
    Id: number;
    Name: string;
}

export interface MoedasOutput {
    Id: number;
    Name: string;
    ShortName: string;
}

export interface RangeOutput {
    From?: number;
    To?: number;
}

export interface PeriodOutput {
    From?: string;
    To?: string;
}

export interface FeeOutput {
    Id: number;
    Value: number;
    IsPercent: boolean;
    Range?: RangeOutput;
    Period?: PeriodOutput;
}

export interface RegrasOutput {
    Id: number;
    Name: string;
    AppId: number;
    EventId: number;
    Customer: ProdutorOutput;
    Product?: ProdutoOutput;
    Fees?: Array<FeeOutput>;
}
