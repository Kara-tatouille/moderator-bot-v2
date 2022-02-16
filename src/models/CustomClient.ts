import {Collection as CollectionType, Client} from "discord.js";

export class CustomClient extends Client {
    commands?: CollectionType<string, any>;
}
