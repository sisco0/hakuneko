import Connector from '../engine/Connector.mjs';

export default class TuMangaOnline extends Connector {

    constructor() {
        super();
        super.id = 'tumangaonline';
        super.label = 'TuMangaOnline';
        this.tags = [ 'manga', 'spanish' ];
        this.url = 'https://tmofans.com';
        this.requestOptions.headers.set('x-referer', this.url);
    }

    async _initializeConnector() {
        let domains = [
            this.url
            //'https://img1.tumangaonline.me'
        ];
        let promises = domains.map( domain => {
            /*
             * sometimes cloudflare bypass will fail, because chrome successfully loads the page from its cache
             * => append random search parameter to avoid caching
             */
            let uri = new URL( domain );
            uri.searchParams.set( 'ts', Date.now() );
            uri.searchParams.set( 'rd', Math.random() );
            let request = new Request( uri.href, this.requestOptions );
            return Engine.Request.fetchUI( request, '', 25000 );
        } );
        return Promise.all( promises );
    }

    async _getMangas() {
        let request = new Request('http://cdn.hakuneko.download/' + this.id + '/mangas.json', this.requestOptions);
        let response = await fetch(request);
        return await response.json();
    }

    async _getChapters(manga) {
        let script = `
            // Deobfuscated source (secret): https://gist.github.com
            var _0x237d=['U8K3w6Ih','w5NvFMKV','Ghhrw6HCjA==','b8Ozwq7Do1E=','aV5sRcKe','NShd','GQ4Fw6sm','w4xnw4A6KsO4w5c=','AyAocMOW','wppuP0g/w6XCs8Kiw4XDgcKrwrHCug==','asO9YQdPw5nChsKTwp3Cijo=','DhAFw6U=','w4R8w4J3PQ==','wp5pDy7Dhw==','w4wcFzcA','w5TDoB4=','w6kWwp7DoA==','asOqcB4=','dh7CncK0wrc=','HcKDc150','wqpSKU4k','BkYK','Zltqw5dHM8KRRsKx','w4PCh8KTw7/ClQ==','QlxNw4dM','w518Zg==','w5d4H8KUwoED','wo1MwoFC','PHTCmw==','Kmk4wp5R','w5LDlEnCosOO','PMOXQClB','SsOiwpPDh3zDvg==','w6RqX8KQEcKGwqPDsMOqwqU=','w7ESwojDs8KPw6TCiCwx','w5R3B3zCrg==','Lk8rwoht','wpF3wrxoMA==','dG9gw7zCmA==','b2hdw4I=','wqRGDyfDnQ==','wrYyNsO8w5fCmUDDuMKoc8Ktw7Y4w4I=','wqFew7kZw5Q=','cV5/w4hRDg==','w57DrcOdwonDiA==','O8KXwoDCjMK9','wo9yLBQlw57Ct8K+w5TDh8Ktwq3DqDDCncO+asOVw7zCpMKCwrkueS5Xw5vCiUwdwr0mRnHCiMOucQc=','P0YOwqNp','w4d7dMO0w6glwpU/UsK6','wod1IhXDpg==','w7fDs33DmMOUOFtVw5DDiWfCgsKNwpLCqMOvP8KOfwhPC8Kbw7gAw4kgwq8Vw6cGKcO0wrXDicKLEMKXwrU/FGzDg2fCtMOiwqbDqXp9w5lGdFXCr8O0LcOMK8KcZwIKw4QXwrfCng==','w6Ywwo9fXg==','w5h5e8O9w7ElwoY1Uw==','bgDCrMKdw7A=','R8Krw6dnwppcwqPCosKTwrLCpsONw5jCn8KqwoDDhCc3KggXZGnDvMOiwr7CusOlw4ETNAfDrcOew4AVwoUdwoTDqMKkw7/CqsO1HAwpOsKgwpQNDGkaewkiYg==','w7NzU8O5w7w=','RCjChsKkwqk=','FsKybHla','TEhKw4lP','PcKWwp4=','wp5LwpdLJcKvERsBwozClWkD','ZFJvQw==','w7R7W8KfCcKCwpLDs8O9wrtiWj0=','WRnCsxhM','JBDCmm/Dpw==','w6PDm8OawoPDoQ==','N8KReA8k','wo8HwpDDqMKjcQ==','w4/ChcKTw7XCksKx','KyxMw7DCiMK3','w4RQbMKtPw==','w5xuw50gLsOnw4onw4c=','D8KTWA=='];(function(_0x33f7ac,_0x30f437){var _0xd6137b=function(_0x460f9c){while(--_0x460f9c){_0x33f7ac['push'](_0x33f7ac['shift']());}};_0xd6137b(++_0x30f437);}(_0x237d,0x1da));var _0x125a=function(_0x213ca2,_0x568e6a){_0x213ca2=_0x213ca2-0x0;var _0x519748=_0x237d[_0x213ca2];if(_0x125a['iaTaZW']===undefined){(function(){var _0x4b510a;try{var _0xe23ab0=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');_0x4b510a=_0xe23ab0();}catch(_0x4d198d){_0x4b510a=window;}var _0x55b403='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x4b510a['atob']||(_0x4b510a['atob']=function(_0xcef3a4){var _0xf29856=String(_0xcef3a4)['replace'](/=+$/,'');for(var _0x38761d=0x0,_0x5a9aaf,_0x19b01f,_0x75c54c=0x0,_0x551da2='';_0x19b01f=_0xf29856['charAt'](_0x75c54c++);~_0x19b01f&&(_0x5a9aaf=_0x38761d%0x4?_0x5a9aaf*0x40+_0x19b01f:_0x19b01f,_0x38761d++%0x4)?_0x551da2+=String['fromCharCode'](0xff&_0x5a9aaf>>(-0x2*_0x38761d&0x6)):0x0){_0x19b01f=_0x55b403['indexOf'](_0x19b01f);}return _0x551da2;});}());var _0x44634f=function(_0x44905b,_0x568e6a){var _0x13ec6e=[],_0x2cde66=0x0,_0x1812d9,_0x51601e='',_0x403426='';_0x44905b=atob(_0x44905b);for(var _0x2b2288=0x0,_0x838af5=_0x44905b['length'];_0x2b2288<_0x838af5;_0x2b2288++){_0x403426+='%'+('00'+_0x44905b['charCodeAt'](_0x2b2288)['toString'](0x10))['slice'](-0x2);}_0x44905b=decodeURIComponent(_0x403426);for(var _0x28ac61=0x0;_0x28ac61<0x100;_0x28ac61++){_0x13ec6e[_0x28ac61]=_0x28ac61;}for(_0x28ac61=0x0;_0x28ac61<0x100;_0x28ac61++){_0x2cde66=(_0x2cde66+_0x13ec6e[_0x28ac61]+_0x568e6a['charCodeAt'](_0x28ac61%_0x568e6a['length']))%0x100;_0x1812d9=_0x13ec6e[_0x28ac61];_0x13ec6e[_0x28ac61]=_0x13ec6e[_0x2cde66];_0x13ec6e[_0x2cde66]=_0x1812d9;}_0x28ac61=0x0;_0x2cde66=0x0;for(var _0x1deab3=0x0;_0x1deab3<_0x44905b['length'];_0x1deab3++){_0x28ac61=(_0x28ac61+0x1)%0x100;_0x2cde66=(_0x2cde66+_0x13ec6e[_0x28ac61])%0x100;_0x1812d9=_0x13ec6e[_0x28ac61];_0x13ec6e[_0x28ac61]=_0x13ec6e[_0x2cde66];_0x13ec6e[_0x2cde66]=_0x1812d9;_0x51601e+=String['fromCharCode'](_0x44905b['charCodeAt'](_0x1deab3)^_0x13ec6e[(_0x13ec6e[_0x28ac61]+_0x13ec6e[_0x2cde66])%0x100]);}return _0x51601e;};_0x125a['AzbrSu']=_0x44634f;_0x125a['UsZJbm']={};_0x125a['iaTaZW']=!![];}var _0x3d0c90=_0x125a['UsZJbm'][_0x213ca2];if(_0x3d0c90===undefined){if(_0x125a['mRrLSP']===undefined){_0x125a['mRrLSP']=!![];}_0x519748=_0x125a['AzbrSu'](_0x519748,_0x568e6a);_0x125a['UsZJbm'][_0x213ca2]=_0x519748;}else{_0x519748=_0x3d0c90;}return _0x519748;};new Promise(_0x31007c=>{var _0x1f6012={};_0x1f6012[_0x125a('0x0','oygO')]=function(_0x23fc72,_0x1cdacf){return _0x23fc72(_0x1cdacf);};_0x1f6012[_0x125a('0x1','XLbI')]=function(_0x5ea4f6,_0x4f20d8){return _0x5ea4f6===_0x4f20d8;};_0x1f6012[_0x125a('0x2','f18(')]=_0x125a('0x3','6H2o');_0x1f6012[_0x125a('0x4','Dd2[')]=_0x125a('0x5','V$5c');_0x1f6012[_0x125a('0x6','J[l3')]=_0x125a('0x7','jDVt');_0x1f6012[_0x125a('0x8','!X9e')]=function(_0x2528c8,_0x291037){return _0x2528c8(_0x291037);};_0x1f6012[_0x125a('0x9','7KH&')]=_0x125a('0xa','a]*9');_0x1f6012[_0x125a('0xb','oygO')]=_0x125a('0xc','2Vj%');_0x1f6012[_0x125a('0xd','Dd2[')]=_0x125a('0xe','Xu!r');_0x1f6012[_0x125a('0xf','@PdZ')]=_0x125a('0x10','2Vj%');_0x1f6012[_0x125a('0x11','q(3L')]=_0x125a('0x12','y$Hf');_0x1f6012[_0x125a('0x13','2Vj%')]=function(_0x2b57c7,_0x3994b1){return _0x2b57c7<_0x3994b1;};_0x1f6012[_0x125a('0x14','Axw*')]=function(_0x2a356d,_0x36ff44){return _0x2a356d+_0x36ff44;};_0x1f6012[_0x125a('0x15','Cx4O')]=function(_0x169a5e,_0x477f4d){return _0x169a5e+_0x477f4d;};_0x1f6012[_0x125a('0x16','6H2o')]=function(_0x3e2eb5,_0x4174db){return _0x3e2eb5(_0x4174db);};let _0x106a76={};_0x106a76[_0x125a('0x17','7KH&')]=[];let _0x589c3c=document[_0x125a('0x18','XLbI')][_0x125a('0x19','Q$9x')](document);document[_0x125a('0x1a','EEHJ')]=_0x25ebe1=>{var _0x18083f={};_0x18083f[_0x125a('0x1b','6FH*')]=function(_0x287cb8,_0x20fdbb){return _0x1f6012.EhQBE(_0x287cb8,_0x20fdbb);};let _0x2e6357=_0x1f6012[_0x125a('0x1c','wqNv')](_0x589c3c,_0x25ebe1);if(_0x1f6012[_0x125a('0x1d','!X9e')](_0x25ebe1,_0x1f6012[_0x125a('0x1e','&fk1')])){_0x2e6357[_0x125a('0x1f','LM1J')]=()=>{let _0x42513a=new URL(_0x2e6357[_0x125a('0x20','n3qs')]);_0x42513a[_0x125a('0x21','5oaA')]=_0x18083f[_0x125a('0x22','EEHJ')]($,_0x2e6357)[_0x125a('0x23','FfMN')]();_0x106a76[_0x125a('0x24','&fk1')][_0x125a('0x25','y$Hf')](_0x42513a[_0x125a('0x26','(xTg')]);};}return _0x2e6357;};_0x106a76[_0x1f6012[_0x125a('0x27','5oaA')]]=[..._0x1f6012[_0x125a('0x28','jAxo')]($,_0x1f6012[_0x125a('0x29','Q$9x')])][_0x125a('0x2a','5oaA')](_0x41af13=>{_0x41af13[_0x125a('0x2b','tv35')]();return _0x41af13[_0x125a('0x2c','FfMN')](_0x1f6012[_0x125a('0x2d','UElW')])[_0x125a('0x2e','a]*9')]('h4')[_0x125a('0x2f','TOgw')][_0x125a('0x30','tv35')]();});_0x106a76[_0x1f6012[_0x125a('0x31','n3Ao')]]=[..._0x1f6012[_0x125a('0x32','Dd2[')]($,_0x1f6012[_0x125a('0x33','(1xj')])][_0x125a('0x34','2ajP')](_0x20231a=>_0x20231a[_0x125a('0x35','wAF^')][_0x125a('0x36','TOgw')]());_0x106a76[_0x1f6012[_0x125a('0x37','Axw*')]]=[..._0x1f6012[_0x125a('0x38','Cx4O')]($,_0x1f6012[_0x125a('0x39','a]*9')])][_0x125a('0x3a','oygO')](_0x5a44f7=>_0x5a44f7[_0x125a('0x3b','jDVt')][_0x125a('0x3c','n3qs')](/flag-icon-([a-z]+)/)[0x1]);let _0x21fd6f=[];for(let _0x5b581c=0x0;_0x1f6012[_0x125a('0x3d','jDVt')](_0x5b581c,_0x106a76[_0x125a('0x3e','2Vj%')][_0x125a('0x3f','(xTg')]);_0x5b581c++){_0x21fd6f[_0x125a('0x40','XLbI')]({'id':_0x106a76[_0x125a('0x41','b[rs')][_0x5b581c],'title':_0x1f6012[_0x125a('0x42','oygO')](_0x1f6012[_0x125a('0x43','Xu!r')](_0x1f6012[_0x125a('0x44','cv1Z')](_0x106a76[_0x125a('0x45','jAxo')][_0x5b581c],'\x20['),_0x106a76[_0x125a('0x46','EEHJ')][_0x5b581c]),']'),'language':_0x106a76[_0x125a('0x47','wAF^')][_0x5b581c]});}_0x1f6012[_0x125a('0x48','*L2i')](_0x31007c,_0x21fd6f);});
        `;
        let request = new Request(this.url + manga.id, this.requestOptions);
        let data = await Engine.Request.fetchUI(request, script);
        data.forEach(chapter => chapter.id = this.getRootRelativeOrAbsoluteLink(chapter.id, request.url));
        return data;
    }

