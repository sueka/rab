(self.webpackChunkrap=self.webpackChunkrap||[]).push([[5571],{94010:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return X}});var a=n(33901),c=n(282),l=n(41749),s=n(62822),r=n(50998),o=n(81860),i=n(95757),d=n(96837),m=n(40074),p=n(67162),u=n(9570),g=n(3380),A=n(73521),E=n(3320),Z=n(71205),f=n(81019),h=n(15659),y=n(67294),S=n(64593),k=n(31753),x=n(97127),C=n(2804),b=n(44586),v=n(46121),I=n(55842),w=n(86572);var P=(0,C.cn)({key:"fullScreenState",default:!1,effects_UNSTABLE:[({onSet:e})=>{e((e=>{if(e instanceof C.nY)throw new Error;e?document.documentElement.requestFullscreen():document.exitFullscreen()}))}]}),L=n(23010),T=n(95200),R=n(98253),M=n(13833),_=n(44901),B=n(60661),F=n(79388),G=n(14069),D=n(52210),U=n(93379),q=n.n(U),N=n(32638),O={insert:"head",singleton:!1},z=(q()(N.Z,O),N.Z.locals||{}),V=(0,n(85315).vU)({settings:{id:"src.components.App.SettingsPage.settings",defaultMessage:"Settings"},general:{id:"src.components.App.SettingsPage.general",defaultMessage:"General"},language:{id:"src.components.App.SettingsPage.language",defaultMessage:"Language"},appearance:{id:"src.components.App.SettingsPage.appearance",defaultMessage:"Appearance"},theme:{id:"src.components.App.SettingsPage.theme",defaultMessage:"Theme"},useLightTheme:{id:"src.components.App.SettingsPage.useLightTheme",defaultMessage:"Use light theme"},useDarkTheme:{id:"src.components.App.SettingsPage.useDarkTheme",defaultMessage:"Use dark theme"},useDeviceTheme:{id:"src.components.App.SettingsPage.useDeviceTheme",defaultMessage:"Use device theme"},fullScreen:{id:"src.components.App.SettingsPage.fullScreen",defaultMessage:"Full screen"},securityAndPrivacy:{id:"src.components.App.SettingsPage.securityAndPrivacy",defaultMessage:"Security and privacy"},acceptCookies:{id:"src.components.App.SettingsPage.acceptCookies",defaultMessage:"Accept cookies"},aPageReloadIsRequiredForTheConfigurationChangesToTakeEffect:{id:"src.components.App.SettingsPage.aPageReloadIsRequiredForTheConfigurationChangesToTakeEffect",defaultMessage:"A page reload is required for the configuration changes to take effect."},reload:{id:"src.components.App.SettingsPage.reload",defaultMessage:"Reload"},dontReload:{id:"src.components.App.SettingsPage.dontReload",defaultMessage:"Don't reload"}});const W=(0,b.Z)(),j=(0,b.Z)(),J=(0,b.Z)(),Q=(0,b.Z)();var X=(0,M.D)((()=>{const{formatMessage:e}=(0,k.Z)(),t=(0,h.useInjection)("EnvVarConfig").get("GTM_CONTAINER_ID"),n=(0,D.Z)(),b=(0,G.Z)(),[M,U]=(0,C.FV)(I.Z),[q,N]=(0,C.FV)(P),[O,X]=(0,C.FV)(w.Z),{defaultDark:Y}=(0,y.useContext)(_.Z);(0,v.s)(Y);const H=(0,y.useCallback)(((e,t)=>{"light"!==t&&"dark"!==t&&"device"!==t||U(t)}),[]),K=(0,y.useCallback)(((e,t)=>{N(t)}),[]),$=(0,y.useCallback)((()=>{location.reload()}),[]),ee=(0,y.useCallback)((()=>{b.hide({key:F.Z})}),[b]),te=(0,y.useCallback)(((e,l)=>{X(l),l?(void 0!==t&&n.install(t),b.hide({key:B.Z,safe:!0}),b.hide({key:F.Z,safe:!0})):b.show(y.createElement(L.Z,{leading:y.createElement(a.Z,null,y.createElement(f.Z,null)),text:y.createElement(x.Z,V.aPageReloadIsRequiredForTheConfigurationChangesToTakeEffect),actions:y.createElement(y.Fragment,null,y.createElement(c.Z,{variant:"text",color:"primary",onClick:$},y.createElement(x.Z,V.reload)),y.createElement(c.Z,{variant:"text",color:"primary",onClick:ee},y.createElement(x.Z,V.dontReload)))}),{key:F.Z})}),[n,t,b,$,ee]);return y.createElement(y.Fragment,null,y.createElement(S.Z,{title:e(V.settings)}),y.createElement(l.Z,{container:!0},y.createElement(l.Z,{item:!0,xs:12,sm:6,md:4,lg:3,xl:2},y.createElement(s.Z,{subheader:y.createElement(d.Z,null,y.createElement(x.Z,V.general))},y.createElement(r.Z,{classes:{secondaryAction:z.ListItemSecondaryActionIsLocaleSelect}},y.createElement(i.Z,{primary:y.createElement(x.Z,V.language),id:W}),y.createElement(o.Z,null,y.createElement(T.Z,{hiddenLabel:!0,FormControlProps:{variant:"standard",color:"secondary","aria-labelledby":W}}))))),y.createElement(l.Z,{item:!0,xs:12,sm:6,md:4,lg:3,xl:2},y.createElement(s.Z,{subheader:y.createElement(d.Z,null,y.createElement(x.Z,V.appearance))},y.createElement(r.Z,{classes:{secondaryAction:z.ListItemSecondaryActionIsRadioGroup3}},y.createElement(i.Z,{primary:y.createElement(x.Z,V.theme),id:j}),y.createElement(o.Z,null,y.createElement(p.Z,{row:!0,name:"theme",value:M,onChange:H,"aria-labelledby":j},y.createElement(g.ZP,{title:y.createElement(x.Z,V.useLightTheme)},y.createElement(m.Z,{icon:y.createElement(E.Z,null),checkedIcon:y.createElement(E.Z,null),value:"light"})),y.createElement(g.ZP,{title:y.createElement(x.Z,V.useDarkTheme)},y.createElement(m.Z,{icon:y.createElement(A.Z,null),checkedIcon:y.createElement(A.Z,null),value:"dark"})),y.createElement(g.ZP,{title:y.createElement(x.Z,V.useDeviceTheme)},y.createElement(m.Z,{icon:y.createElement(Z.Z,null),checkedIcon:y.createElement(Z.Z,null),value:"device"}))))),y.createElement(r.Z,{disabled:!document.fullscreenEnabled,classes:{secondaryAction:z.ListItemSecondaryActionIsSwitch}},y.createElement(i.Z,{primary:y.createElement(x.Z,V.fullScreen),id:J}),y.createElement(o.Z,null,y.createElement(u.Z,{checked:q,onChange:K,disabled:!document.fullscreenEnabled,"aria-labelledby":J}))))),y.createElement(l.Z,{item:!0,xs:12,sm:6,md:4,lg:3,xl:2},y.createElement(s.Z,{subheader:y.createElement(d.Z,null,y.createElement(x.Z,V.securityAndPrivacy))},y.createElement(r.Z,{classes:{secondaryAction:z.ListItemSecondaryActionIsSwitch}},y.createElement(i.Z,{primary:y.createElement(x.Z,V.acceptCookies),secondary:y.createElement(x.Z,R.Z.weUseCookiesToAnalyzeOurTraffic),id:Q}),y.createElement(o.Z,null,y.createElement(u.Z,{checked:O,onChange:te,disabled:void 0===t,"aria-labelledby":Q})))))))}))},23010:function(e,t,n){"use strict";var a=n(28889),c=n(79895),l=n(22318),s=n(51206),r=n.n(s),o=n(67294),i=n(31826);const d=r().getParser(navigator.userAgent).is("Mobile");t.Z=({leading:e,text:t,actions:n})=>o.createElement(c.Z,{square:!0,elevation:0},o.createElement(a.Z,{display:"flex",flexWrap:"nowrap",alignItems:d?"flex-start":"center"},void 0!==e&&o.createElement(a.Z,{my:d?3:2,ml:2},e),o.createElement(a.Z,{alignSelf:"stretch",display:"flex",flexGrow:1,alignItems:d?"flex-start":"center",flexWrap:d?"wrap":void 0,gridColumnGap:(d?36:90)-16,gridRowGap:d?(void 0!==e?20:12)-10:void 0},o.createElement(a.Z,{mt:d?3:2,mb:d?void 0:2,ml:d?2:3,mr:1},o.createElement(l.Z,{variant:"body2"},t)),o.createElement(a.Z,{alignSelf:"flex-end",display:"flex",flexGrow:1},o.createElement(i.Z,null),o.createElement(a.Z,{mt:d?1.25:1,mx:1,mb:1,display:"flex",gridColumnGap:8},n)))))},98253:function(e,t,n){"use strict";var a=n(85315);t.Z=(0,a.vU)({weUseCookiesToAnalyzeOurTraffic:{id:"src.components.ObtainCookieConsentBanner.weUseCookiesToAnalyzeOurTraffic",defaultMessage:"We use cookies to analyze our traffic."},agree:{id:"src.components.ObtainCookieConsentBanner.agree",defaultMessage:"Agree"},cancel:{id:"src.components.ObtainCookieConsentBanner.cancel",defaultMessage:"Cancel"}})},60661:function(e,t,n){"use strict";const a=(0,n(44586).Z)();t.Z=a},79388:function(e,t,n){"use strict";const a=(0,n(44586).Z)();t.Z=a},14069:function(e,t,n){"use strict";var a=n(2804),c=n(44586),l=n(95929),s=n(78607);t.Z=()=>({show:(0,a._8)((({set:e})=>(t,n)=>{var a,l;const r=null!==(a=null==n?void 0:n.key)&&void 0!==a?a:(0,c.Z)(),o=null!==(l=null==n?void 0:n.replaceable)&&void 0!==l&&l;return e(s.Z,{banner:t,key:r,replaceable:o}),r})),hide:(0,a._8)((({set:e})=>t=>{var n;const a=null==t?void 0:t.key,c=null!==(n=null==t?void 0:t.safe)&&void 0!==n&&n;void 0===a?e(s.Z,(e=>{if(null===e&&!c)throw new Error("No banner found.");return null})):e(l.Z,(e=>{const t=e.findIndex((e=>e.key===a));if(-1===t&&!c)throw new Error("No banner found.");return-1!==t?[...e.slice(0,t),...e.slice(t+1)]:e}))}))})},32638:function(e,t,n){"use strict";var a=n(94015),c=n.n(a),l=n(23645),s=n.n(l)()(c());s.push([e.id,".src-components-App-SettingsPage-classes__ListItemSecondaryActionIsLocaleSelect--JXsoD {\n  -webkit-padding-end: 104.46666667px;\n          padding-inline-end: 104.46666667px; /* 元々の値 (48px) + LocaleSelect の最大幅 (locale: English) (98.46666667px) - Checkbox の幅 (42px) */\n}\n\n.src-components-App-SettingsPage-classes__ListItemSecondaryActionIsRadioGroup3--iQBN6 {\n  -webkit-padding-end: 132px;\n          padding-inline-end: 132px; /* 元々の値 (48px) + RadioGroup>Radio*3 の幅 (126px) - Checkbox の幅 (42px) */\n}\n\n.src-components-App-SettingsPage-classes__ListItemSecondaryActionIsSwitch--1pbgU {\n  -webkit-padding-end: 64px;\n          padding-inline-end: 64px; /* 元々の値 (48px) + Switch の幅 (58px) - Checkbox の幅 (42px) */\n}\n","",{version:3,sources:["webpack://./src/components/App/SettingsPage/classes.css"],names:[],mappings:"AAAA;EACE,mCAAkC;UAAlC,kCAAkC,EAAE,2FAA2F;AACjI;;AAEA;EACE,0BAAyB;UAAzB,yBAAyB,EAAE,qEAAqE;AAClG;;AAEA;EACE,yBAAwB;UAAxB,wBAAwB,EAAE,wDAAwD;AACpF",sourcesContent:[".ListItemSecondaryActionIsLocaleSelect {\n  padding-inline-end: 104.46666667px; /* 元々の値 (48px) + LocaleSelect の最大幅 (locale: English) (98.46666667px) - Checkbox の幅 (42px) */\n}\n\n.ListItemSecondaryActionIsRadioGroup3 {\n  padding-inline-end: 132px; /* 元々の値 (48px) + RadioGroup>Radio*3 の幅 (126px) - Checkbox の幅 (42px) */\n}\n\n.ListItemSecondaryActionIsSwitch {\n  padding-inline-end: 64px; /* 元々の値 (48px) + Switch の幅 (58px) - Checkbox の幅 (42px) */\n}\n"],sourceRoot:""}]),s.locals={ListItemSecondaryActionIsLocaleSelect:"src-components-App-SettingsPage-classes__ListItemSecondaryActionIsLocaleSelect--JXsoD",ListItemSecondaryActionIsRadioGroup3:"src-components-App-SettingsPage-classes__ListItemSecondaryActionIsRadioGroup3--iQBN6",ListItemSecondaryActionIsSwitch:"src-components-App-SettingsPage-classes__ListItemSecondaryActionIsSwitch--1pbgU"},t.Z=s}}]);
//# sourceMappingURL=settings.1f7a39bf.js.map