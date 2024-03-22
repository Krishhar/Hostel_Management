import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = async () => {
  try {
    // Fetch data from the server
    const response = await fetch('http://localhost:3001/form');
    const tickets = await response.json();
    console.log(tickets)

    // Initialize jsPDF
    const doc = new jsPDF();

    // Define the columns and their titles
    const tableColumn = ["Id", "First Name", "Email", "Outpass For", "Start Date", "End Date", "Status"];
    const tableRows = [];

    // Format date using date-fns
    const formatDate = (dateString) => {
      return new Intl.DateTimeFormat('en-US').format(new Date(dateString));
    };

    // Populate the tableRows array with ticket data
    tickets.forEach((ticket) => {
      const ticketData = [
        ticket._id,
        ticket.firstName,
        ticket.email,
        ticket.outpassFor,
        formatDate(ticket.sDate),
        formatDate(ticket.eDate),
        ticket.status
      ];
      tableRows.push(ticketData);
    });

    // Set the starting position of the table
    const startY = 20;

    // AutoTable function to generate the table
    doc.autoTable(tableColumn, tableRows, { startY });

    // Generate filename based on current date
    const date = new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const filename = `report_${dateString}.pdf`;

    // Set the document title and save the PDF
    doc.text("Outpass Applications Report", 14, 15);
    doc.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

export default generatePDF;
