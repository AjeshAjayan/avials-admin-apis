module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', 'avials.clob1x2voxhn.ap-south-1.rds.amazonaws.com'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'postgres'),
        username: env('DATABASE_USERNAME', 'avials'),
        password: env('DATABASE_PASSWORD', 'avials123'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {}
    },
  },
});
