import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import baseURL from "../../../baseurl";

export const userColumns = [
  { field: "id", headerName: "User ID", width: 70 },
  { field: "userName", headerName: "Name", width: 100 },
  { field: "userFullName", headerName: "Full Name", width: 200 },
  { field: "userEmail", headerName: "Email", width: 150 },
  { field: "userPhone", headerName: "Phone", width: 100 },
  {
    field: "userGender",
    headerName: "Gender",
    width: 80,
    renderCell: (params) => {
      return (
        <div className={`cellWithGender ${params.row.userGender}`}>
          {params.row.userGender ? "Male" : "Female"}
        </div>
      );
    },
  },
  {
    field: "userAvatar",
    headerName: "Avatar",
    width: 80,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.userAvatar} alt="avatar" />
        </div>
      );
    },
  },
  { field: "userAddress", headerName: "Address", width: 150 },
  {
    field: "userRole",
    headerName: "Role",
    width: 80,
    renderCell: (params) => {
      if (params.row.userRole === 1) {
        return (
          <div
            className={`cellWithRole ${
              params.row.userRole === 1 ? "Admin" : ""
            }`}
          >
            {"Admin"}
          </div>
        );
      } else if (params.row.userRole === 2) {
        return (
          <div
            className={`cellWithRole ${
              params.row.userRole === 2 ? "Assistant" : ""
            }`}
          >
            {"Assistant"}
          </div>
        );
      } else {
        return (
          <div
            className={`cellWithRole ${
              params.row.userRole === 3 ? "User" : ""
            }`}
          >
            {"User"}
          </div>
        );
      }
    },
  },
];

const Datatable = () => {
  const users = useSelector((state) => state.users);

  const dataRows = users.users.map((user) => {
    let image = null;
    if (user.userAvatar !== null) {
      image = baseURL + user.userAvatar;
    } else {
      image = require("../../../assets/images/no-image-icon-0.jpg");
    }

    return {
      id: user.userId,
      userName: user.userName,
      userFullName: user.userFullName,
      userEmail: user.userEmail,
      userPhone: user.userPhone,
      userGender: user.userGender,
      userAvatar: image,
      userAddress: user.userAddress,
      userRole: user.userRole,
    };
  });

  const userRows = [...dataRows];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <div className="editButton">Edit</div> */}
            <Link
              to={`/admin/users/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="detailButton">Detail</div>
            </Link>
            {/* <div className="deleteButton">Delete</div> */}
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <DataGrid
        className="datagridstyle"
        rows={userRows}
        columns={userColumns.concat(actionColumn)}
        pageSize={4}
        rowsPerPageOptions={[9]}
        //checkboxSelection
      />
    </div>
  );
};

export default Datatable;
