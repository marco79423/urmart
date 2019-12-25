SELECT DISTINCT product_id                                                                 AS id,
                (SELECT name FROM urmart_product AS up WHERE up.id = product_id)           AS name,
                (SELECT SUM(qty) FROM urmart_order AS uo WHERE uo.product_id = product_id) AS qty
FROM urmart_order;
