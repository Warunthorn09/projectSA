import { AdminInterface } from "./IAdmins";

export interface RoomInterface{
    ID?: number,
    RoomNumber?: string,
    RoomZoneID?: number,
    RoomTypeID?: number,
    Admin?: AdminInterface,
    AdminID?: number,
}