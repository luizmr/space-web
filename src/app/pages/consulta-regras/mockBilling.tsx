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
                    From: '20210125T00:00:00Z000',
                    To: null,
                },
            },
            {
                Id: 2,
                Value: 1,
                IsPercent: false,
                Range: {
                    From: 0.01,
                    To: null,
                },
                Period: {
                    From: '20210125T00:00:00Z000',
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
                    From: '20210110T00:00:00Z000',
                    To: '20210120T00:00:00Z000',
                },
            },
            {
                Id: 2,
                Value: 1,
                IsPercent: false,
                Range: {
                    From: 0.01,
                    To: 100,
                },
                Period: {
                    From: '20210110T00:00:00Z000',
                    To: '20210115T00:00:00Z000',
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
        Product: { Id: 1, Name: 'Curso de Inglês Online' },
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
                    From: '20201125T00:00:00Z000',
                    To: '20201127T00:00:00Z000',
                },
            },
            {
                Id: 2,
                Value: 1,
                IsPercent: false,
                Range: {
                    From: 0.01,
                    To: null,
                },
                Period: {
                    From: '20201125T00:00:00Z000',
                    To: '20201225T00:00:00Z000',
                },
            },
        ],
    },
];
