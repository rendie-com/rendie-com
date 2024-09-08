export const self_config = {
  path: "view/Default/",
  default_db: "sqlite",//默认数据库(主要目的是为了做兼容用的，因为每种数据库的sql语句有不同)
  pg: "postgres://default:i84vkbPgfqOW@ep-lucky-butterfly-a4tu82np.us-east-1.aws.neon.tech:5432/$1?sslmode=require",//美国华盛顿特区
  //pg: "postgres://default:CfjDKwnloq62@ep-purple-paper-a1rrgjph.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require",//新加坡
  pg_database: "verceldb",
  //sqlite: "/mnt/sda1/sqlite3/$1.db",
  sqlite: "../sqlite3/$1.db",
  TablePre: "rd_",
  isInstall: false,
};
