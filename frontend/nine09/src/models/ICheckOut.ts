import {AdminInterface} from "./IAdmins";
import { BookingInterface } from "./IBooking";
import { FineInterface } from "./IFine";

export interface CheckOutInterface{
    ID?: number,
    Admin?: AdminInterface,
    AdminID?: string,
    Booking?: BookingInterface,
    BookingID?: number,
    Fine?: FineInterface,
    FineID?: number,
    CheckOutTime?: Date,
    Price?: Float32Array 

}