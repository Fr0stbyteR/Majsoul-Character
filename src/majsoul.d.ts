import Handler = laya.utils.Handler;
import Sprite = laya.display.Sprite;
import View = laya.ui.View;
import Component = laya.ui.Component;
import AsynDialog = laya.ui.AsynDialog;
import WebAudioSoundChannel = laya.media.webaudio.WebAudioSoundChannel;
import SoundChannel = laya.media.SoundChannel;
declare var view: {
    DesktopMgr: {
        Inst: {
            actionMap: {
                [key: string]: Handler;
                ActionAnGangAddGang: Handler;
                ActionBaBei: Handler;
                ActionChiPengGang: Handler;
                ActionDealTile: Handler;
                ActionDiscardTile: Handler;
                ActionHule: Handler;
                ActionLiuJu: Handler;
                ActionMJStart: Handler;
                ActionNewRound: Handler;
                ActionNoTile: Handler;
            };
            mainrole: {
                _choose_pai: TileInGame;
                hand: TileInGame[]
                DoDiscardTile(): void;
                during_liqi: boolean;
            };
            setAutoHule(e: boolean): void;
            setAutoNoFulu(e: boolean): void;
        }
    };
    AudioMgr: AudioManager
}
declare class AudioManager {
    _audio_id: number;
    _audioMuted: boolean;
    _audioVolume: number;
    _audio_list: { id: number, audio: SoundChannel }[];
    PlayAudio(...args: any[]): any;
    PlayCharactorSound(...args: any[]): any;
    PlaySound(...args: any[]): any;
    suffix(): string;
    _RemoveAudio(...args: any[]): any;
}
declare var game: {
    Tools: any;
    E_LoadState: any;
    SceneBase: any;
    ResourceVersion: any;
    MJNetMgr: any;
    LocalStorage: any;
    EConnectState: any;
    LobbyNetMgr: any;
    E_LoadType: any;
    LoadMgr: {
        _items: any[];
        _resimage: { [url: string]: {
            loaded: boolean,
            origin_url: string,
            blob_url: string,
            complete: any[],
            success: boolean
        } };
        [key: string]: any;
    };
    stardust_id: any;
    ECommonView: any;
    EPlayerView: any;
    EIDType: any;
    EAccountSetKey: any;
    GameUtility: any;
    UIEffect: any;
    FrontEffect: any;
    EFriendMsgType: any;
    FriendMgr: any;
    EffectBase: any;
    EffectMgr: any;
    AppShop: any;
    GooglePlayShop: any;
    ChatInfoBase: any;
    ChatInfo_Str: any;
    PersonChat: any;
    ChannelChat: any;
    ChatMgr: any;
    Scene_Lobby: any;
    Scene_MJ: {
        Inst: SceneMJ;
        prototype: SceneMJ;
    };
}
declare class SceneMJ {
    openMJRoom(...args: any[]): any;
    GameEnd(...args: any[]): any;
}
declare var GameMgr: {
    Inst: GameManager;
    prototype: GameManager;
    client_language: string;
}
declare class GameManager {
    account_data: Account;
    account_refresh_time: number;
    account_numerical_resource: { [id: number]: number };
    account_id: any;
    EnterLobby(...args: any[]): any;
    updateAccountInfo(...args: any[]): any;
    updateRoom(...args: any[]): any;
}
declare var cfg: {
    item_definition: {
        character: {
            map_: { [id: number]: CharacterDef }
            rows_: CharacterDef[];
        };
        skin: {
            map_: { [id: number]: SkinDef }
            rows_: SkinDef[];
        };
    };
    voice: {
        sound: {
            groups_: VoiceDef[][];
            rows_: VoiceDef[];
        }
    };
    audio: {
        audio: {
            map_: { [id: number]: AudioDef };
            rows_: AudioDef[];
            get(id: string): AudioDef
        }
    }
}
declare class CharacterDef {
    id: number;
    name: string;
    name_chs: string;
    name_en: string;
    name_jp: string;
    open: number;
    init_skin: number;
    full_fetter_skin: number;
    favorite: number;
    star_5_material: string;
    star_5_cost: number;
    can_marry: number;
    exchange_item_id: number;
    exchange_item_num: number;
    emo: string;
    sound: number;
    sound_volume: number;
    sex: number;
    desc_stature: string;
    desc_stature_chs: string;
    desc_stature_en: string;
    desc_stature_jp: string;
    desc_birth: string;
    desc_birth_chs: string;
    desc_birth_en: string;
    desc_birth_jp: string;
    desc_age: string;
    desc_age_chs: string;
    desc_age_en: string;
    desc_age_jp: string;
    desc_bloodtype: string;
    desc_bloodtype_chs: string;
    desc_bloodtype_en: string;
    desc_bloodtype_jp: string;
    desc_cv: string;
    desc_cv_chs: string;
    desc_cv_en: string;
    desc_cv_jp: string;
    desc_hobby: string;
    desc_hobby_chs: string;
    desc_hobby_en: string;
    desc_hobby_jp: string;
    desc: string;
    desc_chs: string;
    desc_en: string;
    desc_jp: string;
    skin_lib: number[];
}
declare class VoiceDef {
    id: number;
    name: string;
    name_chs: string;
    name_en: string;
    name_jp: string;
    words: string;
    words_chs: string;
    words_en: string;
    words_jp: string;
    category: number;
    type: string;
    level_limit: number;
    time_length: number;
    path: string;
}
declare class AudioDef {
    id: number;
    type: string;
    path: string;
}
declare class SkinDef {
    id: number;
    name: string;
    name_chs: string;
    name_en: string;
    name_jp: string;
    desc: string;
    desc_chs: string;
    desc_en: string;
    desc_jp: string;
    character_id: number;
    lock_tips: string;
    lock_tips_chs: string;
    lock_tips_en: string;
    lock_tips_jp: string;
    path: string;
    exchange_item_id: number;
    exchange_item_num: number;
    full_height: number;
    full_width: number;
    full_x: number;
    full_y: number;
    half_width: number;
    half_height: number;
    half_x: number;
    half_y: number;
    smallhead_width: number;
    smallhead_height: number;
    smallhead_x: number;
    smallhead_y: number;
    face_width: number;
    face_height: number;
    face_x: number;
    face_y: number;
}
declare var uiscript: {
    UI_GameEnd: {
        Inst: {
            show(): void;
            onConfirm(): void;
        }
    };
    UI_Sushe: {
        Inst: SusheUI;
        prototype: SusheUI;
        characters: Character[];
        main_chara_info: Character;
        main_character_id: number;
        skin_map: { [key: number]: number };
    };
    UI_Entrance: {
        Inst: EntranceUI
        prototype: EntranceUI;
    };
    UI_Sushe_Select: {
        prototype: SusheSelectUI;
    };
    UI_Sushe_Visit: {
        Inst: SusheVisitUI
        prototype: SusheVisitUI;
    };
    UI_WaitingRoom: {
        Inst: WaitingRoomUI;
        prototype: WaitingRoomUI;
    }
    UI_Lobby: {
        Inst: LobbyUI;
        prototype: LobbyUI;
    }
    UI_OtherPlayerInfo: {
        Inst: OtherPlayerInfoUI;
        prototype: OtherPlayerInfoUI;
    }
    UIMgr:{
        Inst: UIManager;
        prototype: UIManager;
    }
}
declare class Character {
    charid: number;
    exp: number;
    extra_emoji?: number[];
    is_upgraded: boolean;
    level: number;
    skin: number;
    views?: { slot: number, item_id: number }[];
}
declare class SusheUI extends MajsoulUI {
    [key: string]: any;
    chat_block: any;
    chat_id: number;
    container_chat: Sprite;
    container_look_illust: any;
    container_page: Sprite;
    contianer_illust: Sprite;
    enable(): boolean;
    illust: any;
    label_cv: Component;
    label_name: Component;
    me(): Component;
    origin_illust_x: 948
    page_select_character: SusheSelectUI;
    page_visit_character: MajsoulUI;
    select_index: number;
    sound_channel: any;
    change_select(...args: any[]): any;
    onChangeSkin(...args: any[]): any;
    say(...args: any[]): any;
    stopsay(...args: any[]): any;
}
declare class EntranceUI extends MajsoulUI {
    _onLoginSuccess(...args: any[]): any;
}
declare class SusheSelectUI extends MajsoulUI {
    select_index: number;
    onClickAtHead(...args: any[]): any;
}
declare class SusheVisitUI extends MajsoulUI {
    page_effect: {
        chara_info: Character,
        on_change_view(...args: any[]): any;
    }
    onCreate(...args: any[]): any;
}
declare class WaitingRoomUI extends MajsoulUI {
    players: Account[];
    _refreshPlayerInfo: (...args: any[]) => any;
    updateData(...args: any[]): any;
}
declare class LobbyUI extends MajsoulUI {
    refreshInfo(...args: any[]): any;
    chat_id: number;
    sound_channel: WebAudioSoundChannel;
    chat_block: {
        show(...args: any[]): any;
    }
    say(...args: any[]): any;
    stopsay(...args: any[]): any;
}
declare class OtherPlayerInfoUI extends MajsoulUI {
    level: any;
    title: any;
    illust: any;
    label_name: any;
    btn_addfriend: any;
    account_id: number;
    note: any;
    refreshBaseInfo(...args: any[]): any;
}
declare class MajsoulUI {
    $_GID: number;
    _enable: boolean;
    _me: View;
    _valid: boolean;
}
declare class UIManager {
    showNetReqError(...args: any[]): any;
}
declare var app: {
    NetAgent: {
        readonly lobby_ip: string;
        readonly mj_ip: string;
        readonly lobby_network_delay: number;
        readonly mj_network_delay: number;
        init: () => void;
        connect2Lobby: (ip: string, callback: (...args: any[]) => any) => void;
        sendMsg2Lobby: (eventName: string, callback: (...args: any[]) => any) => void;
        isLobbyConnectOK: () => boolean;
        sendReq2Lobby: (namespace: string, func: string, data: any, callback: (error: any, data: { [key: string]: any }) => any) => boolean;
        AddListener2Lobby: (eventName: string, callback: (...args: any[]) => any) => void;
        RemoveListener2Lobby: (eventName: string, callback: (...args: any[]) => any) => void;
        connect2MJ: (ip: string, callback: (...args: any[]) => any) => void;
        sendMsg2MJ: (eventName: string, callback: (...args: any[]) => any) => void;
        isMJConnectOK: () => boolean;
        sendReq2MJ: (namespace: string, func: string, data: any, callback: (error: any, data: { [key: string]: any }) => any) => boolean;
        AddListener2MJ: (eventName: string, callback: (...args: any[]) => any) => void;
        Close2MJ: () => void;
        Close2Lobby: () => void;
        onReceiveMsgError: (error: { method: string, info: string }) => void;
        _socket_lobby: Socket;
        _socket_mj: Socket;
    }
    Log: {
        log(...args: any[]): any;
    }
}
declare interface Socket {}
declare class MJGameEvent {
    fast: boolean;
    msg: MJGameAction;
}
declare class MJGameAction {
    operation?: OptionalOperationList;
}
declare class ActionAnGangAddGang extends MJGameAction {}
declare class ActionNewRound extends MJGameAction {
    al: boolean;
    ben: number;
    chang: number;
    dora: string;
    ju: number;
    left_tile_count: number;
    liqibang: number;
    md5: string;
    scores: number[]
    tiles: string[]
}

