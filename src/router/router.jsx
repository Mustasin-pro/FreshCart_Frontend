import { createBrowserRouter } from "react-router";
import Home from "../home/Home";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Shop from "../page/Shop";
import ProductDetail from "../page/ProductDetail"; 
import Cart from "../page/Cart";
import ProtectedRoute from "../layout/ProtectedRoute";
import SearchPage from "../search/SearchPage";
import Dashboard from "../dashboard/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "auth/login",
        element: <Login />
    },
    {
        path: "auth/register",
        element: <Register />
    },
    {
        path: "shop",
        element: <Shop />
    },
    {
        path: "product/:id", 
        element: <ProductDetail />
    },
    {
        path: "cart", 
        element: <Cart />
    },
    {
        path: "search", 
        element: <SearchPage />,
    },
    {
        path: "dashboard",
        element: (
            <ProtectedRoute allowedRoles={["customer", "admin", "vendor"]}>
                <Dashboard />
            </ProtectedRoute>
        )
    }
]);

export default router;