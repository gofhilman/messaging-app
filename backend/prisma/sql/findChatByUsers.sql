SELECT c.id 
FROM "Chat" c
WHERE 
  c.type = $1
  AND (
    SELECT ARRAY_AGG(cu."B")
    FROM "_ChatToUser" cu
    WHERE cu."A" = c.id
  ) @> $2
  AND (
    SELECT ARRAY_AGG(cu."B")
    FROM "_ChatToUser" cu
    WHERE cu."A" = c.id
  ) <@ $2
LIMIT 1;