/// <reference path="./LayaAir.d.ts" />
/// <reference path="./majsoul.d.ts" />
/// <reference path="./index.d.ts" />
const SERVER = "https://fr0stbyter.github.io/Majsoul-Character/characters/";
let newCharactersReady = false;
let charactersReady = false;
const getCharacter = () => {
    for (let i = 0; i <= 7; i++) {
        uiscript.UI_Sushe.characters[i] = { charid: 200001 + i, exp: 20000, extra_emoji: [10, 11, 12, 13], is_upgraded: true, level: 5, skin: 400102 + i * 100 };
        uiscript.UI_Sushe.skin_map[400102 + i * 100] = 1;
        uiscript.UI_Sushe.skin_map[400101 + i * 100] = 1;
    }
};
const newCharacters = [] as NewCharacter[];
const fetchNewChars = () => {
    fetch(SERVER + "characters.json")
    .then(response => response.json())
    .then((newCharacterNames: string[]) => {
        newCharacterNames.forEach((name, i) => {
            fetch(SERVER + name + "/manifest.json")
            .then(response => response.json())
            .then((char: NewCharacter) => {
                newCharacters.push(char);
                if (i === newCharacterNames.length - 1) newCharactersReady = true;
            }).catch(() => {
                if (i === newCharacterNames.length - 1) newCharactersReady = true;
            });
        });
    });
};
const toURL = (fileName: string, charName: string, type: "emo" | "skin" | "voice") => {
    return SERVER + charName + "/" + type + "/" + fileName + (type === "emo" || "skin" ? ".png" : ".mp3");
};
/**
 * Preload image resources
 *
 */
const loadRes = (newChar: NewCharacter) => {
    const img = {} as { [path: string]: string };
    const prefix = GameMgr.client_language ? GameMgr.client_language + "/" : "";
    for (let i = 0; i < 13; i++) {
        img[prefix + newChar.character.emo + "/" + i + ".png"] = toURL(i.toString(), newChar.character.name, "emo");
    }
    for (const key of ["bighead", "full", "half", "smallhead", "waitingroom"]) {
        img[prefix + newChar.skin.path + "/" + key + ".png"] = toURL(key, newChar.character.name, "skin");
    }
    for (const key in img) {
        const url = img[key];
        const resImage = {
            loaded: false,
            origin_url: key,
            blob_url: null,
            complete: [],
            success: false
        } as {
            loaded: boolean,
            origin_url: string,
            blob_url: string,
            complete: any[],
            success: boolean
        };
        Laya.loader.load(url, Laya.Handler.create(game.LoadMgr, (t: any) => {
            resImage.blob_url = t,
            resImage.loaded = true,
            resImage.success = true;
            for (let i = 0; i < resImage.complete.length; i++) {
                resImage.complete && resImage.complete[i].run();
            }
            resImage.complete = [];
        }, [url]), null, Laya.Loader.IMAGE);
        game.LoadMgr._resimage[resImage.origin_url] = resImage;
    }
};
/**
 * Add character into definition
 *
 */
const injectChar = (newChar: NewCharacter, $char: number, $skin: number, $voice: number) => {
    if (!charactersReady || !newCharactersReady) {
        setTimeout(injectChar, 1000, newChar, $char, $skin, $voice);
        return;
    }
    cfg.item_definition.character.map_[newChar.character.id] = newChar.character;
    cfg.item_definition.character.rows_[$char] = newChar.character;
    uiscript.UI_Sushe.characters[$char] = { charid: newChar.character.id, exp: 20000, extra_emoji: [9, 10, 11, 12], is_upgraded: true, level: 5, skin: newChar.skin.id, views: char_views };
    cfg.item_definition.skin.map_[newChar.skin.id] = newChar.skin;
    cfg.item_definition.skin.rows_[$skin] = newChar.skin;
    cfg.voice.sound.groups_[newChar.character.sound] = newChar.voice;
    for (let i = 0; i < newChar.voice.length; i++) {
        cfg.voice.sound.rows_[$voice + i] = newChar.voice[i];
    }
};
let avatar_id = +localStorage.getItem("avatar_id");
let char_id = +localStorage.getItem("char_id");
let char_views = [] as { slot: number, item_id: number }[];
try {
    char_views = JSON.parse(localStorage.getItem("char_views"));
} catch (e) {}

fetchNewChars();

