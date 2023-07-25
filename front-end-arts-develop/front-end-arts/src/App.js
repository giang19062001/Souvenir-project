import { BrowserRouter,Routes,Route} from "react-router-dom"
import DetailsAdmin from "./pages/adminPages/details/DetailsAdmin";
import HomeAdmin from './pages/adminPages/home/HomeAdmin';
import ListAdmin from "./pages/adminPages/list/ListAdmin";
import EditAdmin from './pages/adminPages/edit/EditAdmin';
import CreateProduct from './pages/adminPages/create/CreateProduct';
import ListProduct from './pages/adminPages/list/ListProduct';
import ListOrder from './pages/adminPages/list/ListOrder';
import ListCategory from './pages/adminPages/list/ListCategory';
import DetailsProduct from './pages/adminPages/details/DetailsProduct';
import EditProduct from './pages/adminPages/edit/EditProduct';
import CreateCategory from './pages/adminPages/create/CreateCategory';
import EditCategory from './pages/adminPages/edit/EditCategory';
import CreateAssistant from "./pages/adminPages/create/CreateAssistant";
import EditOrder from './pages/adminPages/edit/EditOrder';
import DetailsOrder from './pages/adminPages/details/DetailsOrder';
import "./darkstyle/dark.scss"
import {useContext} from 'react'
import { DarkModeContext } from './context/darkModeContext';

import HomeUser from './pages/userPages/homeUser/homeUser'
import PageLogin from "./pages/userPages/loginUser/Login";
import PageRegister from "./pages/userPages/registerUser/Register";
import PageProductDetail from "./pages/userPages/productDetailUser/ProductDetailUser";
import PageCart from "./pages/userPages/cartUser/CartUser";
import PageUser from "./pages/userPages/user/User";
import AboutUser from "./pages/userPages/aboutUser/aboutUser";

function App() {

  const {darkMode} = useContext(DarkModeContext)

  return (
      <div className={darkMode ? "app dark" : "app"}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeUser/>}> </Route>
            <Route path="/login" element = {<PageLogin/>}></Route>
          <Route path="/cart" element = {<PageCart/>}></Route>
          <Route path="/about" element = {<AboutUser/>}></Route>
          <Route path="/user/:id" element = {<PageUser/>}></Route>
          <Route path="/login/register" element = {<PageRegister/>}></Route>   
          <Route path="/product-detail/:id" element = {<PageProductDetail/>}></Route>   

              <Route path="admin" element = {<HomeAdmin/>}></Route>
                <Route path="admin/products">
                  <Route index element={<ListProduct/>}></Route>
                  <Route path=":productId" element={<DetailsProduct title="Details of "/>}></Route>
                  <Route path="create" element={<CreateProduct title="Add new product"/>}></Route>
                  <Route path="edit">
                    <Route path=":productId" element={<EditProduct title="Edit product "/>}></Route>
                  </Route>
                </Route>
                <Route path="admin/categories">
                  <Route index element={<ListCategory/>}></Route>
                  <Route path="create" element={<CreateCategory title="Add new category"/>}></Route>
                  <Route path="edit">
                    <Route path=":categoryId" element={<EditCategory title="Edit category"/>}></Route>
                  </Route>
                </Route>
                <Route path="admin/users">
                  <Route index element={<ListAdmin/>}></Route>
                  <Route path="edit">
                    <Route path=":userId" element={<EditAdmin title="Edit Profile"/>}></Route>
                  </Route>
                  <Route path="create" element={<CreateAssistant title="Add new assistant"/>}></Route>
                  <Route path=":userId" element={<DetailsAdmin title="Detail of "/>}></Route>
                </Route>
                <Route path="admin/orders">
                  <Route index element={<ListOrder/>}></Route>
                  <Route path=":orderId" element={<DetailsOrder title=" Details of "/>}></Route>
                  <Route path="edit">
                    <Route path=":orderId" element={<EditOrder title="Update status "/>}></Route>
                  </Route>
                </Route>
           
           
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App;
