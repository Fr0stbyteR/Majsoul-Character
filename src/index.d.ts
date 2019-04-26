/// <reference path="./majsoul.d.ts" />
declare interface NewCharacter {
    character: CharacterDef,
    skin: SkinDef,
    voice: VoiceDef[],
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
        newCharacters: NewCharacter[],
        /**
         * map of char id => server url
         *
         * @type {{ [id: string]: string }}
         */
        serverMap: { [id: string]: string },
        /**
         * register a new server
         *
         */
        newServer: (url: string) => void;
        /**
         * load characters from server
         *
         */
        fetchNewChars: (server: string) => void;
    }
}
