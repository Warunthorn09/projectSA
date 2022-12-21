import { RoomInterface } from "./IRoom";

export interface BookingInterface{
    ID?: number,
    Room?: RoomInterface,
    RoomID?: number,
    UserID?: number,
    FromDate?: Date,
    ToDate?: Date,
    NumberOfGuests?: number,
    BookingStatus?: string,
    PaymentID?: number,
    Status?: boolean,
}