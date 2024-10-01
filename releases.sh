
         mkdir ./releases/
         if [ -f "./sqlite3/shopee/采集箱/粉丝/br.db" ]; then
           cp ./sqlite3/shopee/采集箱/粉丝/br.db ./releases/shopee_gather_fans_br.db 
         fi
         if [ -f "./sqlite3/shopee/采集箱/粉丝/my.db" ]; then
           cp ./sqlite3/shopee/采集箱/粉丝/my.db ./releases/shopee_gather_fans_my.db 
         fi
         if [ -f "./sqlite3/shopee/采集箱/粉丝/tw.db" ]; then
           cp ./sqlite3/shopee/采集箱/粉丝/tw.db ./releases/shopee_gather_fans_tw.db 
         fi
          
         if [ -f "./sqlite3/shopee/采集箱/商品/br.db" ]; then
           cp ./sqlite3/shopee/采集箱/商品/br.db ./releases/shopee_gather_product_br.db 
         fi
         if [ -f "./sqlite3/shopee/采集箱/商品/my.db" ]; then
           cp ./sqlite3/shopee/采集箱/商品/my.db ./releases/shopee_gather_product_my.db 
         fi
         if [ -f "./sqlite3/shopee/采集箱/商品/tw.db" ]; then
           cp ./sqlite3/shopee/采集箱/商品/tw.db ./releases/shopee_gather_product_tw.db 
         fi
         
         if [ -f "./sqlite3/shopee/采集箱/店铺/br.db" ]; then
           cp ./sqlite3/shopee/采集箱/店铺/br.db ./releases/shopee_gather_shop_br.db 
         fi
         if [ -f "./sqlite3/shopee/采集箱/店铺/my.db" ]; then
           cp ./sqlite3/shopee/采集箱/店铺/my.db ./releases/shopee_gather_shop_my.db 
         fi
         if [ -f "./sqlite3/shopee/采集箱/店铺/tw.db" ]; then
           cp ./sqlite3/shopee/采集箱/店铺/tw.db ./releases/shopee_gather_shop_tw.db 
         fi
