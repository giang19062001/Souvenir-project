import "./datatableorder.scss"
import { DataGrid  } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'

export const orderColumns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'orderUserId' , headerName : 'User' , width : 150},
  { field: 'orderAddress' , headerName : 'Ship Address' , width : 120},
  // { field: 'orderDescription' , headerName : 'Description' , width : 100},
  { field: 'orderCreateDate' , headerName : 'Create Date' , width : 120},
  { field: 'orderStatus' , headerName : 'Status' , width : 120,
      renderCell:(params) => {
              if(params.row.orderStatus === 1){
                  return(
                      <div className={`cellWithStatus ${params.row.orderStatus === 1 ? "Confirming" : ""}`}>
                      {"CONFIRMING"}
                      </div>
                  )
              }
              else if(params.row.orderStatus === 2){
                  return(
                      <div className={`cellWithStatus ${params.row.orderStatus === 2 ? "OnProcess" : ""}`}>
                      {"ON PROCESS"}
                      </div>
                  )
              }
              else if(params.row.orderStatus === 3){
                  return(
                      <div className={`cellWithStatus ${params.row.orderStatus === 3 ? "OnDelivery" : ""}`}>
                      {"ON DELIVERY"}
                      </div>
                  )
              }
              else if(params.row.orderStatus === 4){
                  return(
                      <div className={`cellWithStatus ${params.row.orderStatus === 4 ? "Delivered" : ""}`}>
                      {"DELIVERED"}
                      </div>
                  )
              }
              else if(params.row.orderStatus === 5){
                  return(
                      <div className={`cellWithStatus ${params.row.orderStatus === 5 ? "Canceled" : ""}`}>
                      {"CANCELED"}
                      </div>
                  )
              }
  }
  },
  { field: 'orderPaymentMethods' , headerName : 'Payment' , width : 130,
      renderCell:(params) => {
              if(params.row.orderPaymentMethods === 1){
                  return(
                      <div className={`cellWithPayment ${params.row.orderPaymentMethods === 1 ? "Credit" : ""}`}>
                      {"CREDIT"}
                      </div>
                  )
              }
              else if(params.row.orderPaymentMethods === 2){
                  return(
                      <div className={`cellWithPayment ${params.row.orderPaymentMethods === 2 ? "Debit" : ""}`}>
                      {"DEBIT CARDS"}
                      </div>
                  )
              }
              else if(params.row.orderPaymentMethods === 3){
                return(
                  <div className={`cellWithPayment ${params.row.orderPaymentMethods === 3 ? "Paypal" : ""}`}>
                  {"Paypal"}
                  </div>
              )
              }    
  }
  },
  { field: 'orderDeliveryType' , headerName : 'Delivery Type' , width : 120,
      renderCell:(params) => {
              if(params.row.orderDeliveryType === 1){
                  return(
                      <div className={`cellWithType ${params.row.orderDeliveryType === 1 ? "Express" : ""}`}>
                      {"Express"}
                      </div>
                  )
              }
              else if(params.row.orderDeliveryType === 2){
                  return(
                      <div className={`cellWithType ${params.row.orderDeliveryType === 2 ? "Post" : ""}`}>
                      {"Post"}
                      </div>
                  )
              }      
  }
  }, 
]



const DatatableOrder = () => {

  const orders = useSelector((state) => state.orders.orders);

  const users = useSelector((state) => state.users.users);
  console.log("user",users)

  const dataRows = orders.map((order) => {
    let user = users.find(e=>e.userId === order.orderUserId )
    
    return {
      id : order.orderId,
      orderUserId : order.orderUserId,
      orderAddress : order.orderAddress,
      orderDescription : order.orderDescription,
      orderCreateDate : order.orderCreateDate,
      orderStatus : order.orderStatus,
      orderPaymentMethods : order.orderPaymentMethods,
      orderDeliveryType : order.orderDeliveryType
    }
  })


  const orderRows = [
    ...dataRows
  ]

  const actionColumn = [
    {field : "action" , headerName: "Action" , width:400,
      renderCell:(params)=>{
        return (
          <div className="cellAction">
            <Link to={`/admin/orders/edit/${params.row.id}`} style={{textDecoration:"none"}}>
              <div className="editButton">Update Status</div>
            </Link>
            <Link to={`/admin/orders/${params.row.id}`} style={{textDecoration:"none"}}>
              <div className="detailButton">Detail</div>
            </Link> 
            {/* <div className="deleteButton">Delete</div> */}
          </div>
        )
      }
    }
  ]


  return (
    <div className="datatableorder">
      <DataGrid
        className="datagridstyle"
        rows={orderRows}
        columns={orderColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[9]}
        //checkboxSelection
      />
    </div>
  )
}

export default DatatableOrder
