(function(a,t,d,s){"use strict";let r=[];var g={onLoad:function(){try{const i=s.findByProps("sendBotMessage"),c=s.findByProps("getAllFriendInvites"),l=s.findByProps("get","post");r.push(d.registerCommand({name:"invite create",displayName:"invite create",description:"Generates a friend invite link.",displayDescription:"Generates a friend invite link.",type:1,applicationId:-1,inputType:1,execute:async function(p,n){if(!s.findByProps("getCurrentUser").getCurrentUser().phone)return i.sendBotMessage(n.channel.id,"You need to have a phone number connected to your account to create a friend invite!");const o=s.findByProps("v4").v4(),e=await l.post({url:"/friend-finder/find-friends",body:{modified_contacts:{[o]:[1,"",""]},phone_contact_methods_count:1}}).then(function(v){const y=v;c.createFriendInvite({code:v.body.invite_suggestions[0][3],recipient_phone_number_or_email:o,contact_visibility:1,filter_visibilities:[],filtered_invite_suggestions_index:1})});t.logger.log(e);const u=`
                        https://discord.gg/${e.code} \xB7
                        Expires: <t:${new Date(e.expires_at).getTime()/1e3}:R> \xB7
                        uuid: ${o} \xB7
                        invite: ${e.body} \xB7
                        api: ${l} \xB7
                        body: ${response.body} \xB7
                        suggestions: ${response.body.invite_suggestions}
                    `.trim().replace(/\s+/g," ");t.logger.log(u),i.sendBotMessage(n.channel.id,u)}})),r.push(d.registerCommand({name:"view invites",displayName:"view invites",description:"View your current friend invite links that you've made.",displayDescription:"View your current friend invite links that you've made.",type:1,applicationId:-1,execute:async function(p,n){const o=(await c.getAllFriendInvites()).map(function(e){return`_https://discord.gg/${e.code}_ \xB7
                    Expires: <t:${new Date(e.expires_at).getTime()/1e3}:R> \xB7
                    Times used: \`${e.uses}/${e.max_uses}\``.trim().replace(/\s+/g," ")});i.sendBotMessage(n.channel.id,o.join(`
`)||"You have no active friend invites!")}})),r.push(d.registerCommand({name:"revoke invites",displayName:"revoke invites",description:"Revoke all your friend invite links.",displayDescription:"Revoke all your friend invite links.",type:1,applicationId:-1,inputType:1,execute:async function(p,n){await c.revokeFriendInvites(),i.sendBotMessage(n.channel.id,"All friend invites have been revoked.")}})),t.logger.log("FriendInvites has been initialized.")}catch(i){t.logger.error(i.stack)}},onUnload:function(){t.logger.log("FriendInvites has been stopped.");for(const i of r)i()}};return a.default=g,Object.defineProperty(a,"__esModule",{value:!0}),a})({},vendetta,vendetta.commands,vendetta.metro);
