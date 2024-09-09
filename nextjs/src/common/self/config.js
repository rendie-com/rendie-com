export const self_config = {
  path: "view/Default/",
  default_db: "sqlite",//默认数据库(主要目的是为了做兼容用的，因为每种数据库的sql语句有不同)
  pg_database: "verceldb",
  //sqlite: "/mnt/sda1/sqlite/$1.db",
  sqlite: "../sqlite3/$1.db",
  TablePre: "rd_",
  isInstall: false,
};