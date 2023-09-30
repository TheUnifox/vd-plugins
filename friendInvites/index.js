var wat;
(function(o,a,d,t){"use strict";let s=[];var l={onLoad:function(){try{const e=t.findByProps("sendBotMessage"),c=t.findByProps("getAllFriendInvites"),u=t.findByProps("get","post");s.push(d.registerCommand({name:"invite create",displayName:"invite create",description:"Generates a friend invite link.",displayDescription:"Generates a friend invite link.",type:1,applicationId:-1,inputType:1,execute:async function(p,n){if(!t.findByProps("getCurrentUser").getCurrentUser().phone)return e.sendBotMessage(n.channel.id,"You need to have a phone number connected to your account to create a friend invite!");const r=t.findByProps("v4").v4(),i=await u.post({url:"/friend-finder/find-friends",body:{modified_contacts:{[r]:[999999,"",""]},phone_contact_methods_count:1}}).then(function(f){wat=f; return c.createFriendInvite({code:f.body.invite_suggestions[0][3],recipient_phone_number_or_email:r,contact_visibility:1,filter_visibilities:[],filtered_invite_suggestions_index:1})}),v=`
                        https://discord.gg/${i.code} \xB7
                        Expires: <t:${new Date(i.expires_at).getTime()/1e3}:R> \xB7
                        ${i}
                    `.trim().replace(/\s+/g," ");e.sendBotMessage(n.channel.id,v)}})),s.push(d.registerCommand({name:"view invites",displayName:"view invites",description:"View your current friend invite links that you've made.",displayDescription:"View your current friend invite links that you've made.",type:1,applicationId:-1,execute:async function(p,n){const r=(await c.getAllFriendInvites()).map(function(i){return`_https://discord.gg/${i.code}_ \xB7
                    Expires: <t:${new Date(i.expires_at).getTime()/1e3}:R> \xB7
                    Times used: \`${i.uses}/${i.max_uses}\``.trim().replace(/\s+/g," ")});e.sendBotMessage(n.channel.id,r.join(`
`)||"You have no active friend invites!")}})),s.push(d.registerCommand({name:"revoke invites",displayName:"revoke invites",description:"Revoke all your friend invite links.",displayDescription:"Revoke all your friend invite links.",type:1,applicationId:-1,inputType:1,execute:async function(p,n){await c.revokeFriendInvites(),e.sendBotMessage(n.channel.id,"All friend invites have been revoked.")}})),a.logger.log("FriendInvites has been initialized.")}catch(e){a.logger.error(e.stack)}},onUnload:function(){a.logger.log("FriendInvites has been stopped.");for(const e of s)e()}};return o.default=l,Object.defineProperty(o,"__esModule",{value:!0}),o})({},vendetta,vendetta.commands,vendetta.metro);