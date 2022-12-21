import React, { useEffect, useState } from "react";
import { BookingInterface } from "../models/IBooking";
import { CheckOutInterface } from "../models/ICheckOut";
import { AdminInterface } from "../models/IAdmins";
import { FineInterface } from "../models/IFine";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Snackbar, Select, Typography, Button, FormGroup, Checkbox, FormControlLabel, Alert, SelectChangeEvent } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { GetAdminByID } from "../services/HttpClientService";
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';


function CheckOut() {
  const [checkout, setCheckOut] = useState<Partial<CheckOutInterface>>({});
  const [booking, setBooking] = useState<BookingInterface[]>([]);
  const [fine, setFine] = useState<FineInterface[]>([]);
  const [admin, setAdmin] = useState<Partial<AdminInterface>>({ Name: "" });
  const [success, setSuccess] = useState(false);
  const [date, setDate] = useState<Date | null>(new Date());
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false)

  // console.log("open", open)
  // console.log(checkout)

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof checkout;
    setCheckOut({
      ...checkout,
      [name]: event.target.value,
    });
  };

  const openFine = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof checkout;
    setCheckOut({
      ...checkout,
      [name]: event.target.value,
    });
    setOpen((event.target.value) == "1" ? true : false)
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof CheckOut;
    const { value } = event.target;
    setCheckOut({ ...checkout, [id]: value });
  };

  const submit = () => {
    let data = {
      //FromDate: "2021-09-05T00:00:00+07:00",
      //Todae: "2021-09-06T00:00:00+07:00",
      Price: typeof checkout.Price === "string" ? parseFloat(checkout.Price) : 0,
      CheckOutTime: date,
      AdminID: checkout.AdminID,
      FineID: Number(checkout.FineID),
      BookingID: Number(checkout.BookingID),
      //Check_out: null,
      //NumberOfGuests: 2,
      //PaymentID: 3001,
      //USERID: 10001,
      //BookingStatus: "confirm",
    };

    console.log("data", data)
    // fetch POST
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch(`http://localhost:8080/checkouts`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("res", res.data)
          setSuccess(true);
        } else {
          setError(true);
        }
      });
  }

  console.log(checkout)

  //----fatch GET-----------------------
  const apiUrl = "http://localhost:8080";

  const fetchBookings = async () => {
    fetch(`${apiUrl}/bookings`)
      .then(response => response.json())
      .then(res => {
        setBooking(res.data);
      })
  }

  const fetchFines = async () => {
    fetch(`${apiUrl}/fines`)
      .then(response => response.json())
      .then(res => {
        setFine(res.data);
      })
  }

  const fetchAdminByID = async () => {
    let res = await GetAdminByID();
    checkout.AdminID = res.ID;
    if (res) {
      setAdmin(res);
    }
  };


  useEffect(() => {
    fetchBookings();
    fetchFines();
    fetchAdminByID();
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            mt: 2,
          }}
        >
          <Snackbar
            open={success}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity="success">
              บันทึกข้อมูลสำเร็จ
            </Alert>
          </Snackbar>

          <Snackbar
            open={error}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity="error">
              บันทึกข้อมูลไม่สำเร็จ
            </Alert>
          </Snackbar>

          <Typography
            variant="h4"
            style={{ textAlign: "center", color: "#333" }}
          >
            Check-Out
          </Typography>
          <hr style={{ width: "400px", opacity: "0.5" }} />

          {/* BookingID*/}
          <Box
            sx={{
              display: "flex",
              mt: 2,
            }}>
            <Box
              sx={{
                width: "400px",
              }}>
              <Select
                native
                fullWidth
                value={checkout.BookingID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "BookingID",
                }}
              >
                <option aria-label="None" value="">
                  Booking
                </option>
                {booking.map((item: BookingInterface) => (
                  <option value={item.ID}>{item.ID}</option>
                ))}
              </Select>
            </Box>
          </Box>

          {/* Choice */}
          {/* {open && ()} */}
          <Box
            sx={{
              display: "flex",
              mt: 1,
            }}>
            <Box
              sx={{
                width: "400px"
              }}>
              ค่าปรับ
              <Select
                native
                fullWidth
                value={checkout.FineID + ""}
                onChange={openFine}
                inputProps={{
                  name: "FineID",
                }}
              >
                <option aria-label="None" value="">
                  Fines
                </option>
                {fine.map((item: FineInterface) => (
                  <option value={item.ID}>{item.Fine_Choice}</option>
                ))}
              </Select>
            </Box>
          </Box>

          {/*ถ้า open เป็นจริงถึงทำ */}
          {open && (
            <Box
              sx={{
                display: "flex",
                mt: 2,
              }}>
              <Box
                sx={{
                  width: "400px",
                }}>

                <TextField
                  required
                  fullWidth
                  type="number"
                  id="Price"
                  label="ค่าปรับที่ต้องชำระ"
                  InputProps={{ inputProps: { min: 0 } }}
                  // InputLabelProps={{
                  //   shrink: true,
                  // }}
                  value={checkout.Price || ""}
                  onChange={handleInputChange}
                />
              </Box>
            </Box>
          )}


          {/* DateTime */}
          <Box
            sx={{
              display: "flex",
              mt: 2,
            }}>
            <Box
              sx={{
                width: "400px"
              }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => <TextField
                    required
                    fullWidth
                    {...props} />}
                  label="Check-out DateTime"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Box>

          {/* Btn submit */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              style={{ fontSize: "1rem" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              Check-Out
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default CheckOut;