// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  //引入AWS SDK
  const AWS = require('aws-sdk');
  //配置AWS SDK
  AWS.config.update({
    region: process.env.AWS_REGION, // 替换为你的DynamoDB表区域
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // 你的AWS访问密钥
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY // 你的AWS秘密密钥
  });
  //创建DynamoDB客户端
  const dynamodb = new AWS.DynamoDB();
  // const params = {
  //   TableName: 'table', // 替换为你的表名
  //   FilterExpression: "contains (#attrName, :attrValue)", // 使用contains函数进行筛选
  //   ExpressionAttributeNames: {
  //     "#attrName": "id", // 替换为你的属性名
  //   },
  //   ExpressionAttributeValues: {
  //     ":attrValue": { S: "aa" }, // 替换为你想要搜索的值
  //   },
  // };
  // // 执行查询
  // dynamodb.scan(params, (error, data) => {
  //   if (error) {
  //     console.error('查询错误：', error);
  //   } else {
  //     console.log('查询结果：', data.Items);
  //     res.status(200).json(data);
  //   }
  // });
  ////////////////////////////////////////////////////////////////
  // 创建查询参数
  // const params = {
  //   TableName: 'table', // 替换为您的表名
  //   KeyConditionExpression: 'id=:hashval', // 替换为您的分区键条件
  //   ExpressionAttributeValues: {
  //     ':hashval': { S: 'aa' } // 替换为您的分区键值
  //   }
  // };
  // // 执行查询
  // dynamodb.query(params, (error, data) => {
  //   if (error) {
  //     console.error('查询错误：', error);
  //   } else {
  //     console.log('查询结果：', data.Items);
  //     res.status(200).json(data);
  //   }
  // });
  //console.log(process.env)
  //res.status(200).json([]);
  /////////////////////////////////////////////////////////////
  // 创建表
  // const createTableParams = {
  //   TableName: 'ExampleTable-1111',
  //   AttributeDefinitions: [
  //     { AttributeName: 'id', AttributeType: 'N' }
  //   ],
  //   KeySchema: [
  //     { AttributeName: 'id', KeyType: 'HASH' }
  //   ],
  //   ProvisionedThroughput: {
  //     ReadCapacityUnits: 5,
  //     WriteCapacityUnits: 5
  //   }
  // };
  // dynamodb.createTable(createTableParams, (err, data) => {
  //   if (err) {
  //     console.error('创建表失败', err);
  //   } else {
  //     //console.log('创建表成功', data);
  //     res.status(200).json(data);
  //   }
  // });
  //////////////////////////////////////////////////////////
  // 插入项目
  // const putItemParams = {
  //   TableName: 'main_manager',
  //   Item: {
  //     rd_id: { S: 'e3fb824b-d427-05e9-6afc-844d137e49b1' },
  //     rd_name: { S: 'admin' },
  //     rd_pwd: {
  //       S: '1a55179d134cd8af19b11439eb6387472ae8ddc02a5190a3f47f8acf423d479e'
  //     },
  //     rd_state: { N: '1' },
  //     rd_GroupID: { N: '1' }
  //   }
  // };
  // dynamodb.putItem(putItemParams, (err, data) => {
  //   if (err) {
  //     console.error('插入项目失败', err);
  //   } else {
  //     //console.log('插入项目成功', data);
  //     res.status(200).json(data);
  //   }
  // });
  //////////////////////////////////////////////////////////
  // 查
  // const getItemParams = {
  //   TableName: 'ExampleTable',
  //   Key: {
  //     'id': { N: '3' }
  //   }
  // };
  // dynamodb.getItem(getItemParams, (err, data) => {
  //   if (err) {
  //     console.error('获取项目失败', err);
  //   } else {
  //     //console.log('获取项目成功', data);
  //     res.status(200).json(data);
  //   }
  // });
  //////////////////////////////////////////////////////
  // 更新
  // const updateItemParams = {
  //   TableName: 'ExampleTable',
  //   Key: {
  //     'id': { N: '1' }
  //   },
  //   UpdateExpression: 'SET #attrName = :attrValue',
  //   ExpressionAttributeNames: {
  //     '#attrName': 'name'
  //   },
  //   ExpressionAttributeValues: {
  //     ':attrValue': { S: 'Updated Sample Item' }
  //   }
  // };
  // dynamodb.updateItem(updateItemParams, (err, data) => {
  //   if (err) {
  //     console.error('更新项目失败', err);
  //   } else {
  //     //console.log('更新项目成功', data);
  //     res.status(200).json(data);
  //   }
  // });
  //////////////////////////////////////////////////////
  // 删除项目
  // const deleteItemParams = {
  //   TableName: 'ExampleTable',
  //   Key: {
  //     'id': { N: '1' }
  //   }
  // };
  // dynamodb.deleteItem(deleteItemParams, (err, data) => {
  //   if (err) {
  //     console.error('删除项目失败', err);
  //   } else {
  //     //console.log('删除项目成功', data);
  //     res.status(200).json(data);
  //   }
  // });
}








