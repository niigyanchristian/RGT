import { Router } from "express"
import { creatInvoice, deleteAnInvoice, getAllInvoices, getAnInvoice, updateAnInvoice } from "../controllers/invoice";

const router = Router();

router.route("/")
  .get(getAllInvoices)
  .post(creatInvoice);

router
  .route("/:id")
  .get(getAnInvoice)
  .put(updateAnInvoice)
  .delete(deleteAnInvoice);

module.exports = router;
