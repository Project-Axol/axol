select ch.channel_id, ch.channel_name
from servers as s join categories as c on s.server_id = c.server_id join channels
as ch on ch.category_id = c.category_id
where s.server_id = $1;