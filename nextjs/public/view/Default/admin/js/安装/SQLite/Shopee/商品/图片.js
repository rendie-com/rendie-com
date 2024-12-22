'use strict';
mssql = mssql.concat([
    {
        name: "table",
        des: "shopee首图",
        database: "shopee/商品/图片/shopee首图",
        action: "sqlite",
        sql: [
            "create unique index proid ON @.table(@.proid)"
        ],
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "proid",
                type: "varchar(10)",
                default: "",
                des: "商品编码（如：R123456）"
            },
            {
                name: "hash",
                type: "varchar(64)",
                default: "0",
                des: "计算hash值"
            },
            {
                name: "src",
                type: "varchar(50)",
                default: "0",
                des: "图片地址"
            },
            {
                name: "my_watermark",
                type: "varchar(50)",
                default: "",
                des: "【马来站点】水印图片地址"
            },
            {
                name: "br_watermark",
                type: "varchar(50)",
                default: "",
                des: "【巴西站点】水印图片地址"
            },
            {
                name: "tw_watermark",
                type: "varchar(50)",
                default: "",
                des: "【台湾站点】水印图片地址"
            },
            {
                name: "sg_watermark",
                type: "varchar(50)",
                default: "",
                des: "【新加坡】水印图片地址"
            },
            {
                name: "tw_video",
                type: "text",
                default: "",
                des: "【台湾站点】上传后的shopee视频。json格式"
            },
            {
                name: "my_video",
                type: "text",
                default: "",
                des: "【马来站点】上传后的shopee视频。json格式"
            },
            {
                name: "br_video",
                type: "text",
                default: "",
                des: "【巴西站点】上传后的shopee视频。json格式"
            },
            {
                name: "sg_video",
                type: "text",
                default: "",
                des: "【新加坡】水印图片地址"
            },
            {
                name: "width",
                type: "integer",
                default: "0",
                des: "添加时间"
            },
            {
                name: "height",
                type: "integer",
                default: "0",
                des: "添加时间"
            },
            {
                name: "size",
                type: "integer",
                default: "0",
                des: "添加时间"
            },
            {
                name: "addtime",
                type: "integer",
                default: "0",
                des: "添加时间"
            }
        ]
    },
    {
        name: "table",
        des: "shopee放大镜图",
        database: "shopee/商品/图片/shopee放大镜图",
        action: "sqlite",
        sql: [
            "create unique index src ON @.table(@.src)"
        ],
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "proid",
                type: "varchar(10)",
                default: "",
                des: "商品编码（如：R123456）"
            },
            {
                name: "hash",
                type: "varchar(64)",
                default: "0",
                des: "计算hash值"
            },
            {
                name: "src",
                type: "varchar(50)",
                default: "0",
                des: "图片地址"
            },
            {
                name: "sg_watermark",
                type: "varchar(50)",
                default: "",
                des: "【新加坡】水印图片地址"
            },
            {
                name: "tw_watermark",
                type: "varchar(50)",
                default: "",
                des: "【台湾站点】水印图片地址"
            },
            {
                name: "my_watermark",
                type: "varchar(50)",
                default: "",
                des: "【马来站点】水印图片地址"
            },
            {
                name: "br_watermark",
                type: "varchar(50)",
                default: "",
                des: "水印图片地址"
            },
            {
                name: "width",
                type: "integer",
                default: "0",
                des: "添加时间"
            },
            {
                name: "height",
                type: "integer",
                default: "0",
                des: "添加时间"
            },
            {
                name: "size",
                type: "integer",
                default: "0",
                des: "添加时间"
            },
            {
                name: "addtime",
                type: "integer",
                default: "0",
                des: "添加时间"
            }
        ]
    },
    {
        name: "table",
        des: "1688属性图",
        database: "shopee/商品/图片/1688属性图",
        action: "sqlite",
        sql: [
            "create unique index src ON @.table(@.src)"
        ],
        table: [
            {
                name: "id",
                type: "integer primary key",
                default: "",
                des: "索引"
            },
            {
                name: "fromid",
                type: "numeric(18,0)",
                default: "0",
                des: "详情ID"
            },
            {
                name: "hash",
                type: "varchar(64)",
                default: "0",
                des: "计算hash值"
            },
            {
                name: "src",
                type: "varchar(50)",
                default: "0",
                des: "图片地址"
            },
            {
                name: "sg_watermark",
                type: "varchar(50)",
                default: "",
                des: "水印图片地址"
            },
            {
                name: "tw_watermark",
                type: "varchar(50)",
                default: "",
                des: "水印图片地址"
            },
            {
                name: "my_watermark",
                type: "varchar(50)",
                default: "",
                des: "水印图片地址"
            },
            {
                name: "br_watermark",
                type: "varchar(50)",
                default: "",
                des: "水印图片地址"
            },
            {
                name: "width",
                type: "integer",
                default: "0",
                des: "添加时间"
            },
            {
                name: "height",
                type: "integer",
                default: "0",
                des: "添加时间"
            },
            {
                name: "size",
                type: "integer",
                default: "0",
                des: "添加时间"
            },
            {
                name: "addtime",
                type: "integer",
                default: "0",
                des: "添加时间"
            }
        ]
    },
]);


