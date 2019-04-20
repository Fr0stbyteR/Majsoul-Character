export const name = "12dora";
export const id = 300001;
export const skinID = 500101;
export const voiceID = 9;
export const charDef = {
    id,
    name,
    open: 1,
    init_skin: skinID,
    full_fetter_skin: skinID,
    favorite: 1,
    star_5_material: "302006-10,302009-10,303013-5,302002-10,302004-100",
    star_5_cost: 0,
    can_marry: 1,
    exchange_item_id: 302002,
    exchange_item_num: 75,
    emo: "extendRes/emo/e" + id,
    sound: voiceID,
    sound_volume: 0.4,
    sex: 0,
    desc_stature: "180厘米",
    desc_birth: "3月3日",
    desc_age: "17",
    desc_bloodtype: "AB",
    desc_cv: "12",
    desc_hobby: "玩游戏，去漫展",
    desc: "七对子能力者。人称大当家，12team创始人。",
    skin_lib: [0, 0, 0]
};
export const skinDef = {
    name,
    id: skinID,
    desc: "12dora的初始形象",
    character_id: id,
    lock_tips: "",
    path: "extendRes/charactor/" + name,
    exchange_item_id: 302002,
    exchange_item_num: 60,
    full_height: 2672,
    full_width: 2008,
    full_x: 1112,
    full_y: 320,
    half_width: 1357,
    half_height: 1094,
    half_x: 1301,
    half_y: 720,
    smallhead_width: 430,
    smallhead_height: 430,
    smallhead_x: 1219,
    smallhead_y: 184,
    face_width: 328,
    face_height: 328,
    face_x: 1281,
    face_y: 239
};
export const voiceDef = [{
    id: voiceID,
    name: "吃",
    words: "吃",
    category: 2,
    type: "act_chi",
    level_limit: 0,
    time_length: 1000,
    path: "audio/sound/" + name + "/act_chi"
}, {
    id: voiceID,
    name: "杠",
    words: "杠",
    category: 2,
    type: "act_kan",
    level_limit: 0,
    time_length: 1000,
    path: "audio/sound/" + name + "/act_kan"
}, {
    id: voiceID,
    name: "碰",
    words: "碰",
    category: 2,
    type: "act_pon",
    level_limit: 0,
    time_length: 1000,
    path: "audio/sound/" + name + "/act_pon"
}, {
    id: voiceID,
    name: "拔北",
    words: "拔北",
    category: 2,
    type: "act_babei",
    level_limit: 0,
    time_length: 1000,
    path: "audio/sound/" + name + "/act_babei"
}, {
    id: voiceID,
    name: "两立直",
    words: "两立直",
    category: 2,
    type: "act_drich",
    level_limit: 0,
    time_length: 1000,
    path: "audio/sound/" + name + "/act_drich"
}, {
    id: voiceID,
    name: "立直",
    words: "立直",
    category: 2,
    type: "act_rich",
    level_limit: 0,
    time_length: 1000,
    path: "audio/sound/" + name + "/act_rich"
}, {
    id: voiceID,
    name: "荣",
    words: "荣",
    category: 2,
    type: "act_ron",
    level_limit: 0,
    time_length: 1000,
    path: "audio/sound/" + name + "/act_ron"
}, {
    id: voiceID,
    name: "自摸",
    words: "自摸",
    category: 2,
    type: "act_tumo",
    level_limit: 0,
    time_length: 1000,
    path: "audio/sound/" + name + "/act_tumo"
}, {
    id: voiceID,
    name: "终局一位语音",
    words: "哼...菜B",
    category: 2,
    type: "game_top",
    level_limit: 1,
    time_length: 1000,
    path: "audio/sound/" + name + "/game_top"
}, {
    id: voiceID,
    name: "获得语音",
    words: "兄弟借个火",
    category: 1,
    type: "lobby_selfintro",
    level_limit: 0,
    time_length: 1000,
    path: "audio/sound/" + name + "/lobby_selfintro"
}, {
    id: voiceID,
    name: "登录语音普通",
    words: "小伙子今天看直播了吗...",
    category: 1,
    type: "lobby_playerlogin",
    level_limit: 0,
    time_length: 1000,
    path: "audio/sound/" + name + "/lobby_playerlogin"
}, {
    id: voiceID,
    name: "登录语音满羁绊",
    words: "小伙子再不来看直播老子就失业了...",
    category: 1,
    type: "lobby_playerlogin",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/lobby_playerlogin_max"
}, {
    id: voiceID,
    name: "大厅交互语音1",
    words: "草 垃圾游戏",
    category: 1,
    type: "lobby_normal",
    level_limit: 0,
    time_length: 1000,
    path: "audio/sound/" + name + "/lobby_normal1"
}, {
    id: voiceID,
    name: "大厅交互语音2",
    words: "草 真的没法玩",
    category: 1,
    type: "lobby_normal",
    level_limit: 0,
    time_length: 1000,
    path: "audio/sound/" + name + "/lobby_normal2"
}, {
    id: voiceID,
    name: "大厅交互语音3",
    words: "草 好难阿",
    category: 1,
    type: "lobby_normal",
    level_limit: 1,
    time_length: 1000,
    path: "audio/sound/" + name + "/lobby_normal3"
}, {
    id: voiceID,
    name: "大厅交互语音4",
    words: "草 再不来斗鱼12666看直播老子失业了",
    category: 1,
    type: "lobby_normal",
    level_limit: 2,
    time_length: 1000,
    path: "audio/sound/" + name + "/lobby_normal4"
}, {
    id: voiceID,
    name: "大厅交互语音5",
    words: "草",
    category: 1,
    type: "lobby_normal",
    level_limit: 3,
    time_length: 1000,
    path: "audio/sound/" + name + "/lobby_normal5"
}, {
    id: voiceID,
    name: "大厅交互语音6",
    words: "LYC是条狗",
    category: 1,
    type: "lobby_normal",
    level_limit: 4,
    time_length: 1000,
    path: "audio/sound/" + name + "/lobby_normalmax1"
}, {
    id: voiceID,
    name: "大厅交互语音7",
    words: "LYC小脑不发达",
    category: 1,
    type: "lobby_normal",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/lobby_normalmax2"
}, {
    id: voiceID,
    name: "大厅交互语音8",
    words: "LYC是我最差的一个儿子",
    category: 1,
    type: "lobby_normal",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/lobby_normalmax3"
}, {
    id: voiceID,
    name: "送礼物语音普通",
    words: "谢谢啊",
    category: 1,
    type: "lobby_gift",
    level_limit: 0,
    time_length: 1000,
    path: "audio/sound/" + name + "/lobby_gift"
}, {
    id: voiceID,
    name: "送礼物语音喜好",
    words: "谢谢啊！",
    category: 1,
    type: "lobby_gift_favor",
    level_limit: 0,
    time_length: 1000,
    path: "audio/sound/" + name + "/lobby_gift_favor"
}, {
    id: voiceID,
    name: "好感度升级语音1",
    words: "嗯...可以的",
    category: 1,
    type: "lobby_levelup1",
    level_limit: 2,
    time_length: 1000,
    path: "audio/sound/" + name + "/lobby_levelup1"
}, {
    id: voiceID,
    name: "好感度升级语音2",
    words: "嗯...你可以的",
    category: 1,
    type: "lobby_levelup2",
    level_limit: 3,
    time_length: 1000,
    path: "audio/sound/" + name + "/lobby_levelup2"
}, {
    id: voiceID,
    name: "好感度升级语音3",
    words: "嗯...你真的可以的",
    category: 1,
    type: "lobby_levelup3",
    level_limit: 4,
    time_length: 1000,
    path: "audio/sound/" + name + "/lobby_levelup3"
}, {
    id: voiceID,
    name: "好感度升级语音4",
    words: "嗯...你这个小伙子非常非常可以",
    category: 1,
    type: "lobby_levelmax",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/lobby_levelmax"
}, {
    id: voiceID,
    name: "枪杠",
    words: "枪杠",
    category: 2,
    type: "fan_qianggang",
    level_limit: 5,
    time_length: 1200,
    path: "audio/sound/" + name + "/fan_qianggang"
}, {
    id: voiceID,
    name: "岭上开花",
    words: "岭上开花",
    category: 2,
    type: "fan_lingshang",
    level_limit: 5,
    time_length: 1500,
    path: "audio/sound/" + name + "/fan_lingshang"
}, {
    id: voiceID,
    name: "海底摸月",
    words: "海底摸月",
    category: 2,
    type: "fan_haidi",
    level_limit: 5,
    time_length: 1500,
    path: "audio/sound/" + name + "/fan_haidi"
}, {
    id: voiceID,
    name: "河底捞鱼",
    words: "河底捞鱼",
    category: 2,
    type: "fan_hedi",
    level_limit: 5,
    time_length: 1500,
    path: "audio/sound/" + name + "/fan_hedi"
}, {
    id: voiceID,
    name: "东",
    words: "东",
    category: 2,
    type: "fan_dong",
    level_limit: 5,
    time_length: 600,
    path: "audio/sound/" + name + "/fan_dong"
}, {
    id: voiceID,
    name: "南",
    words: "南",
    category: 2,
    type: "fan_nan",
    level_limit: 5,
    time_length: 600,
    path: "audio/sound/" + name + "/fan_nan"
}, {
    id: voiceID,
    name: "西",
    words: "西",
    category: 2,
    type: "fan_xi",
    level_limit: 5,
    time_length: 600,
    path: "audio/sound/" + name + "/fan_xi"
}, {
    id: voiceID,
    name: "北",
    words: "北",
    category: 2,
    type: "fan_bei",
    level_limit: 5,
    time_length: 600,
    path: "audio/sound/" + name + "/fan_bei"
}, {
    id: voiceID,
    name: "中",
    words: "中",
    category: 2,
    type: "fan_zhong",
    level_limit: 5,
    time_length: 600,
    path: "audio/sound/" + name + "/fan_zhong"
}, {
    id: voiceID,
    name: "白",
    words: "白",
    category: 2,
    type: "fan_bai",
    level_limit: 5,
    time_length: 600,
    path: "audio/sound/" + name + "/fan_bai"
}, {
    id: voiceID,
    name: "发",
    words: "发",
    category: 2,
    type: "fan_fa",
    level_limit: 5,
    time_length: 600,
    path: "audio/sound/" + name + "/fan_fa"
}, {
    id: voiceID,
    name: "连东",
    words: "连东",
    category: 2,
    type: "fan_doubledong",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_doubledong"
}, {
    id: voiceID,
    name: "连南",
    words: "连南",
    category: 2,
    type: "fan_doublenan",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_doublenan"
}, {
    id: voiceID,
    name: "连西",
    words: "连西",
    category: 2,
    type: "fan_doublexi",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_doublexi"
}, {
    id: voiceID,
    name: "连北",
    words: "连北",
    category: 2,
    type: "fan_doublebei",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_doublebei"
}, {
    id: voiceID,
    name: "断幺",
    words: "断幺",
    category: 2,
    type: "fan_duanyao",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_duanyao"
}, {
    id: voiceID,
    name: "一杯口",
    words: "一杯口",
    category: 2,
    type: "fan_yibeikou",
    level_limit: 5,
    time_length: 1500,
    path: "audio/sound/" + name + "/fan_yibeikou"
}, {
    id: voiceID,
    name: "平和",
    words: "平和",
    category: 2,
    type: "fan_pinghu",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_pinghu"
}, {
    id: voiceID,
    name: "混全带幺九",
    words: "混全带幺九",
    category: 2,
    type: "fan_hunquandaiyaojiu",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_hunquandaiyaojiu"
}, {
    id: voiceID,
    name: "一气通贯",
    words: "一气通贯",
    category: 2,
    type: "fan_yiqitongguan",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_yiqitongguan"
}, {
    id: voiceID,
    name: "三色同顺",
    words: "三色同顺",
    category: 2,
    type: "fan_sansetongshun",
    level_limit: 5,
    time_length: 1500,
    path: "audio/sound/" + name + "/fan_sansetongshun"
}, {
    id: voiceID,
    name: "三色同刻",
    words: "三色同刻",
    category: 2,
    type: "fan_sansetongke",
    level_limit: 5,
    time_length: 1500,
    path: "audio/sound/" + name + "/fan_sansetongke"
}, {
    id: voiceID,
    name: "三杠子",
    words: "三杠子",
    category: 2,
    type: "fan_sangangzi",
    level_limit: 5,
    time_length: 1200,
    path: "audio/sound/" + name + "/fan_sangangzi"
}, {
    id: voiceID,
    name: "对对和",
    words: "对对和",
    category: 2,
    type: "fan_duiduihu",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_duiduihu"
}, {
    id: voiceID,
    name: "三暗刻",
    words: "三暗刻",
    category: 2,
    type: "fan_sananke",
    level_limit: 5,
    time_length: 1200,
    path: "audio/sound/" + name + "/fan_sananke"
}, {
    id: voiceID,
    name: "小三元",
    words: "小三元",
    category: 2,
    type: "fan_xiaosanyuan",
    level_limit: 5,
    time_length: 1200,
    path: "audio/sound/" + name + "/fan_xiaosanyuan"
}, {
    id: voiceID,
    name: "混老头",
    words: "混老头",
    category: 2,
    type: "fan_hunlaotou",
    level_limit: 5,
    time_length: 1200,
    path: "audio/sound/" + name + "/fan_hunlaotou"
}, {
    id: voiceID,
    name: "七对子",
    words: "七对子",
    category: 2,
    type: "fan_qiduizi",
    level_limit: 5,
    time_length: 1200,
    path: "audio/sound/" + name + "/fan_qiduizi"
}, {
    id: voiceID,
    name: "纯全带幺九",
    words: "纯全带幺九",
    category: 2,
    type: "fan_chunquandaiyaojiu",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_chunquandaiyaojiu"
}, {
    id: voiceID,
    name: "混一色",
    words: "混一色",
    category: 2,
    type: "fan_hunyise",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_hunyise"
}, {
    id: voiceID,
    name: "二杯口",
    words: "二杯口",
    category: 2,
    type: "fan_erbeikou",
    level_limit: 5,
    time_length: 1200,
    path: "audio/sound/" + name + "/fan_erbeikou"
}, {
    id: voiceID,
    name: "清一色",
    words: "清一色",
    category: 2,
    type: "fan_qingyise",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_qingyise"
}, {
    id: voiceID,
    name: "立直",
    words: "立直",
    category: 2,
    type: "fan_liqi",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_liqi"
}, {
    id: voiceID,
    name: "两立直",
    words: "两立直",
    category: 2,
    type: "fan_dliqi",
    level_limit: 5,
    time_length: 1200,
    path: "audio/sound/" + name + "/fan_dliqi"
}, {
    id: voiceID,
    name: "自摸",
    words: "自摸",
    category: 2,
    type: "fan_zimo",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_zimo"
}, {
    id: voiceID,
    name: "一发",
    words: "一发",
    category: 2,
    type: "fan_yifa",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_yifa"
}, {
    id: voiceID,
    name: "宝牌",
    words: "宝牌",
    category: 2,
    type: "fan_dora1",
    level_limit: 5,
    time_length: 600,
    path: "audio/sound/" + name + "/fan_dora1"
}, {
    id: voiceID,
    name: "宝牌2",
    words: "宝牌2",
    category: 2,
    type: "fan_dora2",
    level_limit: 5,
    time_length: 800,
    path: "audio/sound/" + name + "/fan_dora2"
}, {
    id: voiceID,
    name: "宝牌3",
    words: "宝牌3",
    category: 2,
    type: "fan_dora3",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_dora3"
}, {
    id: voiceID,
    name: "宝牌4",
    words: "宝牌4",
    category: 2,
    type: "fan_dora4",
    level_limit: 5,
    time_length: 1500,
    path: "audio/sound/" + name + "/fan_dora4"
}, {
    id: voiceID,
    name: "宝牌5",
    words: "宝牌5",
    category: 2,
    type: "fan_dora5",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_dora5"
}, {
    id: voiceID,
    name: "宝牌6",
    words: "宝牌6",
    category: 2,
    type: "fan_dora6",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_dora6"
}, {
    id: voiceID,
    name: "宝牌7",
    words: "宝牌7",
    category: 2,
    type: "fan_dora7",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_dora7"
}, {
    id: voiceID,
    name: "宝牌8",
    words: "宝牌8",
    category: 2,
    type: "fan_dora8",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_dora8"
}, {
    id: voiceID,
    name: "宝牌9",
    words: "宝牌9",
    category: 2,
    type: "fan_dora9",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_dora9"
}, {
    id: voiceID,
    name: "宝牌10",
    words: "宝牌10",
    category: 2,
    type: "fan_dora10",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_dora10"
}, {
    id: voiceID,
    name: "宝牌11",
    words: "宝牌11",
    category: 2,
    type: "fan_dora11",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_dora11"
}, {
    id: voiceID,
    name: "宝牌12",
    words: "宝牌12",
    category: 2,
    type: "fan_dora12",
    level_limit: 5,
    time_length: 1200,
    path: "audio/sound/" + name + "/fan_dora12"
}, {
    id: voiceID,
    name: "宝牌一大堆",
    words: "宝牌一大堆",
    category: 2,
    type: "fan_dora13",
    level_limit: 5,
    time_length: 1200,
    path: "audio/sound/" + name + "/fan_dora13"
}, {
    id: voiceID,
    name: "天和",
    words: "天和",
    category: 2,
    type: "fan_tianhu",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_tianhu"
}, {
    id: voiceID,
    name: "地和",
    words: "地和",
    category: 2,
    type: "fan_dihu",
    level_limit: 5,
    time_length: 1000,
    path: "audio/sound/" + name + "/fan_dihu"
}, {
    id: voiceID,
    name: "大三元",
    words: "大三元",
    category: 2,
    type: "fan_dasanyuan",
    level_limit: 5,
    time_length: 1200,
    path: "audio/sound/" + name + "/fan_dasanyuan"
}, {
    id: voiceID,
    name: "四暗刻",
    words: "四暗刻",
    category: 2,
    type: "fan_sianke",
    level_limit: 5,
    time_length: 1200,
    path: "audio/sound/" + name + "/fan_sianke"
}, {
    id: voiceID,
    name: "四暗刻单骑",
    words: "四暗刻单骑",
    category: 2,
    type: "fan_siankedanqi",
    level_limit: 5,
    time_length: 2400,
    path: "audio/sound/" + name + "/fan_siankedanqi"
}, {
    id: voiceID,
    name: "字一色",
    words: "字一色",
    category: 2,
    type: "fan_ziyise",
    level_limit: 5,
    time_length: 1200,
    path: "audio/sound/" + name + "/fan_ziyise"
}, {
    id: voiceID,
    name: "绿一色",
    words: "绿一色",
    category: 2,
    type: "fan_lvyise",
    level_limit: 5,
    time_length: 1200,
    path: "audio/sound/" + name + "/fan_lvyise"
}, {
    id: voiceID,
    name: "清老头",
    words: "清老头",
    category: 2,
    type: "fan_qinglaotou",
    level_limit: 5,
    time_length: 1200,
    path: "audio/sound/" + name + "/fan_qinglaotou"
}, {
    id: voiceID,
    name: "国士无双",
    words: "国士无双",
    category: 2,
    type: "fan_guoshiwushuang",
    level_limit: 5,
    time_length: 1500,
    path: "audio/sound/" + name + "/fan_guoshiwushuang"
}, {
    id: voiceID,
    name: "国士无双13面听",
    words: "国士无双13面听",
    category: 2,
    type: "fan_guoshishisanmian",
    level_limit: 5,
    time_length: 2200,
    path: "audio/sound/" + name + "/fan_guoshishisanmian"
}, {
    id: voiceID,
    name: "小四喜",
    words: "小四喜",
    category: 2,
    type: "fan_xiaosixi",
    level_limit: 5,
    time_length: 1500,
    path: "audio/sound/" + name + "/fan_xiaosixi"
}, {
    id: voiceID,
    name: "大四喜",
    words: "大四喜",
    category: 2,
    type: "fan_dasixi",
    level_limit: 5,
    time_length: 1500,
    path: "audio/sound/" + name + "/fan_dasixi"
}, {
    id: voiceID,
    name: "四杠子",
    words: "四杠子",
    category: 2,
    type: "fan_sigangzi",
    level_limit: 5,
    time_length: 1500,
    path: "audio/sound/" + name + "/fan_sigangzi"
}, {
    id: voiceID,
    name: "九莲宝灯",
    words: "九莲宝灯",
    category: 2,
    type: "fan_jiulianbaodeng",
    level_limit: 5,
    time_length: 1500,
    path: "audio/sound/" + name + "/fan_jiulianbaodeng"
}, {
    id: voiceID,
    name: "纯正九莲宝灯",
    words: "纯正九莲宝灯",
    category: 2,
    type: "fan_chunzhengjiulianbaodeng",
    level_limit: 5,
    time_length: 2000,
    path: "audio/sound/" + name + "/fan_chunzhengjiulianbaodeng"
}, {
    id: voiceID,
    name: "流局满贯",
    words: "流局满贯",
    category: 2,
    type: "fan_liujumanguan",
    level_limit: 5,
    time_length: 2000,
    path: "audio/sound/" + name + "/fan_liujumanguan"
}, {
    id: voiceID,
    name: "满贯",
    words: "满贯",
    category: 2,
    type: "gameend_manguan",
    level_limit: 5,
    time_length: 1200,
    path: "audio/sound/" + name + "/gameend_manguan"
}, {
    id: voiceID,
    name: "跳满",
    words: "跳满",
    category: 2,
    type: "gameend_tiaoman",
    level_limit: 5,
    time_length: 1200,
    path: "audio/sound/" + name + "/gameend_tiaoman"
}, {
    id: voiceID,
    name: "倍满",
    words: "倍满",
    category: 2,
    type: "gameend_beiman",
    level_limit: 5,
    time_length: 1200,
    path: "audio/sound/" + name + "/gameend_beiman"
}, {
    id: voiceID,
    name: "三倍满",
    words: "三倍满",
    category: 2,
    type: "gameend_sanbeiman",
    level_limit: 5,
    time_length: 1500,
    path: "audio/sound/" + name + "/gameend_sanbeiman"
}, {
    id: voiceID,
    name: "累积役满",
    words: "累积役满",
    category: 2,
    type: "gameend_leijiyiman",
    level_limit: 5,
    time_length: 2000,
    path: "audio/sound/" + name + "/gameend_leijiyiman"
}, {
    id: voiceID,
    name: "役满",
    words: "役满",
    category: 2,
    type: "gameend_yiman1",
    level_limit: 5,
    time_length: 2200,
    path: "audio/sound/" + name + "/gameend_yiman1"
}, {
    id: voiceID,
    name: "两倍役满",
    words: "两倍役满",
    category: 2,
    type: "gameend_yiman2",
    level_limit: 5,
    time_length: 2200,
    path: "audio/sound/" + name + "/gameend_yiman2"
}, {
    id: voiceID,
    name: "三倍役满",
    words: "三倍役满",
    category: 2,
    type: "gameend_yiman3",
    level_limit: 5,
    time_length: 2500,
    path: "audio/sound/" + name + "/gameend_yiman3"
}, {
    id: voiceID,
    name: "四倍役满",
    words: "四倍役满",
    category: 2,
    type: "gameend_yiman4",
    level_limit: 5,
    time_length: 2500,
    path: "audio/sound/" + name + "/gameend_yiman4"
}, {
    id: voiceID,
    name: "五倍役满",
    words: "五倍役满",
    category: 2,
    type: "gameend_yiman5",
    level_limit: 5,
    time_length: 2500,
    path: "audio/sound/" + name + "/gameend_yiman5"
}, {
    id: voiceID,
    name: "六倍役满",
    words: "六倍役满",
    category: 2,
    type: "gameend_yiman6",
    level_limit: 5,
    time_length: 2500,
    path: "audio/sound/" + name + "/gameend_yiman6"
}, {
    id: voiceID,
    name: "听牌",
    words: "听牌",
    category: 2,
    type: "gameend_tingpai",
    level_limit: 0,
    time_length: 1000,
    path: "audio/sound/" + name + "/gameend_tingpai"
}, {
    id: voiceID,
    name: "未听牌",
    words: "未听牌",
    category: 2,
    type: "gameend_noting",
    level_limit: 0,
    time_length: 1000,
    path: "audio/sound/" + name + "/gameend_noting"
}, {
    id: voiceID,
    name: "四杠流局",
    words: "四杠流局",
    category: 2,
    type: "gameend_sigangliuju",
    level_limit: 0,
    time_length: 1200,
    path: "audio/sound/" + name + "/gameend_sigangliuju"
}, {
    id: voiceID,
    name: "四风连打",
    words: "四风连打",
    category: 2,
    type: "gameend_sifenglianda",
    level_limit: 0,
    time_length: 1400,
    path: "audio/sound/" + name + "/gameend_sifenglianda"
}, {
    id: voiceID,
    name: "九种九牌",
    words: "九种九牌",
    category: 2,
    type: "gameend_jiuzhongjiupai",
    level_limit: 0,
    time_length: 1200,
    path: "audio/sound/" + name + "/gameend_jiuzhongjiupai"
}];
