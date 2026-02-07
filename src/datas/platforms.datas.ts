import { ref } from 'vue';
import type { CatalogSource } from '@/types/platform.types.ts';

const platforms = ref<CatalogSource[]>([
    {
        type: 'provider',
        id: 8,
        name: 'Netflix',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg',
        count: 2817,
    },
    {
        type: 'provider',
        id: 9,
        name: 'Prime Video',
        logo: 'https://u.cubeupload.com/mystic/b222691607d658c2fa52.png',
        count: 2799,
    },
    {
        type: 'provider',
        id: 531,
        name: 'Paramount+',
        logo: 'https://u.cubeupload.com/mystic/c40fe782c450e170eea6.png',
        count: 502,
    },
    {
        type: 'provider',
        id: 337,
        name: 'Disney+',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg',
        count: 1152,
    },
    {
        type: 'provider',
        id: 350,
        name: 'Apple TV+',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_TV_Plus_logo.svg',
        count: 138,
    },
    {
        type: 'provider',
        id: 384,
        name: 'HBO Max',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg',
        count: 420,
    },
    {
        type: 'studio',
        id: 420,
        name: 'Marvel Studios',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/MarvelLogo.svg',
        count: 65,
    },
    {
        type: 'studio',
        id: 9993,
        name: 'DC Comics',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/DC_Comics_logo.svg',
        count: 98,
    },
    {
        type: 'studio',
        id: 174,
        name: 'Warner Bros.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Warner_Bros_logo.svg',
        count: 645,
    },
]);

export default platforms;
