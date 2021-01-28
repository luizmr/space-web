export interface AppOutput {
    Id: number;
    Name: string;
}

export interface EventsOutput {
    Id?: number;
    AppId?: number;
    Name?: string;
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
    From?: number | null;
    To?: number | null;
}

export interface PeriodOutput {
    From?: string | null;
    To?: string | null;
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
    CurrencyId: number;
    Customer: ProdutorOutput;
    Product?: ProdutoOutput | null;
    Fees?: Array<FeeOutput>;
}

export interface DataOutput {
    AppId?: number;
    EventId?: number;
    CustomerId?: number;
    ProductId?: number | null;
    CurrencyId?: number;
    Value?: string | null;
    Period?: string | null;
}
