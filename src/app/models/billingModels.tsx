export interface AppOutput {
    Id: number;
    Name?: string;
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

export interface DataRulesOutput {
    Id: number;
    Name: string;
    AppId: number;
    EventId?: number;
    CurrencyId: number;
    Customer?: ProdutorOutput;
    Product?: ProdutoOutput | null;
    Fees?: Array<FeeOutput>;
    AppName?: string;
    EventName?: string;
    CurrencyName?: string;
    CustomerName?: string;
    ProductName?: string;
    RuleName?: string;
    // FeeId?: number;
    // FeeValue?: string;
    // FeeIsPercent?: boolean;
    // FeeRangeFrom?: number | null;
    // FeeRangeTo?: number | null;
    // FeePeriodFrom?: string | null;
    // FeePeriodTo?: string | null;
}

export interface DataRulesSearchOutput {
    Id?: number | null;
    // Name: string;
    AppId?: number | null;
    // AppName?: string;
    EventId?: number | null;
    // EventName?: string;
    CurrencyId?: number;
    // CurrencyName?: string;
    // Customer: ProdutorOutput;
    CustomerId?: number | null;
    // Product?: ProdutoOutput | null;
    ProductId?: number | null;
    // FeeId?: number;
    FeeValue?: string | null;
    FeePeriod?: string | null;
    // FeeIsPercent?: boolean;
    // FeeRangeFrom?: number | null;
    // FeeRangeTo?: number | null;
    // FeePeriodFrom?: string | null;
    // FeePeriodTo?: string | null;
}
