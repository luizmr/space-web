export const mockApps = [
    {
        Id: 1,
        Name: 'Nutror',
    },
    {
        Id: 2,
        Name: 'Sun',
    },
    {
        Id: 3,
        Name: 'Orbita',
    },
    {
        Id: 4,
        Name: 'Alumny',
    },
];

export const mockEventos = [
    {
        Id: 1,
        AppId: 1,
        Name: 'Novo Vídeo',
    },
    {
        Id: 2,
        AppId: 1,
        Name: 'Novo Módulo de Aula',
    },
    {
        Id: 3,
        AppId: 2,
        Name: 'Checkout',
    },
    {
        Id: 4,
        AppId: 3,
        Name: 'Transferência',
    },
    {
        Id: 5,
        AppId: 3,
        Name: 'Recuperação',
    },
    {
        Id: 6,
        AppId: 3,
        Name: 'Antecipação',
    },
    {
        Id: 7,
        AppId: 4,
        Name: 'Novo Aluno',
    },
];

export const mockProdutor = [
    {
        Id: 1,
        Name: 'Luiz Marcelo Rocha',
    },
    {
        Id: 2,
        Name: 'John Kennedy',
    },
    {
        Id: 3,
        Name: 'Michael Jackson Five',
    },
    {
        Id: 4,
        Name: 'Anthony Stark',
    },
    {
        Id: 5,
        Name: 'Wanda Maximmoff',
    },
];

export const mockProdutos = [
    {
        Id: 1,
        Name: 'Curso de Alemão Online',
    },
    {
        Id: 2,
        Name: 'Curso de Inglês Online',
    },
    {
        Id: 3,
        Name: 'Ebook Emagrecimento Rápido',
    },
    {
        Id: 4,
        Name: 'Código da Riqueza, new Era',
    },
    {
        Id: 5,
        Name: 'Aprenda a falar espanhol em 30 minutos',
    },
];

export const mockMoedas = [
    {
        Id: 1,
        Name: 'Real',
        ShortName: 'BLR',
    },
    {
        Id: 2,
        Name: 'Dólar',
        ShortName: 'USD',
    },
    {
        Id: 3,
        Name: 'Euro',
        ShortName: 'EUR',
    },
];

export const mockRegras = [
    {
        Id: 1,
        Name: 'Tarifa padrão checkout',
        AppId: 2,
        EventId: 3,
        Customer: { Id: 1, Name: 'Luiz Marcelo Rocha' },
        Product: null,
        CurrencyId: 1,
        Fees: [
            {
                Id: 1,
                Value: 4.99,
                IsPercent: true,
                Range: {
                    From: 150,
                    To: null,
                },
                Period: {
                    From: '2020-10-11 00:00:00.000',
                    To: null,
                },
            },
            {
                Id: 2,
                Value: 1.5,
                IsPercent: false,
                Range: {
                    From: 0.01,
                    To: null,
                },
                Period: {
                    From: '2019-07-02 00:00:00.000',
                    To: null,
                },
            },
        ],
    },
    {
        Id: 5,
        Name: 'Tarifa padrão checkout 2',
        AppId: 2,
        EventId: 3,
        Customer: null,
        Product: null,
        CurrencyId: 1,
        Fees: [
            {
                Id: 1,
                Value: 4.99,
                IsPercent: true,
                Range: {
                    From: 150,
                    To: null,
                },
                Period: {
                    From: '2020-10-11 00:00:00.000',
                    To: null,
                },
            },
            {
                Id: 2,
                Value: 1.5,
                IsPercent: false,
                Range: {
                    From: 0.01,
                    To: null,
                },
                Period: {
                    From: '2019-07-02 00:00:00.000',
                    To: null,
                },
            },
        ],
    },
    {
        Id: 2,
        Name: 'Tarifa Novo Vídeo',
        AppId: 1,
        EventId: 1,
        Customer: { Id: 2, Name: 'John Kennedy' },
        Product: null,
        CurrencyId: 1,
        Fees: [
            {
                Id: 1,
                Value: 4.99,
                IsPercent: true,
                Range: {
                    From: 0.01,
                    To: null,
                },
                Period: {
                    From: '2020-08-01 00:00:00.000',
                    To: '2020-12-31 00:00:00.000',
                },
            },
            {
                Id: 2,
                Value: 1.0,
                IsPercent: false,
                Range: {
                    From: 0.01,
                    To: 100,
                },
                Period: {
                    From: '2020-06-01 00:00:00.000',
                    To: '2020-09-01 00:00:00.000',
                },
            },
        ],
    },
    {
        Id: 3,
        Name: 'Tarifa Antecipação',
        AppId: 3,
        EventId: 4,
        Customer: { Id: 4, Name: 'Anthony Stark' },
        Product: { Id: 1, Name: 'Curso de Alemão Online' },
        CurrencyId: 1,
        Fees: [
            {
                Id: 1,
                Value: 4.99,
                IsPercent: true,
                Range: {
                    From: 0.01,
                    To: null,
                },
                Period: {
                    From: '2019-03-01 00:00:00.000',
                    To: '2019-10-10 00:00:00.000',
                },
            },
            {
                Id: 2,
                Value: 100.5,
                IsPercent: false,
                Range: {
                    From: 0.01,
                    To: null,
                },
                Period: {
                    From: '2020-11-27 00:00:00.000',
                    To: '2021-01-31 00:00:00.000',
                },
            },
        ],
    },
];
