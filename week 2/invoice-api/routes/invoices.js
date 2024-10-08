const express = require("express");
const {
  creatInvoice,
  getAllInvoices,
  getAnInvoice,
  updateAnInvoice,
  deleteAnInvoice,
} = require("../controllers/invoices");

const router = express.Router();

router.route("/").get(getAllInvoices).post(creatInvoice);
router
  .route("/:id")
  .get(getAnInvoice)
  .put(updateAnInvoice)
  .delete(deleteAnInvoice);

module.exports = router;