    async _getPages(chapter) {
        let script = `
            window['uri'] = new URL('${chapter.id}', '${this.url}');
            // Deobfuscated source (secret): https://gist.github.com
            var _0x1d93=['eMKdw4zDm2c=','I2R3woJK','w7gxb8OK','ecKtaMK6wqM=','w7HDqsOY','acOaQw==','U8OLMcKWXQ==','WxPCkRTDhA==','AU9tw5lkwpDDvxUIKsKhw4Q7worDiB/DqcKEasO9f8K3I2MYZ34Gw6DCjS/Cjy/CscK7VMKFX8O0V8O/wq8VW0jDnh5UaHJ8IVo2FsOYw7/DkMK/W8OBwqoWaw==','wptab8O2wp8=','Jwx4w5U8','woLDnMOtwr/DscK5M8KUb8K9AQhCw6Qxw5xnwp/Cl8OcwpDCqsOQw7rDvEVG','LsO6cyrDhA==','wpkpNzPDsg==','fXYiw5kT','b8OaSQ==','N0Mhw4DDrw==','JHl3Ow==','dcKaSMKf','TDPCtSXDlsOQ','d3wBw6Mj','dnwYw5c=','wq3Cm8K2wonCkQ==','AFxmAcKZ','CUN1wp1mwpE=','eMKRw48=','w7PCmyZ1','w4FOA8KKXA==','w7HClRcUw6w=','fnrCrUA=','dFAzw7Ak','axPClA==','w6/DucOL'];(function(_0x11f143,_0x4b7ec6){var _0x2be202=function(_0x14903c){while(--_0x14903c){_0x11f143['push'](_0x11f143['shift']());}};_0x2be202(++_0x4b7ec6);}(_0x1d93,0x1b3));var _0x4d12=function(_0x57280a,_0xef50a4){_0x57280a=_0x57280a-0x0;var _0x245ae6=_0x1d93[_0x57280a];if(_0x4d12['EWGeuV']===undefined){(function(){var _0x3383bc;try{var _0x5c1fba=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');_0x3383bc=_0x5c1fba();}catch(_0x5e9843){_0x3383bc=window;}var _0x14c408='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x3383bc['atob']||(_0x3383bc['atob']=function(_0x17125b){var _0x592882=String(_0x17125b)['replace'](/=+$/,'');for(var _0x35d32f=0x0,_0x35f397,_0x4e0390,_0x2f7e41=0x0,_0x2f6ce6='';_0x4e0390=_0x592882['charAt'](_0x2f7e41++);~_0x4e0390&&(_0x35f397=_0x35d32f%0x4?_0x35f397*0x40+_0x4e0390:_0x4e0390,_0x35d32f++%0x4)?_0x2f6ce6+=String['fromCharCode'](0xff&_0x35f397>>(-0x2*_0x35d32f&0x6)):0x0){_0x4e0390=_0x14c408['indexOf'](_0x4e0390);}return _0x2f6ce6;});}());var _0x284f6d=function(_0x465a8e,_0xef50a4){var _0x2dd3c9=[],_0x2e92f5=0x0,_0xd76219,_0x375390='',_0x244934='';_0x465a8e=atob(_0x465a8e);for(var _0x41f653=0x0,_0x3f81b5=_0x465a8e['length'];_0x41f653<_0x3f81b5;_0x41f653++){_0x244934+='%'+('00'+_0x465a8e['charCodeAt'](_0x41f653)['toString'](0x10))['slice'](-0x2);}_0x465a8e=decodeURIComponent(_0x244934);for(var _0x4c0e63=0x0;_0x4c0e63<0x100;_0x4c0e63++){_0x2dd3c9[_0x4c0e63]=_0x4c0e63;}for(_0x4c0e63=0x0;_0x4c0e63<0x100;_0x4c0e63++){_0x2e92f5=(_0x2e92f5+_0x2dd3c9[_0x4c0e63]+_0xef50a4['charCodeAt'](_0x4c0e63%_0xef50a4['length']))%0x100;_0xd76219=_0x2dd3c9[_0x4c0e63];_0x2dd3c9[_0x4c0e63]=_0x2dd3c9[_0x2e92f5];_0x2dd3c9[_0x2e92f5]=_0xd76219;}_0x4c0e63=0x0;_0x2e92f5=0x0;for(var _0x99fd2=0x0;_0x99fd2<_0x465a8e['length'];_0x99fd2++){_0x4c0e63=(_0x4c0e63+0x1)%0x100;_0x2e92f5=(_0x2e92f5+_0x2dd3c9[_0x4c0e63])%0x100;_0xd76219=_0x2dd3c9[_0x4c0e63];_0x2dd3c9[_0x4c0e63]=_0x2dd3c9[_0x2e92f5];_0x2dd3c9[_0x2e92f5]=_0xd76219;_0x375390+=String['fromCharCode'](_0x465a8e['charCodeAt'](_0x99fd2)^_0x2dd3c9[(_0x2dd3c9[_0x4c0e63]+_0x2dd3c9[_0x2e92f5])%0x100]);}return _0x375390;};_0x4d12['TdZRln']=_0x284f6d;_0x4d12['NZZfti']={};_0x4d12['EWGeuV']=!![];}var _0x3d4f70=_0x4d12['NZZfti'][_0x57280a];if(_0x3d4f70===undefined){if(_0x4d12['ptIhgy']===undefined){_0x4d12['ptIhgy']=!![];}_0x245ae6=_0x4d12['TdZRln'](_0x245ae6,_0xef50a4);_0x4d12['NZZfti'][_0x57280a]=_0x245ae6;}else{_0x245ae6=_0x3d4f70;}return _0x245ae6;};new Promise(_0x5e9874=>{var _0x15a9b9={};_0x15a9b9[_0x4d12('0x0','Rhd#')]=function(_0x262052,_0x209edd){return _0x262052(_0x209edd);};_0x15a9b9[_0x4d12('0x1','Kd9W')]=_0x4d12('0x2','lSMD');_0x15a9b9[_0x4d12('0x3','zzsA')]=function(_0x467189,_0xc5bbb8){return _0x467189(_0xc5bbb8);};_0x15a9b9[_0x4d12('0x4','AOOR')]=_0x4d12('0x5','!H@q');_0x15a9b9[_0x4d12('0x6','#gOo')]=function(_0x6fa15e,_0x4f5eb2){return _0x6fa15e>_0x4f5eb2;};_0x15a9b9[_0x4d12('0x7','#1ac')]=function(_0x45cf20,_0x96ab70){return _0x45cf20(_0x96ab70);};_0x15a9b9[_0x4d12('0x8','xdHu')]=_0x4d12('0x9','ANiv');let _0x13e34f=window[_0x15a9b9[_0x4d12('0xa','f)6y')]];$[_0x4d12('0xb','ygV7')](_0x13e34f[_0x4d12('0xc','qY#G')],_0x13e34f[_0x4d12('0xd','Kd9W')],_0xda0b90=>{let _0x436bf2=_0x15a9b9[_0x4d12('0xe','xdHu')]($,_0xda0b90)[_0x4d12('0xf','xdHu')](_0x15a9b9[_0x4d12('0x10','PYrE')]);if(_0x15a9b9[_0x4d12('0x11','ygV7')](_0x436bf2[_0x4d12('0x12','lSMD')],0x0)){$[_0x4d12('0x13','h*vI')](_0x436bf2[0x0][_0x4d12('0x14','1kVe')],_0xda0b90=>{_0x15a9b9[_0x4d12('0x15','^VLV')](_0x5e9874,[..._0x15a9b9[_0x4d12('0x16','@1GQ')]($,_0xda0b90)[_0x4d12('0x17','TAJ7')](_0x15a9b9[_0x4d12('0x18','xdHu')])][_0x4d12('0x19','PjFi')](_0x1951aa=>_0x1951aa[_0x4d12('0x1a','sjX#')]));});}else{_0x15a9b9[_0x4d12('0x1b','h*vI')](_0x5e9874,[..._0x15a9b9[_0x4d12('0x1c','lSMD')]($,_0xda0b90)[_0x4d12('0x1d','s4J)')](_0x15a9b9[_0x4d12('0x1e','qY#G')])][_0x4d12('0x1f','sjX#')](_0x31f6b9=>_0x31f6b9[_0x4d12('0x20','ANiv')]));}});});
        `;
        let request = new Request(this.url + chapter.manga.id, this.requestOptions);
        let data = await Engine.Request.fetchUI(request, script);
        return data.map(img => this.createConnectorURI({
            url: this.getAbsolutePath(img, request.url),
            referer: request.url
        }));
    }

    _handleConnectorURI( payload ) {
        /*
         * TODO: only perform requests when from download manager
         * or when from browser for preview and selected chapter matches
         */
        this.requestOptions.headers.set( 'x-referer', payload.referer );
        let promise = super._handleConnectorURI( payload.url );
        this.requestOptions.headers.delete( 'x-referer' );
        return promise;
    }
}