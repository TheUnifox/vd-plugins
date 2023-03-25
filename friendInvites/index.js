(function(a,r,o,c){"use strict";let s=[];var p={onLoad:function(){try{const e=c.findByProps("sendBotMessage"),d=c.findByProps("getAllFriendInvites");s.push(o.registerCommand({name:"invite create",displayName:"invite create",description:"Generates a friend invite link.",displayDescription:"Generates a friend invite link.",type:1,applicationId:-1,inputType:1,execute:async function(l,n){const t=await d.createFriendInvite(),i=`
                        https://discord.gg/${t.code} \xB7
                        Expires: <t:${new Date(t.expires_at).getTime()/1e3}:R> \xB7
                        Max uses: \`${t.max_uses}\`
                    `.trim().replace(/\s+/g," ");e.sendBotMessage(n.channel.id,i)}})),s.push(o.registerCommand({name:"view invites",displayName:"view invites",description:"View your current friend invite links that you've made.",displayDescription:"View your current friend invite links that you've made.",type:1,applicationId:-1,execute:async function(l,n){const t=(await d.getAllFriendInvites()).map(function(i){return`_https://discord.gg/${i.code}_ \xB7
                    Expires: <t:${new Date(i.expires_at).getTime()/1e3}:R> \xB7
                    Times used: \`${i.uses}/${i.max_uses}\``.trim().replace(/\s+/g," ")});e.sendBotMessage(n.channel.id,t.join(`
`)||"You have no active friend invites!")}})),s.push(o.registerCommand({name:"revoke invites",displayName:"revoke invites",description:"Revoke all your friend invite links.",displayDescription:"Revoke all your friend invite links.",type:1,applicationId:-1,inputType:1,execute:async function(l,n){await d.revokeFriendInvites(),e.sendBotMessage(n.channel.id,"All friend invites have been revoked.")}})),r.logger.log("FriendInvites has been initialized.")}catch(e){r.logger.error(e.stack)}},onUnload:function(){r.logger.log("FriendInvites has been stopped.");for(const e of s)e()}};return a.default=p,Object.defineProperty(a,"__esModule",{value:!0}),a})({},vendetta,vendetta.commands,vendetta.metro);