// {
//     name: "attrPic_aliexpress",
//     des: "aliexpress商品-属性图片",
//     database: "shopee_img",
//     action: "sqlite",
//     sql: [
//         "create unique index attrPic_aliexpress_src ON @.attrPic_aliexpress(@.src)"
//     ],
//     table: [
//         {
//             name: "id",
//             type: "integer primary key",
//             default: "",
//             des: "索引"
//         },
//         {
//             name: "proid",
//             type: "varchar(10)",
//             default: "",
//             des: "商品编码（如：R123456）"
//         },
//         {
//             name: "hash",
//             type: "varchar(64)",
//             default: "0",
//             des: "计算hash值"
//         },
//         {
//             name: "src",
//             type: "varchar(50)",
//             default: "0",
//             des: "图片地址"
//         },
//         {
//             name: "my_watermark",
//             type: "varchar(50)",
//             default: "",
//             des: "水印图片地址"
//         },
//         {
//             name: "br_watermark",
//             type: "varchar(50)",
//             default: "",
//             des: "水印图片地址"
//         },
//         {
//             name: "tw_watermark",
//             type: "varchar(50)",
//             default: "",
//             des: "水印图片地址"
//         },
//         {
//             name: "width",
//             type: "integer",
//             default: "0",
//             des: ""
//         },
//         {
//             name: "height",
//             type: "integer",
//             default: "0",
//             des: ""
//         },
//         {
//             name: "size",
//             type: "integer",
//             default: "0",
//             des: ""
//         },
//         {
//             name: "addtime",
//             type: "integer",
//             default: "0",
//             des: "添加时间"
//         }
//     ]
// },

