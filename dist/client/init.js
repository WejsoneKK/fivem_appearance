var n=0,j=e=>{n=e};var z=(e,t)=>{SendNUIMessage({action:e,data:t})},O=e=>new Promise(t=>setTimeout(t,e)),we=async e=>{let t=typeof e=="number"?e:GetHashKey(e);if(!IsModelValid(t))throw exports.bl_bridge.notify()({title:"Invalid model!",type:"error",duration:1e3}),new Error(`attempted to load invalid model '${e}'`);return HasModelLoaded(t)||(RequestModel(t),await new Promise(a=>{let o=setInterval(()=>{HasModelLoaded(t)&&(clearInterval(o),a())},100)})),t},R=GetCurrentResourceName(),Pe={},X={};function ze(e,t){if(t&&t>0){let r=GetGameTimer();if((Pe[e]||0)>r)return!1;Pe[e]=r+t}return!0}onNet(`_bl_cb_${R}`,(e,...t)=>{let r=X[e];return r&&r(...t)});function m(e,...t){if(!ze(e,0))return;let r;do r=`${e}:${Math.floor(Math.random()*100001)}`;while(X[r]);return emitNet(`_bl_cb_${e}`,R,r,...t),new Promise(a=>{X[r]=a})}function Q(e,t){onNet(`_bl_cb_${e}`,async(r,a,...o)=>{let s;try{s=await t(...o)}catch(i){console.error(`an error occurred while handling callback event ${e}`),console.log(`^3${i.stack}^0`)}emitNet(`_bl_cb_${r}`,a,s)})}var Te=e=>new Promise(t=>{let r=()=>{if(RequestResourceFileSet(e)){let a=exports.bl_appearance.config().locale,o=LoadResourceFile(R,`locale/${a}.json`);o||(console.error(`${a}.json not found in locale, please verify!, we used english for now!`),o=LoadResourceFile(R,"locale/en.json")),t(o)}else setTimeout(r,100)};r()});var B=exports.bl_bridge,H=()=>B.core().getPlayerData(),f=()=>H().cid,Ce=()=>H().gender==="male"?"mp_m_freemode_01":"mp_f_freemode_01";function _e(e){return new Promise(t=>setTimeout(t,e))}function ke(e){return e.includes("'")?e.replace(/'/g,""):e}function ve(){let e=H().job;return e?{name:e.name,isBoss:e.isBoss}:null}var oe=2,re=1,V=!1,g=1.8,h=null,T=0,F=0,y=null,ee=null,ae=!1;var E="head",Ze={whole:0,head:31086,torso:24818,legs:[16335,46078],shoes:[14201,52301]},D=e=>Math.cos(e*Math.PI/180),te=e=>Math.sin(e*Math.PI/180),Ae=()=>{let e=(D(F)*D(T)+D(T)*D(F))/2*g,t=(te(F)*D(T)+D(T)*te(F))/2*g,r=te(T)*g;return[e,t,r]},ne=(e,t)=>{if(!V||!y||ae)return;e=e??0,t=t??0,F-=e,T+=t;let a=E==="whole"||E==="head"?89:70;T=Math.min(Math.max(T,E==="shoes"?5:-20),a);let[i,c,u]=Ae();SetCamCoord(h,y.x+i,y.y+c,y.z+u),PointCamAtCoord(h,y.x,y.y,y.z)},Se=async(e,t)=>{let r=GetEntityHeading(n)+94;t=t??1,ae=!0,g=t,F=r;let[a,o,s]=Ae(),i=CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA",e.x+a,e.y+o,e.z+s,0,0,0,70,!1,0);y=e,ae=!1,ee=h,h=i,PointCamAtCoord(i,e.x,e.y,e.z),SetCamActiveWithInterp(i,ee,250,0,0),await O(250),SetCamUseShallowDofMode(i,!0),SetCamNearDof(i,.4),SetCamFarDof(i,1.2),SetCamDofStrength(i,.3),Oe(i),DestroyCam(ee,!0)},Oe=e=>{DoesCamExist(h)&&e==h&&(SetUseHiDof(),setTimeout(Oe,0))},De=()=>{if(V)return;V=!0,g=oe,h=CreateCam("DEFAULT_SCRIPTED_CAMERA",!0);let[e,t,r]=GetPedBoneCoords(n,31086,0,0,0);SetCamCoord(h,e,t,r),RenderScriptCams(!0,!0,1e3,!0,!0),M("whole",g)},Me=()=>{V&&(V=!1,RenderScriptCams(!1,!0,250,!0,!1),DestroyCam(h,!0),h=null,y=null)},M=(e,t=g)=>{let r=Ze[e],a=Array.isArray(r);if(E=e,!a&&r===0){let[c,u,l]=GetEntityCoords(n,!1);Se({x:c,y:u,z:l+0},t);return}if(t>re&&(t=re),a){let[c,u,l]=GetPedBoneCoords(n,r[0],0,0,0),[d,b,Y]=GetPedBoneCoords(n,r[1],0,0,0);var o=(c+d)/2,s=(u+b)/2,i=(l+Y)/2}else var[o,s,i]=GetPedBoneCoords(n,r,0,0,0);Se({x:o,y:s,z:i+0},t)};RegisterNuiCallback("appearance:camMove",(e,t)=>{ne(e.x,e.y),t(1)});RegisterNuiCallback("appearance:camSection",(e,t)=>{switch(e){case"whole":M("whole",oe);break;case"head":M("head");break;case"torso":M("torso");break;case"legs":M("legs");break;case"shoes":M("shoes"),ne();break}t(1)});RegisterNuiCallback("appearance:camZoom",(e,t)=>{if(e==="down"){let r=E==="whole"?oe:re,a=g+.05;g=a>=r?r:a}else if(e==="up"){let r=g-.05;g=r<=.3?.3:r}g=g,ne(),t(1)});var se=["Blemishes","FacialHair","Eyebrows","Ageing","Makeup","Blush","Complexion","SunDamage","Lipstick","MolesFreckles","ChestHair","BodyBlemishes","AddBodyBlemishes","EyeColor"];var ie=["Nose_Width","Nose_Peak_Height","Nose_Peak_Lenght","Nose_Bone_Height","Nose_Peak_Lowering","Nose_Bone_Twist","EyeBrown_Height","EyeBrown_Forward","Cheeks_Bone_High","Cheeks_Bone_Width","Cheeks_Width","Eyes_Openning","Lips_Thickness","Jaw_Bone_Width","Jaw_Bone_Back_Lenght","Chin_Bone_Lowering","Chin_Bone_Length","Chin_Bone_Width","Chin_Hole","Neck_Thikness"];var le=["face","masks","hair","torsos","legs","bags","shoes","neck","shirts","vest","decals","jackets"];var ce=["hats","glasses","earrings","mouth","lhand","rhand","watches","bracelets"];function qe(e){return exports.bl_appearance.models().findIndex(a=>GetHashKey(a)===e)}function Fe(e){return{color:GetPedHairColor(e),highlight:GetPedHairHighlightColor(e)}}function Ge(e){let t=new ArrayBuffer(80);global.Citizen.invokeNative("0x2746bd9d88c5c5d0",e,new Uint32Array(t));let{0:r,2:a,4:o,6:s,8:i,18:c,10:u}=new Uint32Array(t),{0:l,2:d,4:b}=new Float32Array(t,48);return{shapeFirst:r,shapeSecond:a,shapeThird:o,skinFirst:s,skinSecond:i,skinThird:u,shapeMix:l,thirdMix:b,skinMix:d,hasParent:!!c}}function Ne(e){let t={},r={};for(let a=0;a<se.length;a++){let o=se[a];if(t[o]=GetNumHeadOverlayValues(a),o==="EyeColor")r[o]={id:o,index:a,overlayValue:GetPedEyeColor(e)};else{let[s,i,c,u,l,d]=GetPedHeadOverlayData(e,a);r[o]={id:o,index:a,overlayValue:i===255?-1:i,colourType:c,firstColor:u,secondColor:l,overlayOpacity:d}}}return[r,t]}function Ie(e){let t=GetEntityModel(e);if(t!==GetHashKey("mp_m_freemode_01")&&t!==GetHashKey("mp_f_freemode_01"))return;let r={};for(let a=0;a<ie.length;a++){let o=ie[a];r[o]={id:o,index:a,value:GetPedFaceFeature(e,a)}}return r}function K(e){let t={},r={};for(let a=0;a<le.length;a++){let o=le[a],s=GetPedDrawableVariation(e,a);r[o]={id:o,index:a,total:GetNumberOfPedDrawableVariations(e,a),textures:GetNumberOfPedTextureVariations(e,a,s)},t[o]={id:o,index:a,value:GetPedDrawableVariation(e,a),texture:GetPedTextureVariation(e,a)}}return[t,r]}function Z(e){let t={},r={};for(let a=0;a<ce.length;a++){let o=ce[a],s=GetPedPropIndex(e,a);r[o]={id:o,index:a,total:GetNumberOfPedPropDrawableVariations(e,a),textures:GetNumberOfPedPropTextureVariations(e,a,s)},t[o]={id:o,index:a,value:GetPedPropIndex(e,a),texture:GetPedPropTextureIndex(e,a)}}return[t,r]}async function x(e){let[t,r]=Ne(e),[a,o]=K(e),[s,i]=Z(e),c=GetEntityModel(e);return{modelIndex:qe(c),model:c,hairColor:Fe(e),headBlend:Ge(e),headOverlay:t,headOverlayTotal:r,headStructure:Ie(e),drawables:a,props:s,drawTotal:o,propTotal:i,tattoos:[]}}exports("GetAppearance",x);Q("bl_appearance:client:getAppearance",()=>x(n||PlayerPedId()));function Ue(e){let[t]=K(e),[r]=Z(e),[a]=Ne(e);return{headOverlay:a,drawables:t,props:r}}exports("GetPedClothes",Ue);function We(e){return{headBlend:Ge(e),headStructure:Ie(e),hairColor:Fe(e),model:GetEntityModel(e)}}exports("GetPedSkin",We);function q(){let e=[],[t,r]=exports.bl_appearance.tattoos();for(let o=0;o<r.length;o++){let s=r[o],i=s.zone,c=s.label,u=s.index;e[u]={zone:i,label:c,zoneIndex:u,dlcs:[]};for(let l=0;l<t.length;l++){let d=t[l];e[u].dlcs.push({label:d.dlc,dlcIndex:l,tattoos:[]})}}let a=GetEntityModel(n)===GetHashKey("mp_f_freemode_01");for(let o=0;o<t.length;o++){let s=t[o],{dlc:i,tattoos:c}=s,u=GetHashKey(i);for(let l=0;l<c.length;l++){let d=c[l],b=null,L=d.toLowerCase().includes("_f");(L&&a||!L&&!a)&&(b=d);let k=null,A=-1;b&&(k=GetHashKey(b),A=GetPedDecorationZoneFromHashes(u,k)),A!==-1&&k&&e[A].dlcs[o].tattoos.push({label:b,hash:k,zone:A,dlc:i})}}return e}Q("bl_appearance:client:migration:setAppearance",e=>{e.type==="fivem"&&exports["fivem-appearance"].setPlayerAppearance(e.data),e.type==="illenium"&&exports["illenium-appearance"].setPlayerAppearance(e.data)});var U={hats:{type:"prop",index:0},glasses:{type:"prop",index:1},masks:{type:"drawable",index:1,off:0},shirts:{type:"drawable",index:8,off:15,hook:{drawables:[{component:3,variant:15,texture:0,id:"torsos"},{component:8,variant:15,texture:0,id:"shirts"}]}},jackets:{type:"drawable",index:11,off:15,hook:{drawables:[{component:3,variant:15,texture:0,id:"torsos"},{component:11,variant:15,texture:0,id:"jackets"}]}},vest:{type:"drawable",index:9,off:0},legs:{type:"drawable",index:4,off:18},shoes:{type:"drawable",index:6,off:34}};function C(e,t){return SetPedComponentVariation(e,t.index,t.value,t.texture,0),GetNumberOfPedTextureVariations(e,t.index,t.value)}function v(e,t){if(t.value===-1){ClearPedProp(e,t.index);return}return SetPedPropIndex(e,t.index,t.value,t.texture,!1),GetNumberOfPedPropTextureVariations(e,t.index,t.value)}var S=async e=>{let t=await we(e);SetPlayerModel(PlayerId(),t),SetModelAsNoLongerNeeded(t);let r=PlayerPedId();j(r),SetPedDefaultComponentVariation(r),t===GetHashKey("mp_m_freemode_01")?SetPedHeadBlendData(n,0,0,0,0,0,0,0,0,0,!1):t===GetHashKey("mp_f_freemode_01")&&SetPedHeadBlendData(n,45,21,0,20,15,0,.3,.1,0,!1)};function ue(e,t){SetPedFaceFeature(e,t.index,t.value+0)}var G=e=>e>=0?e:0;function pe(e,t){let r=G(t.shapeFirst),a=G(t.shapeSecond),o=G(t.shapeThird),s=G(t.skinFirst),i=G(t.skinSecond),c=G(t.skinThird),u=t.shapeMix+0,l=t.skinMix+0,d=t.thirdMix+0,b=t.hasParent;SetPedHeadBlendData(e,r,a,o,s,i,c,u,l,d,b)}function de(e,t){let r=t.index;if(r===13){SetPedEyeColor(e,t.value);return}let a=t.overlayValue;if(t.id==="hairColor"){SetPedHairTint(e,t.hairColor,t.hairHighlight);return}SetPedHeadOverlay(e,r,a,t.overlayOpacity+0),SetPedHeadOverlayColor(e,r,1,t.firstColor,t.secondColor)}function Be(e){let t=e.drawables,r=e.props;for(let[a,o]of Object.entries(U)){let s=o.type,i=o.index;s==="drawable"&&t[a]?GetPedDrawableVariation(n,i)!==t[a].value&&SetPedComponentVariation(n,i,t[a].value,0,0):s==="prop"&&r[a]&&GetPedPropIndex(n,i)!==r[a].value&&SetPedPropIndex(n,i,r[a].value,0,!1)}}function N(e,t){let r=t.drawables,a=t.props,o=t.headOverlay;for(let s in r){let i=r[s];C(e,i)}for(let s in a){let i=a[s];v(e,i)}for(let s in o){let i=o[s];de(e,i)}}var me=async(e,t)=>{let r=t.headStructure,a=t.headBlend;if(await S(t.model),a&&pe(e,a),r)for(let o in r){let s=r[o];ue(e,s)}};function P(e,t){if(t){ClearPedDecorationsLeaveScars(e);for(let r=0;r<t.length;r++){let a=t[r].tattoo;if(a){let o=GetHashKey(a.dlc),s=a.hash;AddPedDecorationFromHashes(e,o,s)}}}}function fe(e,t){let r=t.color,a=t.highlight;SetPedHairColor(e,r,a)}async function _(e,t){await me(e,t),N(e,t),fe(e,t.hairColor),P(e,t.tattoos)}async function w(e){await me(n,e),N(n,e),fe(n,e.hairColor),P(n,e.tattoos)}exports("SetPedClothes",N);exports("SetPedSkin",me);exports("SetPedTattoos",P);exports("SetPedHairColors",fe);RegisterNuiCallback("appearance:cancel",async(e,t)=>{await w(e),be(),t(1)});RegisterNuiCallback("appearance:save",async(e,t)=>{Be(e),await O(100);let r=await x(n);r.tattoos=e.tattoos,m("bl_appearance:server:saveAppearance",f(),r),P(n,r.tattoos),be(),t(1)});RegisterNuiCallback("appearance:setModel",async(e,t)=>{let r=GetHashKey(e);if(!IsModelInCdimage(r)||!IsModelValid(r))return t(0);await S(r);let a=await x(n);a.tattoos=[],P(n,[]),t(a)});RegisterNuiCallback("appearance:getModelTattoos",async(e,t)=>{let r=q();t(r)});RegisterNuiCallback("appearance:setHeadStructure",async(e,t)=>{ue(n,e),t(1)});RegisterNuiCallback("appearance:setHeadOverlay",async(e,t)=>{de(n,e),t(1)});RegisterNuiCallback("appearance:setHeadBlend",async(e,t)=>{pe(n,e),t(1)});RegisterNuiCallback("appearance:setTattoos",async(e,t)=>{P(n,e),t(1)});RegisterNuiCallback("appearance:setProp",async(e,t)=>{let r=v(n,e);t(r)});RegisterNuiCallback("appearance:setDrawable",async(e,t)=>{let r=C(n,e);t(r)});RegisterNuiCallback("appearance:toggleItem",async(e,t)=>{let r=U[e.item];if(!r)return t(!1);let a=e.data,o=r.type,s=r.index,i=r.hook,c=e.hookData;if(!a)return t(!1);if(o==="prop")if(GetPedPropIndex(n,s)===-1){v(n,a),t(!1);return}else{ClearPedProp(n,s),t(!0);return}else if(o==="drawable"){let u=GetPedDrawableVariation(n,s);if(a.value===r.off){t(!1);return}if(a.value===u){if(SetPedComponentVariation(n,s,r.off,0,0),i)for(let l=0;l<i.drawables?.length;l++){let d=i.drawables[l];SetPedComponentVariation(n,d.component,d.variant,d.texture,0)}t(!0);return}else{C(n,a);for(let l=0;l<c?.length;l++)C(n,c[l]);t(!1);return}}});RegisterNuiCallback("appearance:saveOutfit",async(e,t)=>{let r=f(),a=await m("bl_appearance:server:saveOutfit",r,e);t(a)});RegisterNuiCallback("appearance:deleteOutfit",async({id:e},t)=>{let r=f(),a=await m("bl_appearance:server:deleteOutfit",r,e);t(a)});RegisterNuiCallback("appearance:renameOutfit",async(e,t)=>{let r=f(),a=await m("bl_appearance:server:renameOutfit",r,e);t(a)});RegisterNuiCallback("appearance:useOutfit",async(e,t)=>{N(n,e),t(1)});RegisterNuiCallback("appearance:importOutfit",async({id:e,outfitName:t},r)=>{let a=f(),o=await m("bl_appearance:server:importOutfit",a,e,t);r(o)});RegisterNuiCallback("appearance:grabOutfit",async({id:e},t)=>{let r=await m("bl_appearance:server:grabOutfit",e);t(r)});RegisterNuiCallback("appearance:itemOutfit",async(e,t)=>{let r=await m("bl_appearance:server:itemOutfit",e);t(r)});onNet("bl_appearance:server:useOutfit",e=>{N(n,e)});var ge=exports.bl_appearance,He=0,he=!1,$=null,W=null;async function I(e,t=!1){if(e===null||he)return;let r=PlayerPedId(),a=ge.menus(),o=e.type,s=a[o];if(!s)return;j(r),De();let i=f(),c=s.tabs,u=t?!1:s.allowExit;He=GetPedArmour(r);let l=[];c.includes("outfits")&&(l=await m("bl_appearance:server:getOutfits",i));let b=[];c.includes("heritage")&&(b=ge.models());let L=c.includes("tattoos"),k;L&&(k=q());let A=$e(e),J=await x(r);if(t){let xe=GetHashKey(Ce());await S(xe),J.model=xe,emitNet("bl_appearance:server:setroutingbucket"),W=new Promise(je=>{$=je})}return z("appearance:data",{tabs:c,appearance:J,blacklist:A,tattoos:k,outfits:l,models:b,allowExit:u,job:ve(),locale:await Te("locale")}),SetNuiFocus(!0,!0),z("appearance:visible",!0),he=!0,exports.bl_appearance.hideHud(!0),W&&(await W,emitNet("bl_appearance:server:resetroutingbucket")),W=null,$=null,!0}exports("openMenu",I);function $e(e){if(!e)return{};let{groupTypes:t,base:r}=ge.blacklist();if(!t)return{};if(!r)return{};let a={...r},o=H();for(let s in t){let i=t[s];for(let c in i){let u=!1;if(s=="jobs"&&e.jobs&&(u=e.jobs.includes(o.job.name)),s=="gangs"&&e.gangs&&(u=e.gangs.includes(o.gang.name)),!u){let l=i[c];a=Object.assign({},a,l,{drawables:Object.assign({},a.drawables,l.drawables)})}}}return a}function be(){SetPedArmour(n,He),Me(),SetNuiFocus(!1,!1),z("appearance:visible",!1),exports.bl_appearance.hideHud(!1),$&&$(),he=!1}function Ee(){onNet("qb-clothing:client:loadPlayerClothing",async(e,t)=>{await _(t,e)}),onNet("qb-clothes:client:CreateFirstCharacter",()=>{exports.bl_appearance.InitialCreation()}),onNet("qb-clothing:client:openOutfitMenu",()=>{I({type:"outfits",coords:[0,0,0,0]})})}function Ve(){let e=!1;on("esx_skin:resetFirstSpawn",()=>{e=!0}),on("esx_skin:playerRegistered",()=>{e&&exports.bl_appearance.InitialCreation()}),onNet("skinchanger:loadSkin2",async(t,r)=>{t.model||(t.model=GetHashKey("mp_m_freemode_01")),await _(r,t)}),onNet("skinchanger:getSkin",async t=>{let r=await f(),a=await m("bl_appearance:server:getAppearance",r);t(a)}),onNet("skinchanger:loadSkin",async(t,r)=>{await w(t),r&&r()}),onNet("esx_skin:openSaveableMenu",async t=>{exports.bl_appearance.InitialCreation(t)})}function p(e,t){on("__cfx_export_illenium-appearance_"+e,r=>{r(t)})}function Le(){p("startPlayerCustomization",()=>{exports.bl_appearance.InitialCreation()}),p("getPedModel",e=>GetEntityModel(e)),p("getPedComponents",e=>{let t=K(e)[0],r=[];for(let a of t){let o=t[a];r.push({component_id:o.index,drawable:o.value,texture:o.texture})}}),p("getPedProps",e=>{let t=Z(e)[0],r=[];for(let a of t){let o=t[a];r.push({prop_id:o.index,drawable:o.value,texture:o.texture})}}),p("getPedHeadBlend",e=>console.warn("You Still cannot use this function")),p("getPedFaceFeatures",e=>console.warn("You Still cannot use this function")),p("getPedHeadOverlays",e=>console.warn("You Still cannot use this function")),p("getPedHair",e=>console.warn("You Still cannot use this function")),p("getPedAppearance",e=>x(e)),p("setPlayerModel",e=>{S(e)}),p("setPedHeadBlend",(e,t)=>console.warn("You Still cannot use this function")),p("setPedFaceFeatures",()=>console.warn("You Still cannot use this function")),p("setPedHeadOverlays",(e,t)=>console.warn("You Still cannot use this function")),p("setPedHair",async(e,t,r)=>console.warn("You Still cannot use this function")),p("setPedEyeColor",()=>console.warn("You Still cannot use this function")),p("setPedComponent",(e,t)=>{let r={index:t.component_id,value:t.drawable,texture:t.texture};C(e,r)}),p("setPedComponents",(e,t)=>{for(let r of t){let a={index:r.component_id,value:r.drawable,texture:r.texture};C(e,a)}}),p("setPedProp",(e,t)=>{let r={index:t.prop_id,value:t.drawable,texture:t.texture};v(e,r)}),p("setPedProps",(e,t)=>{for(let r of t){let a={index:r.prop_id,value:r.drawable,texture:r.texture};v(e,a)}}),p("setPedAppearance",(e,t)=>{_(e,t)}),p("setPedTattoos",(e,t)=>{P(e,t)})}RegisterCommand("openMenu",async()=>{exports.bl_appearance.InitialCreation()},!1);exports("SetPedAppearance",async(e,t)=>{await _(e,t)});exports("SetPlayerPedAppearance",async e=>{let t;if(typeof e=="string"&&e){let r=e||await f();t=await m("bl_appearance:server:getAppearance",r)}else typeof e=="object"&&(t=e);if(!t)throw new Error("No valid appearance found");await w(t)});exports("GetPlayerPedAppearance",async e=>(e=e||await f(),await m("bl_appearance:server:getAppearance",e)));exports("InitialCreation",async e=>{await I({type:"appearance",coords:[0,0,0,0]},!0),e&&e()});on("bl_sprites:client:useZone",e=>{I(e)});onNet("bl_bridge:client:playerLoaded",async()=>{for(;!B.core().playerLoaded();)await _e(100);let e=await f(),t=await m("bl_appearance:server:getAppearance",e);t&&await w(t)});onNet("onResourceStart",async e=>{if(e===GetCurrentResourceName()&&B.core().playerLoaded()){let t=await f(),r=await m("bl_appearance:server:getAppearance",t);if(!r)return;await w(r)}});var Re=B.getFramework("core"),ye=ke(GetConvar("bl:framework","qb"));ye=="qb"||ye=="qbx"&&GetResourceState(Re)=="started"?Ee():ye=="esx"&&GetResourceState(Re)=="started"&&Ve();Le();RegisterCommand("reloadskin",async()=>{let e=await f(),t=GetEntityHealth(n),r=GetEntityMaxHealth(n),a=GetPedArmour(n),o=await m("bl_appearance:server:getAppearance",e);o&&(await w(o),SetPedMaxHealth(n,r),O(1e3),SetEntityHealth(n,t),SetPedArmour(n,a))},!1);
