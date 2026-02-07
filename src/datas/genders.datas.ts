import { ref } from 'vue';
import { Genre } from '@/types/collection.types.ts';

const genres = ref<Genre[]>([
    {
        id: 28,
        name: 'Action',
        image: 'https://image.tmdb.org/t/p/w780/1Rr5SrvHxMXHu5RjKpaMba8VTzi.jpg',
    },
    {
        id: 12,
        name: 'Aventure',
        image: 'https://image.tmdb.org/t/p/w780/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg',
    },
    {
        id: 16,
        name: 'Animation',
        image: 'https://image.tmdb.org/t/p/w780/q719jXXEzOoYaps6babgKnONONX.jpg',
    },
    {
        id: 35,
        name: 'Comédie',
        image: 'https://image.tmdb.org/t/p/w780/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg',
    },
    {
        id: 80,
        name: 'Crime',
        image: 'https://image.tmdb.org/t/p/w780/hZkgoQYus5vegHoetLkCJzb17zJ.jpg\n',
    },
    {
        id: 99,
        name: 'Documentaire',
        image: 'https://image.tmdb.org/t/p/w780/v4yVTbbl8dE1UP2dWu5CLyaXOku.jpg',
    },
    {
        id: 18,
        name: 'Drame',
        image: 'https://image.tmdb.org/t/p/w780/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    },
    {
        id: 10751,
        name: 'Familial',
        image: 'https://image.tmdb.org/t/p/w780/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg',
    },
    {
        id: 14,
        name: 'Fantastique',
        image: 'https://image.tmdb.org/t/p/w780/6ELCZlTA5lGUops70hKdB83WJxH.jpg',
    },
    {
        id: 36,
        name: 'Histoire',
        image: 'https://image.tmdb.org/t/p/w780/kGzFbGhp99zva6oZODW5atUtnqi.jpg',
    },
    {
        id: 27,
        name: 'Horreur',
        image: 'https://image.tmdb.org/t/p/w780/5GA3vV1aWWHTSDO5eno8V5zDo8r.jpg',
    },
    {
        id: 10402,
        name: 'Musique',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu_WIcMSrNvjSucgtpNME2hPtCpK95X898gw&s',
    },
    {
        id: 9648,
        name: 'Mystère',
        image: 'https://image.tmdb.org/t/p/w780/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg',
    },
    {
        id: 10749,
        name: 'Romance',
        image: 'https://image.tmdb.org/t/p/w780/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
    },
    {
        id: 878,
        name: 'Science-fiction',
        image: 'https://image.tmdb.org/t/p/w780/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
    },
    {
        id: 10770,
        name: 'Téléfilm',
        image: 'https://image.tmdb.org/t/p/w780/l8v3gJDlASN0lNn51gR8zQJsu5O.jpg',
    },
    {
        id: 53,
        name: 'Thriller',
        image: 'https://image.tmdb.org/t/p/w780/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg',
    },
    {
        id: 10752,
        name: 'Guerre',
        image: 'https://image.tmdb.org/t/p/w780/8QXGNP0Vb4nsYKub59XpAhiUSQN.jpg',
    },
    {
        id: 37,
        name: 'Western',
        image: 'https://www.thepopverse.com/_next/image?url=https%3A%2F%2Fmedia.thepopverse.com%2Fmedia%2Ffxbxeb9aeaaqpos-rewlldwtcx1fdhwnqi5lla5w0y.jpg&w=1280&q=75',
    },
]);

export default genres;
