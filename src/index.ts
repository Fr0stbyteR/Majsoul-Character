/// <reference path="./LayaAir.d.ts" />
/// <reference path="./majsoul.d.ts" />
/// <reference path="./index.d.ts" />
if (!window.charMod) {
    window.charMod = {
        servers: [],
        injected: false,
        injectedImg: {},
        newCharactersReady: false,
        newCharacters: [] as NewCharacter[],
        serverMap: {} as { [id: string]: string },
        newServer: (server: string) => {
            window.charMod.newCharactersReady = false;
            window.charMod.servers.push(server);
            fetch(server + "characters.json")
            .then(response => response.json())
            .then((newCharacterNames: string[]) => {
                newCharacterNames.forEach((name, j) => {
                    fetch(server + name + "/manifest.json")
                    .then(response => response.json())
                    .then((char: NewCharacter) => {
                        if (!window.charMod.newCharacters.find(e => e.character.id === char.character.id)) {
                            window.charMod.newCharacters.push(char);
                            window.charMod.serverMap[char.character.id] = server;
                        }
                        if (window.charMod.servers.lastIndexOf(server) === window.charMod.servers.length - 1
                                && j === newCharacterNames.length - 1) {
                            window.charMod.newCharactersReady = true;
                        }
                    }).catch(() => {
                        if (window.charMod.servers.lastIndexOf(server) === window.charMod.servers.length - 1
                                && j === newCharacterNames.length - 1) {
                            window.charMod.newCharactersReady = true;
                        }
                    });
                });
            }).catch(() => {
                if (window.charMod.servers.lastIndexOf(server) === window.charMod.servers.length - 1) {
                    window.charMod.newCharactersReady = true;
                }
            });
        }
    };
}

const SERVER = "https://fr0stbyter.github.io/Majsoul-Character/characters/";
window.charMod.newServer(SERVER);

const SIG_REGEX = /\[([^\[\]]+)\]$/;

let charactersReady = false;
let characterInjected = false;
const getCharacter = () => {
    for (let i = 0; i <= 9; i++) {
        const $ = uiscript.UI_Sushe.characters.findIndex(char => char.charid === 200001 + i);
        if ($ === -1) {
            uiscript.UI_Sushe.characters.push({ charid: 200001 + i, exp: 20000, extra_emoji: [10, 11, 12, 13], is_upgraded: true, level: 5, skin: 400102 + i * 100 });
        } else {
            uiscript.UI_Sushe.characters[$] = { charid: 200001 + i, exp: 20000, extra_emoji: [10, 11, 12, 13], is_upgraded: true, level: 5, skin: 400102 + i * 100 };
        }
        uiscript.UI_Sushe.skin_map[400102 + i * 100] = 1;
        uiscript.UI_Sushe.skin_map[400101 + i * 100] = 1;
    }
};
const toURL = (server: string, fileName: string, charName: string, type: "emo" | "skin" | "full_fetter_skin" | "voice") => {
    return server + charName + "/" + type + "/" + fileName + (type === "voice" ? ".mp3" : ".png");
};
/**
 * Preload image resources
 *
 */
const loadRes = (newChar: NewCharacter) => {
    const injectedImg = window.charMod.injectedImg;
    const prefix = GameMgr.client_language !== "chs" ? GameMgr.client_language + "/" : "";
    for (let i = 0; i < (newChar.emoCount || 0); i++) {
        injectedImg[prefix + newChar.character.emo + "/" + i + ".png"] = toURL(window.charMod.serverMap[newChar.character.id], i.toString(), newChar.character.name, "emo");
    }
    if (newChar.skin) {
        for (const key of ["bighead", "full", "half", "smallhead", "waitingroom"]) {
            injectedImg[prefix + newChar.skin.path + "/" + key + ".png"] = toURL(window.charMod.serverMap[newChar.character.id], key, newChar.character.name, "skin");
        }
    }
    if (newChar.fullFetterSkin) {
        for (const key of ["bighead", "full", "half", "smallhead", "waitingroom"]) {
            injectedImg[prefix + newChar.fullFetterSkin.path + "/" + key + ".png"] = toURL(window.charMod.serverMap[newChar.character.id], key, newChar.character.name, "full_fetter_skin");
        }
    }
    if (newChar.voice) newChar.voice.forEach(voiceDef => voiceDef.path = toURL(window.charMod.serverMap[newChar.character.id], voiceDef.path.split("/").reverse()[0], newChar.character.name, "voice").replace(/\.mp3$/, ""));
};
/**
 * Add character into definition
 *
 */
