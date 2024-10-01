#!/bin/bash

 mkdir ./releases/    
 for i in {1..100}
 do  
   db_name="";
   if (( $i < 10 ))
   then        
     db_name="00$i"   
   elif (( $i < 100 ))
   then 
     db_name="0$i" 
   fi   
   mv ./tw/${db_name}.db ./releases/shopee_gather_fans_tw_${db_name}.db
   echo "$db_name"
 done


        
      
        
        # mv ./sqlite3/shopee/采集箱/商品/br.db ./releases/shopee_gather_product_br.db
        # mv ./sqlite3/shopee/采集箱/商品/my.db ./releases/shopee_gather_product_my.db
        # mv ./sqlite3/shopee/采集箱/商品/tw.db ./releases/shopee_gather_product_tw.db
        
        # 7z x nextjs.7z
        # 7z x node-shopee.7z
        # mv ./nextjs/plugins/ ./nextjs/public/plugins/
        # unzip ./nextjs.zip
        # unzip ./plugins.zip ./nextjs/
        
        # wget -O 1 https://github.com/rendie-com/rendie-com/releases/download/1/1.zip          
        # mkdir ../images/
        # cp image.tar ../images/image.tar
        # tar -czvf ../images/image.tar.gz image.tar    
