/// <reference path="./majsoul.d.ts" />
declare interface NewCharacter {
    character: CharacterDef,
    skin?: SkinDef,
    fullFetterSkin?: SkinDef,
    extraSkins?: { [name: string]: SkinDef },
    voice?: VoiceDef[],
    emoCount?: number
}
declare interface Window {
    charMod: {
        /**
         * servers to fetch
         *
         * @type {string[]}
         */
        readonly servers: string[];
        injected: boolean;
        /**
         * image res injected
         *
         * @type {{ [path: string]: string }}
         */
        injectedImg: { [path: string]: string };
        newCharacters: NewCharacter[];
        /**
         * All Server fetched
         *
         * @type {boolean}
         */
        newCharactersReady: boolean;
        /**
         * map of char id => server url
         *
         * @type {{ [id: string]: string }}
         */
        serverMap: { [id: string]: string };
        /**
         * load characters from server
         *
         */
        newServer: (url: string) => void;
    }
}
