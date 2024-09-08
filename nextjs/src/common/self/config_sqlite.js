export const self_config = {
  path: "view/Default/",
  default_db: "sqlite",//默认数据库(主要目的是为了做兼容用的，因为每种数据库的sql语句有不同)
  pg: "postgres://default:i84vkbPgfqOW@ep-lucky-butterfly-a4tu82np.us-east-1.aws.neon.tech:5432/$1?sslmode=require",
  pg_database: "verceldb",
  //sqlite: "/mnt/sda1/sqlite/$1.db",
  sqlite: "src/app/img/$1.jpg",
  TablePre: "rd_",
  isInstall: false,
};