const injectChar = (newChar: NewCharacter, $: { $char: number, $sushe: number, $skin: number, $voice: number }) => {
    if (!charactersReady || !window.charMod.newCharactersReady) {
        setTimeout(injectChar, 1000, newChar, $);
        return;
    }
    let { $char, $sushe, $skin, $voice } = $; // tslint:disable-line: prefer-const
    cfg.item_definition.character.map_[newChar.character.id] = newChar.character;
    cfg.item_definition.character.rows_[$char] = newChar.character;
    uiscript.UI_Sushe.characters[$sushe] = { charid: newChar.character.id, exp: 20000, extra_emoji: newChar.emoCount > 9 ? Array(newChar.emoCount - 9).fill(0).map((v, i) => i + 9) : [], is_upgraded: true, level: 5, skin: avatar_id === newChar.character.init_skin ? newChar.character.init_skin : newChar.character.full_fetter_skin, views: char_views };
    const defaultSkin = cfg.item_definition.skin.map_[400000];
    if (newChar.skin) {
        $skin++;
        const skin = { ...defaultSkin, ...newChar.skin }
        cfg.item_definition.skin.map_[newChar.skin.id] = skin;
        cfg.item_definition.skin.rows_[$skin] = skin;
        uiscript.UI_Sushe.skin_map[newChar.skin.id] = 1;
    }
    if (newChar.fullFetterSkin) {
        $skin++;
        const skin = { ...defaultSkin, ...newChar.fullFetterSkin };
        cfg.item_definition.skin.map_[newChar.fullFetterSkin.id] = skin;
        cfg.item_definition.skin.rows_[$skin] = skin;
        uiscript.UI_Sushe.skin_map[newChar.fullFetterSkin.id] = 1;
    }
    if (newChar.voice && newChar.voice.length) {
        $voice++;
        cfg.voice.sound.groups_[newChar.character.sound] = newChar.voice;
        for (let i = 0; i < newChar.voice.length; i++) {
            cfg.voice.sound.rows_[$voice + i] = newChar.voice[i];
        }
    } else if (!cfg.voice.sound.groups_[newChar.character.sound]) {
        cfg.voice.sound.groups_[newChar.character.sound] = [];
    }
};
let avatar_id = +localStorage.getItem("avatar_id");
let char_id = +localStorage.getItem("char_id");
let char_views = [] as { slot: number, item_id: number }[];
try {
    char_views = JSON.parse(localStorage.getItem("char_views"));
} catch (e) {}

