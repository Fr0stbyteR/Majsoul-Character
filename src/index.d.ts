/// <reference path="./majsoul.d.ts" />
declare interface NewCharacter {
    name: string, 
    id: number, 
    skinID: number, 
    voiceID: number, 
    charDef: CharacterDef, 
    skinDef: SkinDef, 
    voiceDef: VoiceDef[], 
    skin: { [key: string]: string }, 
    emo: string[], 
    voice: { [key: string]: string }
}