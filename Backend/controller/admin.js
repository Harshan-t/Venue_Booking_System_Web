const db = require("../utils/dbconnection")
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "vijaykrishnaa.cs23@bitsathy.ac.in",
        pass: "qbfhhetbbtidbyyd",
    },
});

class AdminController {
    staffDetails = async (req, res) => {
        const query = "SELECT * FROM staffdetails";
        try {
            const result = await db.query(query);
            res.json({ staffdetails: result[0] });
        } catch (error) {
            console.error("Error fetching staff details:", error);
            res.status(500).json({ message: "An error occurred while fetching staff details" });
        }
    }

    deleteVenue = async (req, res) => {
        try {
            const { id } = req.params;
            const query = "DELETE FROM venues WHERE id = ?";
            const [result] = await db.query(query, [id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Venue not found" });
            }
            res.json({ message: "Venue deleted successfully" });
        } catch (error) {
            console.error("Error during deletion:", error);
            res.status(500).json({ message: "An error occurred while deleting the venue" });
        }
    }

    getVenues = async (req, res) => {
        const query = "SELECT * FROM venues";
        try {
            const result = await db.query(query);
            const venuesWithPhotoUrl = result[0].map((venue) => ({
                ...venue,
                photo: venue.photo ? `http://localhost:8000${venue.photo}` : null 
            }));
            res.json({ venues: venuesWithPhotoUrl });
        } catch (error) {
            console.error("Error fetching venues:", error);
            res.status(500).json({ message: "An error occurred while fetching venues" });
        }
    }

    addVenue = async (req, res) => {
        try {
            const { name, type, location, capacity, projector, ac, micAndSpeaker } = req.body;
            const photo = req.file ? `/uploads/${req.file.filename}` : null;

            if (!photo) {
                return res.status(400).json({ message: 'Photo is required.' });
            }

            const projectorValue = projector === "Yes" ? 1 : 0;
            const acValue = ac === "Yes" ? 1 : 0;
            const micAndSpeakerValue = micAndSpeaker === "Yes" ? 1 : 0;

            const query = `
                    INSERT INTO venues (name, type, location, capacity, projector, ac, micAndSpeaker, photo)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                `;
            const [result] = await db.query(query, [
                name, type, location, capacity, projectorValue, acValue, micAndSpeakerValue, photo
            ]);

            res.status(201).json({ message: 'Venue added successfully', id: result.insertId, photo });
        } catch (error) {
            console.error('Error adding venue:', error);
            res.status(500).json({ message: 'An error occurred while adding the venue' });
        }
    }

    updateVenue = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, type, location, capacity, projector, ac, micAndSpeaker } = req.body;

            const venueQuery = "SELECT * FROM venues WHERE id = ?";
            const [venueResult] = await db.query(venueQuery, [id]);
            if (venueResult.length === 0) {
                return res.status(404).json({ message: "Venue not found" });
            }

            const photo = req.file ? `/uploads/${req.file.filename}` : venueResult[0].photo;

            const projectorValue = projector === "Yes" ? 1 : 0;
            const acValue = ac === "Yes" ? 1 : 0;
            const micAndSpeakerValue = micAndSpeaker === "Yes" ? 1 : 0;

            const updateQuery = `
                    UPDATE venues
                    SET name = ?, type = ?, location = ?, capacity = ?, projector = ?, ac = ?, micAndSpeaker = ?, photo = ?
                    WHERE id = ?
                `;
            const [updateResult] = await db.query(updateQuery, [
                name, type, location, capacity, projectorValue, acValue, micAndSpeakerValue, photo, id
            ]);

            if (updateResult.affectedRows === 0) {
                return res.status(404).json({ message: "Venue not found" });
            }