const inject = () => {
    if (!newCharactersReady || typeof uiscript === "undefined" || !uiscript.UI_Entrance || !uiscript.UI_Sushe || !uiscript.UI_Sushe_Select || !uiscript.UI_OtherPlayerInfo) {
        setTimeout(inject, 1000);
        return;
    }
    newCharacters.forEach(char => loadRes(char));
    /**
     * Override selected character by local data on login
     *
     */
    (() => {
        const _ = uiscript.UI_Entrance.prototype._onLoginSuccess;
        uiscript.UI_Entrance.prototype._onLoginSuccess = (...args) => {
            const r = _.call(uiscript.UI_Entrance.Inst, ...args);
            if (avatar_id) GameMgr.Inst.account_data.avatar_id = avatar_id;
            return r;
        };
    })();
    /**
     * Store selected skin locally
     *
     */
    (() => {
        const _ = uiscript.UI_Sushe.prototype.onChangeSkin;
        uiscript.UI_Sushe.prototype.onChangeSkin = (...args) => {
            const r = _.call(uiscript.UI_Sushe.Inst, ...args);
            avatar_id = args[0];
            localStorage.setItem("avatar_id", avatar_id.toString());
            return r;
        };
    })();
    /**
     * Store selected character locally
     *
     */
    (() => {
        const _ = uiscript.UI_Sushe_Select.prototype.onClickAtHead;
        uiscript.UI_Sushe_Select.prototype.onClickAtHead = (...args) => {
            const i = args[0];
            if (uiscript.UI_Sushe.Inst.page_select_character.select_index === i) {
                avatar_id = uiscript.UI_Sushe.characters[i].skin;
                char_id = uiscript.UI_Sushe.characters[i].charid;
                localStorage.setItem("avatar_id", avatar_id.toString());
                localStorage.setItem("char_id", char_id.toString());
            }
            const r = _.call(uiscript.UI_Sushe.Inst.page_select_character, ...args);
            return r;
        };
    })();
    /**
     * Store character effects locally
     *
     */
    (() => {
        const _ = uiscript.UI_Sushe_Visit.prototype.onCreate;
        uiscript.UI_Sushe_Visit.prototype.onCreate = (...args) => {
            const r = _.call(uiscript.UI_Sushe_Visit.Inst, ...args);
            const __ = uiscript.UI_Sushe_Visit.Inst.page_effect.on_change_view;
            uiscript.UI_Sushe_Visit.Inst.page_effect.on_change_view = (...args) => {
                const r = __.call(uiscript.UI_Sushe_Visit.Inst.page_effect, ...args);
                if (char_id && uiscript.UI_Sushe_Visit.Inst.page_effect.chara_info.charid === char_id) {
                    char_views = uiscript.UI_Sushe_Visit.Inst.page_effect.chara_info.views;
                    localStorage.setItem("char_views", JSON.stringify(char_views));
                }
                return r;
            };
            return r;
        };
    })();
    /**
     * Override selected skin and char on refreshing data from server
     *
     */
    (() => {
        const _ = function (this: GameManager) {
            app.NetAgent.sendReq2Lobby("Lobby", "fetchAccountInfo", {}, (i, n) => {
                if (i || n.error) {
                    uiscript.UIMgr.Inst.showNetReqError("fetchAccountInfo", i, n);
                } else {
                    app.Log.log("UpdateAccount: " + JSON.stringify(n)),
                    this.account_refresh_time = Laya.timer.currTimer;
                    for (const key in n.account) {
                        if (this.account_data[key] = n.account[key],
                        "platform_diamond" === key) {
                            for (let a = n.account[key], s = 0; s < a.length; s++) {
                                this.account_numerical_resource[a[s].id] = a[s].count;
                            }
                        }
                    }
                    if (char_id) uiscript.UI_Sushe.main_character_id = char_id;
                    if (avatar_id) this.account_data.avatar_id = avatar_id;
                    uiscript.UI_Lobby.Inst.refreshInfo(),
                    n.account.room_id && this.updateRoom();
                }
            });
        };
        GameMgr.prototype.updateAccountInfo = (...args) => {
            const r = _.call(GameMgr.Inst, ...args);
            return r;
        };
    })();
    /**
     * Adding new character to definition
     *
     */
    (() => {
        let $char: number, $skin: number, $voice: number;
        const _ = GameMgr.prototype.EnterLobby;
        GameMgr.prototype.EnterLobby = (...args) => {
            charactersReady = true;
            // getCharacter();
            if (!$char) $char = uiscript.UI_Sushe.characters.length;
            if (!$skin) $skin = cfg.item_definition.skin.rows_.length;
            if (!$voice) $voice = cfg.voice.sound.rows_.length;
            for (const char of newCharacters) {
                injectChar(char, $char, $skin, $voice);
                $char++;
                $skin++;
                $voice++;
            }
            if (char_id) uiscript.UI_Sushe.main_character_id = char_id;
            const r = _.call(GameMgr.Inst, ...args);
            return r;
        };
    })();
    /**
     * Override user character in waiting room
     *
     */
    (() => {
        const _ = uiscript.UI_WaitingRoom.prototype.updateData;
        uiscript.UI_WaitingRoom.prototype.updateData = (...args) => {
            const r = _.call(uiscript.UI_WaitingRoom.Inst, ...args);
            if (avatar_id) {
                uiscript.UI_WaitingRoom.Inst.players.forEach((player) => {
                    if (player.account_id === GameMgr.Inst.account_data.account_id) player.avatar_id = GameMgr.Inst.account_data.avatar_id;
                });
            }
            return r;
        };
    })();
    /**
     * Override user character on ending a game
     *
     */
    (() => {
        const _ = game.Scene_MJ.prototype.GameEnd;
        game.Scene_MJ.prototype.GameEnd = (...args) => {
            if (char_id) uiscript.UI_Sushe.main_character_id = char_id;
            if (avatar_id) GameMgr.Inst.account_data.avatar_id = avatar_id;
            const r = _.call(game.Scene_MJ.Inst, ...args);
            return r;
        };
    })();
    /**
     * Override user character on game beginning
     *
     */
    (() => {
        const _ = game.Scene_MJ.prototype.openMJRoom;
        game.Scene_MJ.prototype.openMJRoom = (...args) => {
            const player_datas = args[0];
            if (avatar_id) {
                player_datas.forEach((player: Account) => {
                    if (player.account_id === GameMgr.Inst.account_data.account_id) {
                        player.avatar_id = GameMgr.Inst.account_data.avatar_id;
                        const curChar = uiscript.UI_Sushe.main_chara_info;
                        player.character = Object.assign(player.character, curChar);
                    }
                });
            }
            const r = _.call(game.Scene_MJ.Inst, ...args);
            return r;
        };
    })();
    /**
     * Use blobs for voices, strip suffix
     *
     */
    (() => {
        const _ = Laya.SoundManager.playSound;
        Laya.SoundManager.playSound = (...args) => {
            const url = args[0];
            if (url.match(/blob\:/)) args[0] = url.replace(/\.\w{3}$/, "");
            const r = _.call(Laya.SoundManager, ...args);
            return r;
        };
    })();
    /**
     * Allows loader to preload voices on game beginning
     *
     */
    (() => {
        const voices = [] as string[];
        // newCharacters.forEach(char => Object.keys(char.voice).forEach(k => voices.push(char.voice[k])));
        const _ = Laya.loader.load;
        Laya.loader.load = (...args) => {
            if (typeof args[0] === "string") {
                if (args[0].match(/blob\:/)) {
                    const url = args[0].replace(/\.\w{3}$/, "");
                    if (voices.indexOf(url) !== -1) {
                        args[0] = url;
                        args[3] = "sound";
                    }
                }
            }/*
            if (Array.isArray(args[0])) {
                args[0] = args[0].map((url) => {
                    if (typeof url === "string") {
                        if (url.match(/blob\:/)) {
                        }
                    }
                    return url;
                });
            }*/
            const r = _.call(Laya.loader, ...args);
            return r;
        };
    })();
    /*
    (() => {
        const _ = function (this: AudioManager, t: string, e: number, i: any) {
            this._audio_id;
            this._audio_id++;
            var n = t.match(/blob\:/) ? "" : this.suffix
              , r = Laya.SoundManager.playSound(t + n, 1, Laya.Handler.create(this, function() {
                i && i.run(),
                Laya.SoundManager.removeChannel(r)
            }));
            return r && (r.volume = e),
            r
        };
        view.AudioMgr.PlaySound = (...args) => {
            const r = _.call(view.AudioMgr, ...args);
            return r;
        }
    })();
    (() => {
        const _ = function (this: AudioManager, t: string, e: number, i: any) {
            if (void 0 === e && (e = 1),
            void 0 === i && (i = 1),
            this._audioMuted || 0 == this._audioVolume)
                return -1;
            var r = cfg.audio.audio.get(t);
            if (!r)
                return -1;
            var a = this._audio_id;
            this._audio_id++;
            var s = r.path.match(/blob\:/) ? "" : this.suffix
              , o = Laya.SoundManager.playSound(r.path + s, e, new Laya.Handler(this, () => {
                this._RemoveAudio(a)
            }
            ));
            return o && (o.volume = this._audioVolume * i),
            this._audio_list.push({
                id: a,
                audio: o
            }),
            a
        };
        view.AudioMgr.PlayAudio = (...args) => {
            const r = _.call(view.AudioMgr, ...args);
            return r;
        }
    })();*/
    /*
    (() => {
        const _ = function (this: SusheUI, t: any) {
            var i = uiscript.UI_Sushe.characters[this.select_index];
            this.chat_id++;
            var r = this.chat_id
                , a = view.AudioMgr.PlayCharactorSound(i, t, Laya.Handler.create(this, () => {
                Laya.timer.once(1e3, this, () => {
                    r == this.chat_id && this.stopsay()
                })
            }));
            a && (this.chat_block.show(words[this.chat_id % 5]),
            this.sound_channel = a.sound)
        };
        uiscript.UI_Sushe.prototype.say = (...args) => {
            const r = _.call(uiscript.UI_Sushe.Inst, ...args);
            return r;
        }
    })();
    (() => {
        const _ = function (this:LobbyUI, t: any) {
            var i = uiscript.UI_Sushe.main_chara_info;
            this.chat_id++;
            var r = this.chat_id
                , a = view.AudioMgr.PlayCharactorSound(i, t, Laya.Handler.create(this, () => {
                Laya.timer.once(1e3, this, () => {
                    r == this.chat_id && this.stopsay()
                })
            }));
            a && (this.chat_block.show(words[this.chat_id % 5]),
            this.sound_channel = a.sound)
        };
        uiscript.UI_Lobby.prototype.say = (...args) => {
            const r = _.call(uiscript.UI_Lobby.Inst, ...args);
            return r;
        }
    })();*/
    /**
     * Override users character in user detail page
     *
     */
    (() => {
        const _ = function (this: OtherPlayerInfoUI) {
            this.level.id = 0,
            this.title.id = 0,
            this.illust.me.visible = !1,
            this.label_name.text = "",
            this.btn_addfriend.visible = !1,
            app.NetAgent.sendReq2Lobby("Lobby", "fetchAccountInfo", {
                account_id: this.account_id
            }, (i, n) => {
                if (i || n.error) {
                    uiscript.UIMgr.Inst.showNetReqError("fetchAccountInfo", i, n);
                } else {
                    const player = n.account;
                    this.label_name.text = player.nickname,
                    this.title.id = player.title,
                    this.level.id = player.level.id,
                    this.level.exp = player.level.score,
                    this.illust.me.visible = !0,
                    this.illust.setSkin(player.account_id === GameMgr.Inst.account_data.account_id ? GameMgr.Inst.account_data.avatar_id : player.avatar_id, "waitingroom"),
                    this.account_id === GameMgr.Inst.account_id || null != game.FriendMgr.find(this.account_id) ? this.btn_addfriend.visible = !1 : this.btn_addfriend.visible = !0,
                    this.note.sign.setSign(player.signature);
                }
            });
        };
        uiscript.UI_OtherPlayerInfo.prototype.refreshBaseInfo = (...args) => {
            const r = _.call(uiscript.UI_OtherPlayerInfo.Inst, ...args);
            return r;
        };
    })();
    /*
    (() => {
        const _ = function () {
            var e = function() {
                function t(t) {
                    var e = this;
                    this._during_drag = !1,
                    this.me = t,
                    this.bar = this.me.getChildByName("val"),
                    this.point = this.me.getChildByName("point"),
                    this.me.on("mousedown", this, function() {
                        e._during_drag = !0,
                        e.rate = e.me.mouseX / e.me.width
                    }),
                    this.me.on("mousemove", this, function() {
                        e._during_drag && (e.rate = e.me.mouseX / e.me.width)
                    }),
                    this.me.on("mouseout", this, function() {
                        e._during_drag = !1
                    }),
                    this.me.on("mouseup", this, function() {
                        e._during_drag = !1
                    })
                }
                return Object.defineProperty(t.prototype, "rate", {
                    get: function() {
                        return this._rate
                    },
                    set: function(t) {
                        this._rate = t,
                        this._rate < 0 ? this._rate = 0 : this._rate > 1 && (this._rate = 1),
                        this.me.event("change"),
                        this.bar.width = this._rate * this.me.width,
                        this.point.x = this._rate * this.me.width
                    },
                    enumerable: !0,
                    configurable: !0
                }),
                t.prototype.initset = function(t) {
                    this._rate = t,
                    this._rate < 0 ? this._rate = 0 : this._rate > 1 && (this._rate = 1),
                    this.bar.width = this._rate * this.me.width,
                    this.point.x = this._rate * this.me.width
                }
                ,
                t
            }()
            this.CVbox_templete.visible = false;
            for (let i = 0; i < cfg.item_definition.character.rows_.length; i++) {
                const node = this.CVbox_templete.scriptMap["capsui.UICopy"].getNodeClone();
                this.CV_Cells.push(node);
                node.visible = false;
            }
            for (var n = 0, r = 0, a = (i) => {
                const a = this.CVboxParent.getChildAt(i);
                a.visible = !0,
                a.name = "CVvoice_" + i;
                i % 2 == 0 ? (a.x = -15, a.y = 110 + 110 * n, n++) : (a.x = 510, a.y = 110 + 110 * r, r++)
                const o = cfg.item_definition.character.rows_[i].id;
                this.CVvoice[i] = {
                    slider: new e(this.panel.getChildByName("CVCenter").getChildByName("CharacterVoice").getChildByName(a.name).getChildByName("slider")),
                    btn_mute: this.panel.getChildByName("CVCenter").getChildByName("CharacterVoice").getChildByName(a.name).getChildByName("checkbox").getChildByName("btn"),
                    check: this.panel.getChildByName("CVCenter").getChildByName("CharacterVoice").getChildByName(a.name).getChildByName("checkbox").getChildByName("checkbox"),
                    img: this.panel.getChildByName("CVCenter").getChildByName("CharacterVoice").getChildByName(a.name).getChildByName("Character"),
                    id: o
                },
                this.CVvoice[i].btn_mute.clickHandler = Laya.Handler.create(this, function() {
                    this.locking || (view.AudioMgr.setCVmute(o, !view.AudioMgr.getCVmute(o)),
                    this.refreshCharacterMute(this.CVvoice[i].id))
                }, null, !1),
                this.CVvoice[i].slider.me.on("change", this, function() {
                    this.locking || (view.AudioMgr.setCVvolume(o, this.CVvoice[i].slider.rate),
                    view.AudioMgr.setCVmute(o, !1),
                    this.refreshCharacterMute(this.CVvoice[i].id))
                })
            }, o = 0; o < this.CV_Cells.length; o++)
                a(o)
        };
        uiscript.UI_Config.prototype.CVclone = (...args) => {
            const r = _.call(uiscript.UI_Config.Inst, ...args);
            return r;
        }
    })();
    (() => {
        const _ = function (charID) {
            cfg.item_definition.character.rows_.forEach((char, i) => {
                if (char.id === charID) this.CharacterVocie(i, charID);
            })
        };
        uiscript.UI_Config.prototype.refreshCharacterMute = (...args) => {
            const r = _.call(uiscript.UI_Config.Inst, ...args);
            return r;
        }
    })();
    (() => {
        const _ = function () {
            GameMgr.Inst.BehavioralStatistics(17),
            this.audio_controll.slider.initset(view.AudioMgr.audioVolume),
            this.music_controll.slider.initset(view.AudioMgr.musicVolume),
            this.lizhi_controll.slider.initset(view.AudioMgr.lizhiVolume),
            this.refreshMusicMute(),
            this.refreshAudioMute(),
            this.refreshlizhiMute(),
            this.refreshFps(),
            this.renzhen(),
            this.panelstart();
            for (const id in cfg.item_definition.character.map_) {
                this.refreshCharacterMute(id);
            }
            this.locking = !0,
            this.enable = !0,
            this.click1_controll.check.visible = 0 == view.DesktopMgr.click_prefer,
            this.click2_controll.check.visible = 0 != view.DesktopMgr.click_prefer,
            this.click3_controll.check.visible = 1 == view.DesktopMgr.double_click_pass,
            this.comment_0_controll.check.visible = 0 == GameMgr.Inst.comment_allow,
            this.comment_1_controll.check.visible = 1 == GameMgr.Inst.comment_allow,
            this.comment_2_controll.check.visible = 2 == GameMgr.Inst.comment_allow,
            this.panel.vScrollBar.value = 0,
            this._drag_scroll = !1,
            this._scrollpoint.y = 0;
            for (let i = 0; i < this.CV_Cells.length; i++) {
                const id = cfg.item_definition.character.rows_[i].id;
                const char = cfg.item_definition.character.get(id);
                const skin = cfg.item_definition.skin.get(char.init_skin);
                game.LoadMgr.setImgSkin(this.CVvoice[i].img, skin.path + "/smallhead.png")
            }
            uiscript.UIBase.anim_pop_out(this.root, Laya.Handler.create(this, () => {
                this.locking = false;
            }))
        };
        uiscript.UI_Config.prototype.show = (...args) => {
            const r = _.call(uiscript.UI_Config.Inst, ...args);
            return r;
        }
    })();
    */
    console.log("Majsoul-Character injected."); // tslint:disable-line: no-console
};
inject();