declare class OptionalOperationList {
    operation_list: OptionalOperation[]
    seat: number
    time_add: number
    time_fixed: number
}
declare class OptionalOperation {
    combination?: string[];
    type: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
}
declare class TileInGame {
    $_GID: number;
    acitve: boolean;
    bedraged: boolean;
    during_hule: boolean;
    during_newgame: boolean;
    hule_lifetime: number;
    hule_start: number;
    index: number;
    isDora: boolean;
    ispaopai: boolean;
    mySelf: object;
    newgame_lifetime: number;
    newgame_start: number;
    pos_x: number;
    started: boolean;
    val: Tile;
    valid: boolean;
    z: number;
    _clickeffect: any
    _destroyed: boolean
    _enable: boolean
    _events: any
    _id: number
    _owner: any;
}
declare class Tile {
    dora: boolean
    index: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    type: 0 | 1 | 2 | 3
    static Create(i: string): Tile; // create using literal string like "2s", "0s"
    static isSame(e: Tile, t: Tile): boolean; // compare two tiles
    static RandomCreate(): Tile;
    isZ(): boolean;
    isLaoTou(): boolean;
    isYao(): boolean;
    isSiXi(): boolean;
    isSanYan(): boolean;
    Clone(): Tile;
    numValue(): number;
    toString(): string; // convert to literal string like "2s", "0s"
}
declare interface ResAccountInfo {
    account: Account;
}
declare interface Account {
    [key: string]: any;
    account_id: number;
    avatar_id: number;
    diamond: number;
    gold: number;
    level: AccountLevel;
    login_time: number;
    logout_time: number;
    nickname: string;
    room_id: number;
    signature: string;
    title: number;
    vip: number;
}
declare interface AccountLevel {
    /**
     * 段位 ID : 1010x: 初心x, 1040x: 雀豪x, 10601: 魂天, check cfg.level_definition.level_definition
     *
     * @type {number}
     * @memberof AccountLevel
     */
    id: number;
    score: number;
}
// app.NetAgent.sendReq2Lobby("Lobby", "fetchAccountStatisticInfo", { account_id: 3644 }, function (t, n) { t || n.error ? null : console.log(n) })
declare interface ResAccountStatisticInfo {
    detail_data: AccountDetailStatisticV2;
    statistic_data: AccountStatisticData[];
}
declare interface AccountDetailStatisticV2 {
    customized_contest_statistic: CustomizedContestStatistic;
    friend_room_statistic: AccountDetailStatistic;
    rank_statistic: RankStatistic;
}
declare interface CustomizedContestStatistic {
    total_statistic: AccountDetailStatistic;
    month_statistic: AccountDetailStatistic;
    month_refresh_time: number
}
declare interface AccountDetailStatistic {
    game_mode: AccountStatisticByGameMode[];
    fan_achieved: AccountFanAchieved[]
}
declare interface RankStatistic {
    total_statistic: RankData;
    month_statistic: RankData;
    month_refresh_time: number
}
declare interface AccountStatisticByGameMode {
    mode: number;
    game_count_sum: number
    dadian_sum: number;
    fly_count: number
    game_final_position: number[];
    gold_earn_sum: number;
    highest_lianzhuang: number;
    liqi_count_sum: number;
    ming_count_sum: number;
    round_count_sum: number;
    round_end: RoundEndData[];
    score_earn_sum: number;
    xun_count_sum: number;
}
declare interface RoundEndData {
    type: number;
    sum: number;
}
declare interface AccountFanAchieved {
    fan: AccountStatisticByFan[];
    liujumanguan: number;
    mahjong_category: number;
}
declare interface AccountStatisticByFan {
    fan_id: number;
    sum: number;
}
declare interface RankData {
    all_level_statistic: AccountDetailStatistic;
    level_data_list: RankLevelData[];
}
declare interface RankLevelData {
    rank_level: number;
    statistic: AccountDetailStatistic;
}
declare interface AccountStatisticData {
    /**
     * 1: 友人场，2: 匹配场
     *
     * @type {1 | 2 | 3 | 4}
     * @memberof AccountMahjongStatistic
     */
    game_category: 1 | 2 | 3 | 4;
    /**
     * 1: 四麻，2: 三麻
     *
     * @type {(1 | 2)}
     * @memberof AccountMahjongStatistic
     */
    mahjong_category: 1 | 2;
    statistic: AccountMahjongStatistic;
}
declare interface AccountMahjongStatistic {
    final_position_counts: number[];
    highest_hu: HighestHuRecord;
    recent_10_hu_summary: LiQi10Summary;
    recent_20_hu_summary: Liqi20Summary;
    recent_hu: HuSummary;
    recent_ranks: number[];
    recent_round: RoundSummary;
}
declare interface HighestHuRecord {
    fanshu: number;
    doranum: number;
    title: string;
    hands: string[];
    hupai: string;
    ming: string[]
}
declare interface LiQi10Summary {
    total_xuanshang: number;
    total_fanshu: number;
}
declare interface Liqi20Summary {
    total_count: number;
    total_lidora_count: number;
    average_hu_point: number
}
declare interface HuSummary {
    total_count: number;
    dora_round_count: number;
    total_fan: number;
}
declare interface RoundSummary {
    fangchong_count: number;
    rong_count: number;
    total_count: number;
    zimo_count: number;
}
