select dm.dmg_id, dm.dmg_name, dmu.user_id from direct_message_groups as dm join direct_messages_users as dmu on dmu.dmg_id = dm.dmg_id 
where dmu.user_id = $1;