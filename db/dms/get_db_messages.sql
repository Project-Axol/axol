select * from direct_messages as dm join direct_message_groups as dmg on dm.dmg_id = dmg.dmg_id join users as u
on dm.user_id = u.user_id where dmg.dmg_id = $1