const inject = () => {
    if (window.charMod.injected) return;
    if (!window.charMod.newCharactersReady || typeof uiscript === "undefined" || !uiscript.UI_Entrance || !uiscript.UI_Sushe || !uiscript.UI_Sushe_Select || !uiscript.UI_OtherPlayerInfo) {
        setTimeout(inject, 1000);
        return;
    }
    window.charMod.newCharacters.forEach(char => loadRes(char));
    /**
     * Override image decryption
     *
     */
    (() => {
        const _ = game.LoadMgr.createResImage_web;
        game.LoadMgr.createResImage_web = (...args) => {
            if (Object.keys(window.charMod.injectedImg).indexOf(args[0]) !== -1) {
                const url = window.charMod.injectedImg[args[0]];
                const resImage = {
                    loaded: false,
                    origin_url: args[0],
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
                Laya.loader.load(url, Laya.Handler.create(game.LoadMgr, (t: any) => { // bypass decode encoded image
                    resImage.blob_url = t,
                    resImage.loaded = true,
                    resImage.success = true;
                    for (let i = 0; i < resImage.complete.length; i++) {
                        resImage.complete && resImage.complete[i].run();
                    }
                    resImage.complete = [];
                }, [url]), null, Laya.Loader.IMAGE);
                game.LoadMgr._resimage[resImage.origin_url] = resImage;
                return;
            }
            const r = _.call(game.LoadMgr, ...args);
            return r;
        };
    })();
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
                const signature = `${GameMgr.Inst.account_data.signature.replace(SIG_REGEX, "")}[${avatar_id}]`;
                GameMgr.Inst.account_data.signature = signature;
                app.NetAgent.sendReq2Lobby("Lobby", "modifySignature", { signature }, (t, e) => {});
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
        let $char: number, $sushe: number, $skin: number, $voice: number;
        const _ = GameMgr.prototype.EnterLobby;
        GameMgr.prototype.EnterLobby = (...args) => {
            charactersReady = true;
            // getCharacter();
            if (!characterInjected) {
                if (!$char) $char = cfg.item_definition.character.rows_.length;
                if (!$sushe) $sushe = uiscript.UI_Sushe.characters.length;
                if (!$skin) $skin = cfg.item_definition.skin.rows_.length;
                if (!$voice) $voice = cfg.voice.sound.rows_.length;
                for (const char of window.charMod.newCharacters) {
                    injectChar(char, { $char, $sushe, $skin, $voice });
                    $char++;
                    $sushe++;
                    if (char.skin) $skin++;
                    if (char.fullFetterSkin) $skin++;
                    if (char.voice && char.voice.length) $voice++;
                }
                uiscript.UI_Config.Inst.CVclone();
                characterInjected = true;
            }
            if (char_id) uiscript.UI_Sushe.main_character_id = char_id;
            const r = _.call(GameMgr.Inst, ...args);
            return r;
        };
    })();
    /**
     * Change font in Sushe
     *
     */
    (() => {
        const changeFont = () => {
            if (GameMgr.client_language === "chs") {
                try {
                    Laya.View.uiMap["lobby/sushe"].child[0].child[1].child[0].props.font = "SimHei";
                    Laya.View.uiMap["lobby/sushe"].child[0].child[1].child[0].props.fontSize = 48;
                    Laya.View.uiMap["lobby/sushe"].child[0].child[1].child[0].props.scaleX = 1;
                    Laya.View.uiMap["lobby/sushe"].child[0].child[1].child[0].props.scaleY = 1;
                    Laya.View.uiMap["lobby/sushe"].child[0].child[1].child[2].props.font = "SimHei";
                    Laya.View.uiMap["lobby/sushe"].child[0].child[1].child[2].props.fontSize = 30;
                    Laya.View.uiMap["lobby/sushe"].child[0].child[1].child[2].props.scaleX = 1;
                    Laya.View.uiMap["lobby/sushe"].child[0].child[1].child[2].props.scaleY = 1;
                    Laya.View.uiMap["lobby/sushe_select"].child[0].child[1].child[0].child[1].child[5].props.font = "SimHei";
                    Laya.View.uiMap["lobby/sushe_select"].child[0].child[1].child[0].child[1].child[5].props.fontSize = 36;
                    Laya.View.uiMap["lobby/sushe_select"].child[0].child[1].child[0].child[1].child[5].props.scaleX = 0.7;
                    Laya.View.uiMap["lobby/sushe_select"].child[0].child[1].child[0].child[1].child[5].props.scaleY = 0.7;
                } catch (e) {
                    setTimeout(changeFont, 1000);
                }
            } else if (GameMgr.client_language === "jp") {
                try {
                    Laya.View.uiMap["lobby/sushe"].child[0].child[2].child[0].props.font = "SimHei";
                    Laya.View.uiMap["lobby/sushe"].child[0].child[2].child[0].props.fontSize = 48;
                    Laya.View.uiMap["lobby/sushe"].child[0].child[2].child[0].props.scaleX = 0.75;
                    Laya.View.uiMap["lobby/sushe"].child[0].child[2].child[0].props.scaleY = 0.75;
                    Laya.View.uiMap["lobby/sushe"].child[0].child[2].child[2].props.font = "SimHei";
                    Laya.View.uiMap["lobby/sushe"].child[0].child[2].child[2].props.fontSize = 30;
                    Laya.View.uiMap["lobby/sushe"].child[0].child[2].child[2].props.scaleX = 1;
                    Laya.View.uiMap["lobby/sushe"].child[0].child[2].child[2].props.scaleY = 1;
                    Laya.View.uiMap["lobby/sushe_select_en"].child[0].child[1].child[0].child[1].child[5].props.font = "SimHei";
                    Laya.View.uiMap["lobby/sushe_select_en"].child[0].child[1].child[0].child[1].child[5].props.fontSize = 36;
                    Laya.View.uiMap["lobby/sushe_select_en"].child[0].child[1].child[0].child[1].child[5].props.scaleX = 0.7;
                    Laya.View.uiMap["lobby/sushe_select_en"].child[0].child[1].child[0].child[1].child[5].props.scaleY = 0.7;
                } catch (e) {
                    setTimeout(changeFont, 1000);
                }
            }
        };
        changeFont();
    })();
    /**
     * Override user character in waiting room
     *
     */
    (() => {
        const _ = uiscript.UI_WaitingRoom.prototype._refreshPlayerInfo;
        uiscript.UI_WaitingRoom.prototype._refreshPlayerInfo = (...args) => {
            const player = args[0] as PlayerBaseView;
            if (player.account_id === GameMgr.Inst.account_data.account_id) {
                player.avatar_id = GameMgr.Inst.account_data.avatar_id;
                _.call(uiscript.UI_WaitingRoom.Inst, ...args);
            } else if (player.account_id) {
                app.NetAgent.sendReq2Lobby("Lobby", "fetchAccountInfo", {
                    account_id: player.account_id
                }, (i, n) => {
                    if (i || n.error) {} else {
                        const matched = n.account.signature.match(SIG_REGEX);
                        if (matched && matched[1]) {
                            const skin = cfg.item_definition.skin.map_[matched[1]];
                            if (skin) {
                                player.avatar_id = matched[1];
                            } else {
                                for (const char of cfg.item_definition.character.rows_) {
                                    if ([char.id.toString(), char.name, char.name_chs, char.name_en, char.name_jp].indexOf(matched[1]) !== -1) {
                                        player.avatar_id = char.full_fetter_skin;
                                    }
                                }
                            }
                        }
                    }
                    _.call(uiscript.UI_WaitingRoom.Inst, ...args);
                });
            } else {
                _.call(uiscript.UI_WaitingRoom.Inst, ...args);
            }
        };
    })();
    (() => {
        const _ = uiscript.UI_WaitingRoom.prototype.updateData;
        uiscript.UI_WaitingRoom.prototype.updateData = (...args) => {
            const r = _.call(uiscript.UI_WaitingRoom.Inst, ...args);
            uiscript.UI_WaitingRoom.Inst.players.forEach((player) => {
                if (player.account_id === GameMgr.Inst.account_data.account_id) {
                    player.avatar_id = GameMgr.Inst.account_data.avatar_id;
                } else if (player.account_id) {
                    app.NetAgent.sendReq2Lobby("Lobby", "fetchAccountInfo", {
                        account_id: player.account_id
                    }, (i, n) => {
                        if (i || n.error) {} else {
                            const matched = n.account.signature.match(SIG_REGEX);
                            if (matched && matched[1]) {
                                const skin = cfg.item_definition.skin.map_[matched[1]];
                                if (skin) {
                                    player.avatar_id = matched[1];
                                } else {
                                    for (const char of cfg.item_definition.character.rows_) {
                                        if ([char.id.toString(), char.name, char.name_chs, char.name_en, char.name_jp].indexOf(matched[1]) !== -1) {
                                            player.avatar_id = char.full_fetter_skin;
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
            });
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
            const step = (player_datas: PlayerBaseView[], index: number): void => {
                if (index >= player_datas.length) return final();
                const player = player_datas[index];
                if (player.account_id === GameMgr.Inst.account_data.account_id) {
                    player.avatar_id = GameMgr.Inst.account_data.avatar_id;
                    const curChar = uiscript.UI_Sushe.main_chara_info;
                    player.character = Object.assign(player.character, curChar);
                    return step(player_datas, index + 1);
                }
                if (player.account_id) {
                    app.NetAgent.sendReq2Lobby("Lobby", "fetchAccountInfo", {
                        account_id: player.account_id
                    }, (i, n) => {
                        if (i || n.error) return step(player_datas, index + 1);
                        const matched = n.account.signature.match(SIG_REGEX);
                        if (matched && matched[1]) {
                            const skin = cfg.item_definition.skin.map_[matched[1]];
                            if (skin) {
                                player.avatar_id = matched[1];
                                const char = uiscript.UI_Sushe.characters.find(c => c.charid === skin.character_id);
                                player.character = Object.assign(player.character, { charid: char.charid, exp: 20000, extra_emoji: char.extra_emoji, is_upgraded: true, level: 5, skin: matched[1] });
                            } else {
                                for (const char of uiscript.UI_Sushe.characters) {
                                    const charDef = cfg.item_definition.character.map_[char.charid];
                                    if ([charDef.id.toString(), charDef.name, charDef.name_chs, charDef.name_en, charDef.name_jp].indexOf(matched[1]) !== -1) {
                                        player.avatar_id = charDef.full_fetter_skin;
                                        player.character = Object.assign(player.character, { charid: char.charid, exp: 20000, extra_emoji: char.extra_emoji, is_upgraded: true, level: 5, skin: char.skin });
                                    }
                                }
                            }
                        }
                        return step(player_datas, index + 1);
                    });
                } else return step(player_datas, index + 1);
            };
            const final = () => _.call(game.Scene_MJ.Inst, ...args);
            step(player_datas, 0);
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
                    const player = n.account as Account;
                    if (player.account_id === GameMgr.Inst.account_data.account_id) {
                        player.avatar_id = GameMgr.Inst.account_data.avatar_id;
                    } else {
                        const matched = player.signature.match(SIG_REGEX) as any;
                        if (matched && matched[1]) {
                            const skin = cfg.item_definition.skin.map_[matched[1]];
                            if (skin) {
                                player.avatar_id = matched[1];
                            } else {
                                for (const char of cfg.item_definition.character.rows_) {
                                    if ([char.id.toString(), char.name, char.name_chs, char.name_en, char.name_jp].indexOf(matched[1]) !== -1) {
                                        player.avatar_id = char.full_fetter_skin;
                                    }
                                }
                            }
                        }
                    }
                    this.label_name.text = player.nickname,
                    this.title.id = player.title,
                    this.level.id = player.level.id,
                    this.level.exp = player.level.score,
                    this.illust.me.visible = !0,
                    this.illust.setSkin(player.avatar_id, "waitingroom"),
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
    /**
     * Override Config CV Center
     *
     */
    (() => {
        class Slider {
            bar: Sprite;
            me: Sprite;
            point: Sprite;
            _rate: number;
            _during_drag: boolean;
            constructor(t: Sprite) {
                this._during_drag = false,
                this.me = t;
                this.bar = this.me.getChildByName("val") as Sprite;
                this.point = this.me.getChildByName("point") as Sprite;
                this.me.on("mousedown", this, () => {
                    this._during_drag = true;
                    this.rate = this.me.mouseX / this.me.width;
                });
                this.me.on("mousemove", this, () => {
                    this._during_drag && (this.rate = this.me.mouseX / this.me.width);
                });
                this.me.on("mouseout", this, () => {
                    this._during_drag = false;
                });
                this.me.on("mouseup", this, () => {
                    this._during_drag = false;
                });
            }
            get rate() {
                return this._rate;
            }
            set rate(rateIn: number) {
                this._rate = rateIn;
                this._rate < 0 ? this._rate = 0 : this._rate > 1 && (this._rate = 1);
                this.me.event("change");
                this.bar.width = this._rate * this.me.width;
                this.point.x = this._rate * this.me.width;
            }
            initset(rateIn: number) {
                this._rate = rateIn;
                this._rate < 0 ? this._rate = 0 : this._rate > 1 && (this._rate = 1);
                this.bar.width = this._rate * this.me.width;
                this.point.x = this._rate * this.me.width;
            }
        }
        const _ = function (this: ConfigUI) {
            this.CVbox_templete.visible = false;
            this.CV_Cells = [];
            this.CVboxParent._childs = [this.CVboxParent.getChildAt(0)];
            cfg.item_definition.character.rows_.forEach((char) => {
                const i = this.CVbox_templete.scriptMap["capsui.UICopy"].getNodeClone();
                this.CV_Cells.push(i);
                i.visible = false;
            });
            for (let n = 0, a = 0, r = 0, s = (i: number) => {
                    const s = this.CVboxParent.getChildAt(i + 1) as Component;
                    s.visible = !0,
                    s.name = "CVvoice_" + i;
                    i % 2 === 0
                        ? (s.x = -15, s.y = 110 + 110 * n, n++)
                        : (s.x = 510, s.y = 110 + 110 * a, a++);
                    const id = cfg.item_definition.character.rows_[i].id;
                    r++;
                    this.CVvoice[i] = {
                        id,
                        slider: new Slider(this.panel.getChildByName("CVCenter").getChildByName("CharacterVoice").getChildByName(s.name).getChildByName("slider") as Component),
                        btn_mute: this.panel.getChildByName("CVCenter").getChildByName("CharacterVoice").getChildByName(s.name).getChildByName("checkbox").getChildByName("btn") as Button,
                        check: this.panel.getChildByName("CVCenter").getChildByName("CharacterVoice").getChildByName(s.name).getChildByName("checkbox").getChildByName("checkbox") as Component,
                        img: this.panel.getChildByName("CVCenter").getChildByName("CharacterVoice").getChildByName(s.name).getChildByName("Character") as Component
                    };
                    this.CVvoice[i].btn_mute.clickHandler = Laya.Handler.create(this, () => {
                        this.locking || (view.AudioMgr.setCVmute(id, !view.AudioMgr.getCVmute(id)),
                        this.CharacterVocie(i, this.CVvoice[i].id));
                    }, null, !1);
                    this.CVvoice[i].slider.me.on("change", this, () => {
                        this.locking || (view.AudioMgr.setCVvolume(id, this.CVvoice[i].slider.rate),
                        view.AudioMgr.setCVmute(id, !1),
                        this.CharacterVocie(i, this.CVvoice[i].id));
                    });
                    this.CharacterVocie(i, this.CVvoice[i].id);
                }, l = 0; l < this.CV_Cells.length; l++) {
                s(l);
            }
        };
        uiscript.UI_Config.prototype.CVclone = (...args) => {
            const r = _.call(uiscript.UI_Config.Inst, ...args);
            (uiscript.UI_Config.Inst.CVboxParent._parent as Component).autoSize = true;
            return r;
        };
    })();
    (() => {
        const _ = uiscript.UI_Config.prototype.show;
        uiscript.UI_Config.prototype.show = (...args) => {
            const cells = uiscript.UI_Config.Inst.CV_Cells;
            uiscript.UI_Config.Inst.CV_Cells = [];
            const r = _.call(uiscript.UI_Config.Inst, ...args);
            uiscript.UI_Config.Inst.CV_Cells = cells;
            cfg.item_definition.character.rows_.forEach((char, i) => {
                game.LoadMgr.setImgSkin(uiscript.UI_Config.Inst.CVvoice[i].img, cfg.item_definition.skin.get(char.init_skin).path + "/smallhead.png");
            });
            return r;
        };
    })();
    /*
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
    window.charMod.injected = true;
};
if (!window.charMod.injected) inject();