// {
//     name: "pic_1688",
//     des: "1688商品-放大镜图片",
//     database: "shopee_img",
//     action: "sqlite",
//     sql: [
//         "create unique index pic_1688 ON @.pic_1688(@.src)"
//     ],
//     table: [
//         {
//             name: "id",
//             type: "integer primary key",
//             default: "",
//             des: "索引"
//         },
//         {
//             name: "fromid",
//             type: "numeric(18,0)",
//             default: "0",
//             des: "详情ID"
//         },
//         {
//             name: "hash",
//             type: "varchar(64)",
//             default: "0",
//             des: "计算hash值"
//         },
//         {
//             name: "src",
//             type: "varchar(50)",
//             default: "0",
//             des: "图片地址"
//         },
//         {
//             name: "tw_watermark",
//             type: "varchar(50)",
//             default: "",
//             des: "水印图片地址"
//         },
//         {
//             name: "my_watermark",
//             type: "varchar(50)",
//             default: "",
//             des: "水印图片地址"
//         },
//         {
//             name: "br_watermark",
//             type: "varchar(50)",
//             default: "",
//             des: "水印图片地址"
//         },
//         {
//             name: "width",
//             type: "integer",
//             default: "0",
//             des: "添加时间"
//         },
//         {
//             name: "height",
//             type: "integer",
//             default: "0",
//             des: "添加时间"
//         },
//         {
//             name: "size",
//             type: "integer",
//             default: "0",
//             des: "添加时间"
//         },
//         {
//             name: "addtime",
//             type: "integer",
//             default: "0",
//             des: "添加时间"
//         }
//     ]
// },
// {
//     name: "despic_1688",
//     des: "1688商品-详情图片",
//     database: "shopee_img",
//     action: "sqlite",
//     sql: [
//         "create unique index despic_1688 ON @.despic_1688(@.src)"
//     ],
//     table: [
//         {
//             name: "id",
//             type: "integer primary key",
//             default: "",
//             des: "索引"
//         },
//         {
//             name: "fromid",
//             type: "numeric(18,0)",
//             default: "0",
//             des: "详情ID"
//         },
//         {
//             name: "hash",
//             type: "varchar(64)",
//             default: "0",
//             des: "计算hash值"
//         },
//         {
//             name: "src",
//             type: "varchar(50)",
//             default: "0",
//             des: "图片地址"
//         },
//         {
//             name: "tw_watermark",
//             type: "varchar(50)",
//             default: "",
//             des: "水印图片地址"
//         },
//         {
//             name: "my_watermark",
//             type: "varchar(50)",
//             default: "",
//             des: "水印图片地址"
//         },
//         {
//             name: "br_watermark",
//             type: "varchar(50)",
//             default: "",
//             des: "水印图片地址"
//         },
//         {
//             name: "width",
//             type: "integer",
//             default: "0",
//             des: "添加时间"
//         },
//         {
//             name: "height",
//             type: "integer",
//             default: "0",
//             des: "添加时间"
//         },
//         {
//             name: "size",
//             type: "integer",
//             default: "0",
//             des: "添加时间"
//         },
//         {
//             name: "addtime",
//             type: "integer",
//             default: "0",
//             des: "添加时间"
//         }
//     ]
// },
// {
//     name: "desPic",
//     des: "shopee商品-详情图片",
//     database: "shopee_img",
//     action: "sqlite",
//     sql: [
//         "create unique index desPic_src ON @.desPic(@.src)"
//     ],
//     table: [
//         {
//             name: "id",
//             type: "integer primary key",
//             default: "",
//             des: "索引"
//         },
//         {
//             name: "proid",
//             type: "varchar(10)",
//             default: "",
//             des: "商品编码（如：R123456）"
//         },
//         {
//             name: "hash",
//             type: "varchar(64)",
//             default: "0",
//             des: "计算hash值"
//         },
//         {
//             name: "src",
//             type: "varchar(50)",
//             default: "0",
//             des: "图片地址"
//         },
//         {
//             name: "tw_watermark",
//             type: "varchar(50)",
//             default: "",
//             des: "水印图片地址"
//         },
//         {
//             name: "my_watermark",
//             type: "varchar(50)",
//             default: "",
//             des: "水印图片地址"
//         },
//         {
//             name: "br_watermark",
//             type: "varchar(50)",
//             default: "",
//             des: "水印图片地址"
//         },
//         {
//             name: "width",
//             type: "integer",
//             default: "0",
//             des: "添加时间"
//         },
//         {
//             name: "height",
//             type: "integer",
//             default: "0",
//             des: "添加时间"
//         },
//         {
//             name: "size",
//             type: "integer",
//             default: "0",
//             des: "添加时间"
//         },
//         {
//             name: "addtime",
//             type: "integer",
//             default: "0",
//             des: "添加时间"
//         }
//     ]
// },