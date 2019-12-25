SELECT id,
       name,
       SUM(total_price) as total_price,
       SUM(qty)         as total_qty,
       count(1)         as order_qty
FROM (SELECT urmart_shop.id,
             urmart_shop.name,
             qty,
             (qty * urmart_order.price) as total_price
      FROM urmart_order
               INNER JOIN urmart_product ON product_id = urmart_product.id
               INNER JOIN urmart_shop ON shop_id = urmart_shop.id)
GROUP BY name;
