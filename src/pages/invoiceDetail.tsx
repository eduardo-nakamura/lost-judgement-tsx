import { useParams } from "react-router-dom";
import { invoices } from "../assets/mockup";

export default function InvoiceDetail() {
  let params = useParams();
  function getInvoice(number: number) {
    if(number){
      return invoices.find(
        (invoice) => invoice.number === number
      );
    }    
  }
  let invoice = getInvoice(params.invoiceId ? parseInt(params.invoiceId) : 0);
  return (
    <main style={{ padding: "1rem" }}>
      {invoice && (
        <div>
          <h2>Total Due: {invoice.amount}</h2>
          <p>
            {invoice.name}: {invoice.number}
          </p>
          <p>Due Date: {invoice.due}</p>
        </div>
      )}

    </main>
  );
}