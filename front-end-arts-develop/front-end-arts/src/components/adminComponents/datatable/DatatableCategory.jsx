import "./datatablecategory.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
//import {useParams} from 'react-router'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const categoryColumns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "categoryName", headerName: "Category Name", width: 500 },
  { field: "categoryCode", headerName: "Category Code", width: 200 },
];

const DatatableCategory = () => {
  let navigate = useNavigate();

  // const [success, setSuccess] = useState(false)

  // const api = axios.create({
  //   baseURL: "baseURL + "api/Categories"
  // })

  // const handleDelete = async(id) =>{
  //   await api.delete("/CategoryId?id="+id);
  //   setSuccess(true)
  // }

  // useEffect(() => {
  //   if (success === true) {
  //     navigate("/admin/categories")
  //   }
  // }, [success])

  const categories = useSelector((state) => state.category);

  const dataRows = categories.categories.map((category) => {
    return {
      id: category.categoryId,
      categoryName: category.categoryName,
      categoryCode: category.categoryCode,
    };
  });

  const categoryRows = [...dataRows];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/admin/categories/edit/categoryId" style={{textDecoration:"none"}}> */}
            <Link to={`/admin/categories/edit/${params.row.id}`}>
              <div className="editButton">Edit</div>
            </Link>
            {/* <div className="detailButton">Detail</div> */}

            {/* <div className="deleteButton">Delete</div> */}
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatablecategory">
      <DataGrid
        className="datagridstyle"
        rows={categoryRows}
        columns={categoryColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[9]}
        //checkboxSelection
      />
    </div>
  );
};

export default DatatableCategory;
