const express = require('express')
const Router = express.Router
const db = require("../utils/dbconnection")
const router = Router()
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const AdminController = require('../controller/admin');
const staffController = require('../controller/staff')

// User Routes
router.route('/venue')
    .get(staffController.getvenues);

router.route('/users')
    .get(staffController.getuser);

router.route('/staffbookings')
    .post(staffController.insertnewbooking);

router.route('/bookings')
    .get(staffController.getbookings);

router.route('/userqueries')
    .post(staffController.insertQuery);

router.route('/calander')
    .get(staffController.getApprovedBookings);
// Admin Routes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads'); 
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage }).single('photo');

router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

router.route('/venues')
    .get(AdminController.getVenues)
    .post(upload, AdminController.addVenue);

router.route('/bookings/:id/status')
    .put(AdminController.updateBookings);

router.route('/staffpage')
    .get(AdminController.staffDetails);

router.route('/venues/:id')
    .delete(AdminController.deleteVenue);

router.route('/venues/:id')
    .put(upload, AdminController.updateVenue);

router.route('/query')
    .get(AdminController.getQueries)

router.route('/query/:id/status')
    .put(AdminController.updateQueries)



module.exports = router