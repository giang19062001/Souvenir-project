import "./datatableproduct.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import baseURL from "../../../baseurl";

const productColumns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "productName", headerName: "Name", width: 150 },
  { field: "productPrice", headerName: "Price", width: 80 },
  { field: "productQuantity", headerName: "Quantity", width: 80 },
  {
    field: "productShortDescription",
    headerName: "Short Description",
    width: 100,
  },
  {
    field: "productLongDescription",
    headerName: "Long Description",
    width: 100,
  },
  {
    field: "productStatus",
    headerName: "Status",
    width: 150,
    renderCell: (params) => {
      if (params.row.productStatus === 1) {
        return (
          <div
            className={`cellWithStatus ${
              params.row.productStatus === 1 ? "InStock" : ""
            }`}
          >
            {"IN STOCK"}
          </div>
        );
      } else if (params.row.productStatus === 2) {
        return (
          <div
            className={`cellWithStatus ${
              params.row.productStatus === 2 ? "OutOfStock" : ""
            }`}
          >
            {"OUT OF STOCK"}
          </div>
        );
      }
    },
  },
  { field: "categoryId", headerName: "Category ID", width: 120 },

  {
    field: "productImage",
    headerName: "Images",
    width: 70,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.productImage} alt="avatar" />
        </div>
      );
    },
  },
];

const DatatableProduct = () => {
  const category = useSelector((state) => state.category);

  const products = useSelector((state) => state.products);

  const dataRows = products.products.map((product) => {
    let image = null;
    if (product.productImage !== null) {
      image = baseURL + product.productImage;
    } else {
      image = require("../../../assets/images/no-image-icon-0.jpg");
    }
    let cate = category.categories.find(
      (e) => e.categoryId === product.categoryId
    );
    return {
      id: product.productId,
      productName: product.productName,
      productPrice: product.productPrice,
      productQuantity: product.productQuantity,
      productShortDescription: product.productShortDescription,
      productLongDescription: product.productLongDescription,
      productStatus: product.productStatus,
      categoryId: product.categoryId,
      productImage: image,
    };
  });

  const productRows = [...dataRows];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/admin/products/edit/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="editButton">Edit</div>
            </Link>

            <Link
              to={`/admin/products/${params.row.id}`}
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
    <div className="datatableproduct">
      <DataGrid
        className="datagridstyle"
        rows={productRows}
        columns={productColumns.concat(actionColumn)}
        pageSize={4}
        rowsPerPageOptions={[9]}
        //checkboxSelection
      />
    </div>
  );
};

export default DatatableProduct;
