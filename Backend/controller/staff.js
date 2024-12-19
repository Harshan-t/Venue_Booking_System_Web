const db = require("../utils/dbconnection")

class StaffController {
    getuser = async (req, res) => {
        const sql = `SELECT * FROM users`
        const result = await db.query(sql)
        res.json({ users: result[0] })
    }

    getvenues = async (req, res) => {
        const sql = `SELECT * FROM venues`
        const result = await db.query(sql)
        res.json({ venues: result[0] })
    }

    insertnewbooking = async (req, res) => {
        let details = {
            Venue_Name: req.body.Venue_Name,
            Location: req.body.Location,
            Booking_Date: req.body.Booking_Date,
            From_Time: req.body.From_Time,
            To_Time: req.body.To_Time,
            Booked_Capacity: req.body.Booked_Capacity,
            Venue_Capacity: req.body.Venue_Capacity,
            Staffname: req.body.staffname,
            Email: req.body.Email,
            Status: "Awaiting..",
            Description: req.body.Description,
        }
        
        try {
            let sql = `INSERT INTO VenueBookings (Venue_Name, Location, Booking_Date, From_Time, To_Time, Booked_Capacity, Venue_Capacity, Staff, email, Status, Description) VALUES ('${details.Venue_Name}', '${details.Location}', '${details.Booking_Date}', '${details.From_Time}', '${details.To_Time}', '${details.Booked_Capacity}', '${details.Venue_Capacity}', '${details.Staffname}', '${details.Email}', '${details.Status}', '${details.Description}')`

            await db.query(sql)
            res.json({ message: "Booking added successfully" })
        }
        catch (err) {
            res.json({ error: "Error while booking", message: err })
        }
    }

    getbookings = async (req, res) =>{
        const sql = `SELECT * FROM VenueBookings ORDER BY id DESC`
        const result = await db.query(sql)
        res.json({ bookings: result[0] })        
    }

    insertQuery = async (req, res) =>{
        let details = {
            Venue_Name: req.body.Venue_Name,
            subject: req.body.subject,
            comments: req.body.comments,
            staffname: req.body.staffname,
            Email: req.body.Email,
            Status: "Unresolved"
        }

        const sql = `INSERT INTO HELP (name, email, venuename, subject, comments, status) VALUES ('${details.staffname}', '${details.Email}', '${details.Venue_Name}', '${details.subject}', '${details.comments}', '${details.Status}')`
        await db.query(sql)
        res.json({ message: "Query added successfully" })
    }
}

module.exports = new StaffController();