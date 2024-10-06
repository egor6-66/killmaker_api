import process from 'process';

const base = () => ({
    envFilePath: `.env.${process.env.NODE_ENV}`,
});

export default base;
