import NutrorLogo from '../../../mock-assets/nutro-logo.png';
import NutrorImage1 from '../../../mock-assets/nutror-image1.png';
import NutrorImage2 from '../../../mock-assets/nutror-image2.png';
import NutrorImage3 from '../../../mock-assets/nutror-image3.png';
import NutrorImage4 from '../../../mock-assets/nutror-image4.png';
import NutrorImage5 from '../../../mock-assets/nutror-image5.png';

export const mockCobranca = [
    {
        CobrancaTipo: 1,
        CobrancaDescricao: 'Até 10x sem juros',
        CobrancaValor: '1000',
        CobrancaId: 1,
    },
    {
        CobrancaTipo: 2,
        CobrancaDescricao: 'A vista com 10% de desconto',
        CobrancaValor: '1000',
        CobrancaId: 2,
    },
];

export const mockApps = [
    {
        Id: 1,
        Nome: 'Nutror - 1',
        Descricao:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam rutrum odio ut diam congue, non efficitur tellus laoreet. Donec eu lacinia lorem. Quisque tristique ipsum sed viverra varius. Sed interdum erat non porta euismod.',
        Logo: `${NutrorLogo}`,
        Imagens: [
            `${NutrorImage1}`,
            `${NutrorImage2}`,
            `${NutrorImage3}`,
            `${NutrorImage4}`,
            `${NutrorImage5}`,
        ],
        Link: 'https://www.nutror.com/',
        Cobranca: mockCobranca,
        Status: 'Aprovado',
    },
    {
        Id: 2,
        Nome: 'Nutror - 2',
        Descricao:
            'Lorem ipsum dolor sit amet teste 2, consectetur adipiscing elit. Nullam rutrum odio ut diam congue, non efficitur tellus laoreet. Donec eu lacinia lorem. Quisque tristique ipsum sed viverra varius. Sed interdum erat non porta euismod. Sed interdum erat non porta euismod. Sed interdum erat non porta euismod. Sed interdum erat non porta euismod. Sed interdum erat non porta euismod.',
        Logo: `${NutrorLogo}`,
        Imagens: [
            `${NutrorImage1}`,
            `${NutrorImage2}`,
            `${NutrorImage3}`,
            `${NutrorImage4}`,
            `${NutrorImage5}`,
        ],
        Link: 'https://www.nutror.com/',
        Cobranca: mockCobranca,
        Status: 'Reprovado',
    },
    // {
    //     Id: 3,
    //     Nome: 'Nutror - 3 - teste',
    //     Logo: `${NutrorLogo}`,
    //     Descricao:
    //         'Lorem ipsum dolor sit amet teste teste 1, consectetur adipiscing elit. Nullam rutrum odio ut diam congue, non efficitur tellus laoreet. Donec eu lacinia lorem. Quisque tristique ipsum sed viverra varius. Sed interdum erat non porta euismod.',
    //     Imagens: [
    //         `${NutrorImage1}`,
    //         `${NutrorImage2}`,
    //         `${NutrorImage3}`,
    //         `${NutrorImage4}`,
    //         `${NutrorImage5}`,
    //     ],
    //     Link: 'https://www.nutror.com/',
    //     Cobranca: mockCobranca,
    //     Status: 'Inativo',
    // },
    {
        Id: 4,
        Nome: 'orbita',
        Logo: `${NutrorLogo}`,
        Descricao:
            'Lorem ipsum dolor sit amet teste teste 1, consectetur adipiscing elit. Nullam rutrum odio ut diam congue, non efficitur tellus laoreet. Donec eu lacinia lorem. Quisque tristique ipsum sed viverra varius. Sed interdum erat non porta euismod.',
        Imagens: [
            `${NutrorImage1}`,
            `${NutrorImage2}`,
            `${NutrorImage3}`,
            `${NutrorImage4}`,
            `${NutrorImage5}`,
        ],
        Link: 'https://www.nutror.com/',
        Cobranca: mockCobranca,
        Status: 'Aguardando Validação',
    },
    {
        Id: 5,
        Nome: 'orbitass',
        Logo: `${NutrorLogo}`,
        Descricao:
            'Lorem ipsum dssssolor sit amet teste teste 1, consectetur adipiscing elit. Nullam rutrum odio ut diam congue, non efficitur tellus laoreet. Donec eu lacinia lorem. Quisque tristique ipsum sed viverra varius. Sed interdum erat non porta euismod.',
        Imagens: [
            `${NutrorImage1}`,
            `${NutrorImage2}`,
            `${NutrorImage3}`,
            `${NutrorImage4}`,
            `${NutrorImage5}`,
        ],
        Link: 'https://www.nutror.com/',
        Cobranca: mockCobranca,
        Status: 'Aguardando Validação',
    },
];

export const mockPlugins = [
    {
        Id: 6,
        Nome: 'Comentários no Nutror',
        Logo: `${NutrorLogo}`,
        Descricao:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam rutrum odio ut diam congue, non efficitur tellus laoreet. Donec eu lacinia lorem. Quisque tristique ipsum sed viverra varius. Sed interdum erat non porta euismod.',
        Link: 'https://www.nutror.com/',
        Tipo: 'Plugin',
    },
    {
        Id: 7,
        Nome: 'Plugins de legendas',
        Logo: ``,
        Descricao:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nutror odio ut diam congue, non efficitur tellus laoreet. Donec eu lacinia lorem. Quisque tristique ipsum sed viverra varius. Sed interdum erat non porta euismod.',
        Link: 'https://www.nutror.com/',
        Tipo: 'Plugin',
    },
    {
        Id: 8,
        Nome: 'Plugins de audios',
        Logo: ``,
        Descricao:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nutror odio ut diam congue, non efficitur tellus laoreet. Donec eu lacinia lorem. Quisque tristique ipsum sed viverra varius. Sed interdum erat non porta euismod.',
        Link: 'https://www.nutror.com/',
        Tipo: 'Plugin',
    },
    {
        Id: 9,
        Nome: 'Outros Plugins',
        Logo: ``,
        Descricao:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nutror odio ut diam congue, non efficitur tellus laoreet. Donec eu lacinia lorem. Quisque tristique ipsum sed viverra varius. Sed interdum erat non porta euismod.',
        Link: 'https://www.nutror.com/',
        Tipo: 'Plugin',
    },
];
