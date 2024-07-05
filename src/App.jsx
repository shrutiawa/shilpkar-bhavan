import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./components/HelperComp/apolloClient";
import { LocaleProvider } from "./components/HelperComp/localeContextProvider";
import ProtectedRoute from "./components/HelperComp/ProtectedRoute";

import Header from "./components/HeaderComp/header";
import Footer from "./components/FooterComp/footer";
import HomePage from "./components/HomePageComp/HomePage";
import AboutUs from "./components/AboutUsComp/aboutusPage";
import SigninPage from "./components/SignInComp/signinPage";
import SignupPage from "./components/SignUpComp/signupPage";
import ProductListPage from "./components/PLPComp/ProductListPage";
import ProductDetailPage from "./components/PDPComp/ProductDetailPage";
import BlogPage from "./components/BlogPageComp/BlogPage";
import FullBlogPost from "./components/BlogPageComp/FullBlogPost";
import TutorialsPage from "./components/TutorialsPageComp/TutorialsPage";
import ShoppingCart from "./components/ShoppingCartComp/ShoppingCart";
import ShippingAddressForm from "./components/ShoppingCartComp/ShippingAddressForm";
import AddingProduct from "./components/AddProductComp/AddingProduct";
import OrderConfirmation from "./components/OrderComfirmationComp/orderConfirmation";
import OrderHistoryPage from "./components/OrderHistoryComp/OrderHistory";

function App() {
  return (
    <>
      <LocaleProvider>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/product-list" element={<ProductListPage />} />
              <Route path="/product" element={<ProductDetailPage />} />
              <Route path="/cart" element={<ShoppingCart />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/signin" element={<SigninPage />} />
              <Route
                path="/delivery-address"
                element={<ShippingAddressForm />}
              />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/header" element={<Header />} />
              <Route path="/footer" element={<Footer />} />
              <Route path="/tutorials" element={<TutorialsPage />} />
              <Route path="/blogs" element={<BlogPage />} />
              <Route path="/blogcontent" element={<FullBlogPost />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route
                path="/order-history"
                element={
                  <ProtectedRoute>
                    <OrderHistoryPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-product"
                element={
                  <ProtectedRoute>
                    <AddingProduct />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order-confirm"
                element={
                  <ProtectedRoute>
                    <OrderConfirmation />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </BrowserRouter>
        </ApolloProvider>
      </LocaleProvider>
    </>
  );
}

export default App;