            res.json({ message: 'Venue updated successfully', photo: photo });
        } catch (error) {
            console.error("Error updating venue:", error);
            res.status(500).json({ message: "An error occurred while updating the venue" });
        }
    }

    updateBookings = async (req, res) => {
        const { id } = req.params;
        const { status, reason } = req.body;

        if (status !== 'Approved' && status !== 'Rejected') {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        try {
            if (status === 'Rejected' && !reason) {
                return res.status(400).json({ message: 'Rejection reason is required when status is Rejected' });
            }

            const query = "UPDATE VenueBookings SET Status = ?, rejection_reason = ? WHERE id = ?";
            const [result] = await db.query(query, [status, status === 'Rejected' ? reason : null, id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Booking not found' });
            }

            if (status === 'Rejected') {
                const bookingQuery = "SELECT * FROM VenueBookings WHERE id = ?";
                const [bookingResult] = await db.query(bookingQuery, [id]);

                if (bookingResult.length === 0) {
                    return res.status(404).json({ message: 'Booking not found for sending email' });
                }

                const booking = bookingResult[0];

                const mailOptions = {
                    from: "vijaykrishnaa.cs23@bitsathy.ac.in",
                    to: booking.email,
                    subject: `Booking Rejected for ${booking.Venue_Name}`,
                    text: `
                            Dear ${booking.Staff},
                        
                            Your booking request for the venue "${booking.Venue_Name}" on ${new Date(booking.Booking_Date).toLocaleDateString()} has been rejected.
                            
                            Reason for rejection: ${reason}
                        
                            If you have any further questions, feel free to contact us.
                        
                            Regards,
                            Venue Booking Team
                        `,
                };

                try {
                    await transporter.sendMail(mailOptions);
                    console.log("Rejection email sent successfully");
                } catch (emailError) {
                    console.error("Error sending email:", emailError);
                    return res.status(500).json({ message: 'Error sending rejection email' });
                }
            }

            res.json({ message: 'Booking status updated successfully' });
        } catch (error) {
            console.error("Error updating status:", error);
            res.status(500).json({ message: "An error occurred while updating the status" });
        }
    }

    getQueries = async (req, res) => {
        const query = "SELECT * FROM HELP";
        try {
            const result = await db.query(query);
            res.json({ HELP: result[0] });
        } catch (error) {
            console.error("Error fetching bookings:", error);
            res.status(500).json({ message: "An error occurred while fetching bookings" });
        }
    }

    updateQueries = async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        if (status !== 'Resolved') {
            return res.status(400).json({ message: 'Invalid status. Only "Resolved" is allowed.' });
        }

        try {
            const updateQuery = "UPDATE HELP SET Status = ? WHERE id = ?";
            const [updateResult] = await db.query(updateQuery, [status, id]);

            if (updateResult.affectedRows === 0) {
                return res.status(404).json({ message: "Query not found" });
            }

            const fetchQuery = "SELECT * FROM HELP WHERE id = ?";
            const [queryResult] = await db.query(fetchQuery, [id]);

            if (queryResult.length === 0) {
                return res.status(404).json({ message: "Failed to retrieve updated query details" });
            }

            const queryData = queryResult[0];

            const mailOptions = {
                from: "vijaykrishnaa.cs23@bitsathy.ac.in",
                to: queryData.email,
                subject: `Your Query Status: Resolved`,
                html: `
                    <p>Dear ${queryData.name},</p>
                    <p>Your feedback/query has been marked as <strong>Resolved</strong>.</p>
                    <p>Details:</p>
                    <ul>
                        <li><strong>Venue Name:</strong> ${queryData.venuename}</li>
                        <li><strong>Subject:</strong> ${queryData.subject}</li>
                        <li><strong>Comments:</strong> ${queryData.comments}</li>
                    </ul>
                    <p>Thank you for reaching out. If you have further questions, feel free to contact us.</p>
                    <p>Best regards,<br>Your Support Team</p>
                `
            };

            await transporter.sendMail(mailOptions);

            res.json({ message: "Status updated to Resolved and email sent successfully." });

        } catch (error) {
            console.error("Error updating status or sending email:", error);
            res.status(500).json({ message: "An internal server error occurred." });
        }
    }
}

module.exports = new AdminController()