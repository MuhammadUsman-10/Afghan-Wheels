import { ReactElement } from "react";
import { Column } from "react-table";
import TableHOC from "./TableHOC";

interface BookingDataType {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile: number;
  fromAddress: string;
  toAddress: string;
  message: string;
  action: ReactElement;
}

const columns: Column<BookingDataType>[] = [
  {
    Header: "First Name",
    accessor: "firstname",
  },
  {
    Header: "Last Name",
    accessor: "lastname",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Mobile",
    accessor: "mobile",
  },
  {
    Header: "From Address",
    accessor: "fromAddress",
  },
  {
    Header: "To Address",
    accessor: "toAddress",
  },
  {
    Header: "Message",
    accessor: "message",
  },
];

const DashboardTable = ({ data }: { data: BookingDataType[] }) => {
  return TableHOC<BookingDataType>(
    columns,
    data,
    "transaction-box",
    "Bookings" // Adjust the title as needed
  )();
};

export default DashboardTable;
