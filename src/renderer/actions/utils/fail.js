import {log} from "./log";
import {action, status} from "../../stores/installation";

const discordURL = "https://discord.gg/Wv8CQRPj7H";

export default function fail() {
    log("");
    log(`The ${action.value} seems to have failed. If this problem is recurring, join our discord community for support. ${discordURL}`);
    status.set("error");
}