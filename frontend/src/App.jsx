import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Common/Sidebar";

{
  /* Farmer Pages imports */
}
import OtpPage from "./Common/pages/otpPage";
import PaySuccess from "./farmer/utills/PaySuccess";
import {
  FarmerHome,
  CropsHome,
  ViewCrop,
  ErrorPage,
  CropEdit,
  AddCropPage,
  OrdersPage,
  Schedule,
  LandingPage,
  TestPage,
  TaskCard,
  EditTasksModal,
  ExpertsPage,
  BlogPage,
  OrderUpdate,
  AllLocations,
  ChatBotPage,
} from "./farmer/pages";

//Farmer ecommerce store

import {
  HomePagefEcom,
  ProductsPagefEcom,
  CartPagefEcom,
  OverviewPagefEcom,
} from "./farmer_ecommerce/pages";

import SearchLocation from "./farmer/unregistered/SearchLocation";

//import LandingPage from "./farmer/pages/LandingPage";

/*Import Researcher's pages */
import HomeResearcher from "./researcher/pages/HomeResearcher";
import Blog from "./researcher/pages/Blog";
import MyNews from "./researcher/pages/MyNews";
import BlogNews from "./researcher/pages/BlogNews";
import SingleNewsPage from "./researcher/pages/SingleNewsPage";
import MyQnA from "./researcher/pages/MyQnA";
import ReplyQnA from "./researcher/pages/ReplyQnA";
import MyGrowingGuide from "./researcher/pages/MyGrowingGuide";
import GrowingGuideBlog from "./researcher/pages/GrowingGuideBlog";
import SingleGrowingGuide from "./researcher/pages/SingleGrowingGuide";
import BlogCrop from "./researcher/pages/BlogCrop";
import BlogCropDetails from "./researcher/pages/BlogCropDetails";
import GrowingGuideUpdate from "./researcher/pages/GrowingGuideUpdate";
import NewsUpdate from "./researcher/pages/NewsUpdate";
import QnABlog from "./researcher/pages/QnABlog";
import MyStats from "./researcher/pages/MyStats";
import MyPnd from "./researcher/pages/MyPnd";
import PnDUpdate from "./researcher/pages/PnDUpdate";
import PnDBlog from "./researcher/pages/PnDBlog";
import SinglePndPage from "./researcher/pages/SinglePndPage";
import Publications from "./researcher/pages/Publications";
import PublicationsBlog from "./researcher/pages/PublicationsBlog";

/* Admin pages */
import {
  LoginPage,
  RegisterPage,
  AdminDashboard,
  FarmerManagement,
  UserManagement,
  ViewUser,
  EditUser,
  DeleteUser,
  CreateUser,
  AdminManagament,
  CustomerManagement,
  SellerManagement,
  ResearchersManagement,
  AboutUs,
  HomePage,
  ContactUsPage,
  ServicesPage,
  BlogsPage,
  CreateQuestion,
  QuestionManagement,
  ViewQuestions,
  QuestionDetails,
  ReplyQuestion,

  // new question routes
  QuestionDash,
  WorkingIssue,
  GeneralInquiry,
  AccountIssue,
  TechnicalSupport,
  OtherQuestion,
  // report management routes
  ReportManagementDash,
  // deliveryPerson management route
  DeliveryPersonManagement,

} from "./admin/pages";

/* retail seller page imports  */

import SellerHome from "./seller/pages/sellerHP";
import SellerInventroy from "./seller/pages/sellerInventroy";

//import customer routes
import Home from "./customer/pages/Home";
import SellerBulkOrders from "./seller/pages/sellerBulkOrders";

import DashboardPage from "./customer/pages/DashboardPage";
import Cus_LandingBanner from "./customer/components/Cus_LandingBanner";
import CheckoutPage from "./customer/pages/CheckoutPage";
import OrderhistoryPage from "./customer/pages/OrderhistoryPage";
import ChartPage from "./customer/pages/ChartPage";
import ConfirmPage from "./customer/pages/ConfirmPage";
import CategoryPage from "./customer/pages/CategoryPage";
import ProductDetailsPage from "./customer/pages/ProductDetailsPage";
import FeedbackPage from "./customer/pages/FeedbackPage";

//

import SellerNormalOrders from "./seller/pages/sellerNormalOrders";
import FinalizeOrder from "./seller/pages/sellerfinalizeOrder";
import SellerStat from "./seller/pages/sellerStat";
import BulkOrderSummary from "./seller/pages/sellerBulkOrderSummary";
import FarmerList from "./seller/pages/farmers";
import DiliveryDash from "./seller/pages/diliveryGuy/diliveryGuyDash";
import AboutUsPage from "./Common/pages/AboutUsPage";
import MapEdit from "./farmer/mapComponents/MapEdit";
import AgroDetails from "./seller/pages/sellerAgroDetails";
import TrackPage from "./farmer/mapComponents/components/TrackPage";
import RestPasswordPage from "./Common/pages/RestPasswordPage";
import MapComponent from "./seller/pages/farmerFiledMap";

