SELECT id,
       name,
       qty
FROM (SELECT urmart_order.product_id                                                             AS id,
             (SELECT name FROM urmart_product WHERE urmart_product.id = urmart_order.product_id) AS name,
             SUM(urmart_order.qty)                                                               AS qty
      FROM urmart_order
      GROUP BY urmart_order.product_id) AS uo
ORDER BY qty DESC
LIMIT 3;
