export type TNeedLogin = (code: string) => boolean;
export type TDoLogin = () => Promise<void>;