// import UserManagement from "./admin/pages/UserManagement";

function App() {
  return (
    <Routes>
      <Route path="/test" element={<Sidebar />} />

      {/* Farmer Router */}

      <Route path="/farmer/:uid/dashboard" element={<FarmerHome />} />
      <Route path="/farmer/:uid/cropProducts" element={<CropsHome />} />
      <Route path="/farmer" element={<LandingPage />} />
      <Route path="/farmer/:uid/viewCrop/:cid" element={<ViewCrop />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/farmer/:uid/crop/edit/:cid" element={<CropEdit />} />
      <Route path="/farmer/crop/addCrop" element={<AddCropPage />} />
      <Route path="/farmer/:uid/orders" element={<OrdersPage />} />
      <Route path="/farmer/:uid/schedule" element={<Schedule />} />
      <Route path="/farmer/test" element={<TestPage />} />
      <Route path="/farmer/:uid/experts" element={<ExpertsPage />} />
      <Route path="/farmer/:uid/addTask" element={<TaskCard />} />
      <Route path="/farmer/:uid/editTask/:tid" element={<EditTasksModal />} />
      <Route path="/farmer/Blogs" element={<BlogPage />} />
      <Route path="/farmer/:uid/allLocations" element={<AllLocations />} />
      <Route path="/farmer/:uid/addMap" element={<SearchLocation />} />
      <Route path="/farmer/:uid/order/:oid/update" element={<OrderUpdate />} />
      <Route path="/farmer/:uid/Location/:mid/update" element={<MapEdit />} />
      <Route path="/farmer/:uid/chatBot" element={<ChatBotPage />} />

      {/* farmer e-commerce Pages */}

      <Route path="/farmer/shop/products" element={<ProductsPagefEcom />} />

      {/* Common Pages */}
      <Route path="/otp/send" element={<OtpPage />} />
      <Route path="/track/location" element={<TrackPage />} />
      {/* <Route path="/aboutUs" element={<AboutUsPage />} /> */}
      <Route path="/payment/success/:id" element={<PaySuccess />} />
      <Route path="/forgetPassword/:uid" element={<RestPasswordPage />} />

      {/* Auth Router */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />

      {/* Admin Routers */}
      <Route path="/admin/:id/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/user-management" element={<UserManagement />} />
      <Route
        path="/admin/user-management/farmer"
        element={<FarmerManagement />}
      />
      <Route
        path="/admin/user-management/customers"
        element={<CustomerManagement />}
      />
      <Route
        path="/admin/user-management/user/create"
        element={<CreateUser />}
      />
      <Route
        path="/admin/user-management/user/create"
        element={<CreateUser />}
      />
      <Route
        path="/admin/user-management/user/view/:id"
        element={<ViewUser />}
      />
      <Route
        path="/admin/user-management/user/edit/:id"
        element={<EditUser />}
      />
      <Route
        path="/admin/user-management/user/delete/:id"
        element={<DeleteUser />}
      />
      <Route
        path="/admin/user-management/admins"
        element={<AdminManagament />}
      />
      <Route
        path="/admin/user-management/sellers"
        element={<SellerManagement />}
      />
      <Route
        path="/admin/user-management/researchers"
        element={<ResearchersManagement />}
      />
      <Route
        path="/admin/user-management/deliveryPerson"
        element={<DeliveryPersonManagement />}
      />

      {/* Question routes new */}
      <Route path="/admin/question-dash" element={<QuestionDash />} />

      <Route
        path="/admin/question-management/working-issue"
        element={<WorkingIssue />}
      />
      <Route
        path="/admin/question-management/general-inquiry"
        element={<GeneralInquiry />}
      />
      <Route
        path="/admin/question-management/account-issue"
        element={<AccountIssue />}
      />
      <Route
        path="/admin/question-management/technical-support"
        element={<TechnicalSupport />}
      />
      <Route
        path="/admin/question-management/other"
        element={<OtherQuestion />}
      />

      <Route path="/admin/ques" element={<QuestionManagement />} />
      <Route path="/admin/test/ques" element={<CreateQuestion />} />
      <Route path="/admin/view-questions/:id" element={<ViewQuestions />} />
      <Route
        path="/admin/question-details/:qid"
        element={<QuestionDetails />}
      />
      <Route path="/admin/reply-question/:qid" element={<ReplyQuestion />} />

      {/* Report Management */}
      <Route path="/admin/report-dash" element={<ReportManagementDash />} />

      {/* Home page components */}
      <Route path="/contact" element={<ContactUsPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path="/" element={<HomePage />} />

      {/* Researcher Routes */}
      <Route path="/researcher" element={<HomeResearcher />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/researcher/my-news" element={<MyNews />} />
      <Route path="/blog/news" element={<BlogNews />} />
      <Route path="/blog/news/:id" element={<SingleNewsPage />} />
      <Route path="/researcher/my-qna" element={<MyQnA />} />
      <Route path="/researcher/my-qna/reply/:id" element={<ReplyQnA />} />
      <Route path="/researcher/my-growing-guide" element={<MyGrowingGuide />} />
      <Route path="/blog/growing-guide" element={<GrowingGuideBlog />} />
      <Route path="/blog/growing-guide/:id" element={<SingleGrowingGuide />} />

      <Route path="/blog/crop" element={<BlogCrop />} />
      <Route path="/blog/crop/:id" element={<BlogCropDetails />} />
      <Route path="/researcher/my-growing-guide/update" element={<GrowingGuideUpdate />} />
      <Route path="/researcher/my-news/update" element={<NewsUpdate />} />
      <Route path="/blog/qna" element={<QnABlog />} />
      <Route path="/researcher/my-stats" element={<MyStats />} />
      <Route path="/researcher/my-pnd" element={<MyPnd />} />
      <Route path="/researcher/my-pnd/update" element={<PnDUpdate />} />
      <Route path="/blog/pest-and-disease" element={<PnDBlog />} />
      <Route path="/blog/pest-and-disease/:id" element={<SinglePndPage />} />
      <Route path="/blog/crop" element={<BlogCrop />} />
      <Route path="/blog/crop/:id" element={<BlogCropDetails />} />
      <Route path="/researcher/my-growing-guide/update" element={<GrowingGuideUpdate />} />
      <Route path="/researcher/my-news/update" element={<NewsUpdate />} />
      <Route path="/blog/qna" element={<QnABlog />} />
      <Route path="/researcher/my-stats" element={<MyStats />} />
      <Route path="/researcher/my-pnd" element={<MyPnd />} />
      <Route path="/researcher/my-growing-guide/update" element={<GrowingGuideUpdate />} />
      <Route path="/researcher/my-news/update" element={<NewsUpdate />} />
      <Route path="/blog/qna" element={<QnABlog />} />
      <Route path="/researcher/publications" element={<Publications />} />
      <Route path="/blog/publications" element={<PublicationsBlog />} />

      {/* Retail seller Router */}

      <Route path="/seller/:sid/home" element={<SellerHome />} />
      <Route path="/seller/:sid/Inventroy" element={<SellerInventroy />} />
      <Route path="/seller/:sid/bulkOrders" element={<SellerBulkOrders />} />
      <Route
        path="/seller/:sid/normalOrders"
        element={<SellerNormalOrders />}
      />
      <Route path="/seller/:sid/placeOrder" element={<FinalizeOrder />} />
      <Route path="/seller/:sid/stat" element={<SellerStat />} />
      <Route path="/seller/stat" element={<SellerStat />} />
      <Route path="/seller/BulkOrder/:orderId" element={<BulkOrderSummary />} />
      <Route path="/seller/:sid/farmers" element={<FarmerList />} />
      <Route path="/diliveryGuy/dash" element={<DiliveryDash />} />
      <Route path="/seller/:sid/news" element={< AgroDetails />} />
      <Route path="/seller/farmerFields/:fid" element={<MapComponent />} />

      {/* Customer Routes */}

      {/* <Route path='/products-Category/:categoryName' element={<CategoryPage />} />
        <Route path='/Home/Checkout' element={<CheckoutPage />} />
        <Route path='/user/Dashboard' element={<DashboardPage />} /> */}

      <Route path="/Customer/:cid" element={<Home />} />
      <Route path="/CusLanding" element={<Cus_LandingBanner />} />
      <Route path="/Customer/Dashboard/:cid" element={<DashboardPage />} />
      <Route path="/Home/Checkout/:cid" element={<CheckoutPage />} />
      <Route
        path="/Customer/Orderhistory/:cid"
        element={<OrderhistoryPage />}
      />
      <Route path="/Customer/FeedbackPage/:cid" element={<FeedbackPage />} />
      <Route path="/Customer/ChartPage/:cid" element={<ChartPage />} />

      <Route path="/Customer/ConfirmPage" element={<ConfirmPage />} />
      <Route
        path="/Customer/products-Category/:categoryName/:cid"
        element={<CategoryPage />}
      />
      <Route
        path="/Customer/ProductDetailsPage/:cid"
        element={<ProductDetailsPage />}
      />
    </Routes>
  );
}

export default App;
