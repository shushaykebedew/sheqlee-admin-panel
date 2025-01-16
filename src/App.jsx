import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./login/Login";
import ForgotPassword from "./login/forgot-password/ForgotPassword";
import NewPassword from "./login/new-password/NewPassword";
import ActivationForm from "./login/activation-form/ActivationForm";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/dashboard/Dashboard";
import JobPosts from "./pages/job-posts/JobPosts";
import Companies from "./pages/companies/Companies";
import Freelancers from "./pages/freelancers/Freelancers";
import Categories from "./pages/categories/Categories";
import Tags from "./pages/tags/Tags";
import Subscribers from "./pages/subscribers/Subscribers";
import SystemConfig from "./pages/system-config/SystemConfig";
import FAQ from "./pages/system-config/faq/FAQ";
import APGSPPTSCP from "./pages/system-config/apgspptscp/APGSPPTSCP";
import Testimonials from "./pages/system-config/testimonials/Testimonials";
import Hero from "./pages/system-config/hero/Hero";
import UpdateHero from "./pages/system-config/hero/update-hero/UpdateHero";
import Footer from "./pages/system-config/footer/Footer";
import Users from "./pages/users/Users";
import AddUser from "./pages/users/add-user/AddUser";
import UpdateUser from "./pages/users/update-user/UpdateUser";
import DashboardJobPosts from "./pages/dashboard/job-posts/DashboardJobPosts";
import DashboardCompanies from "./pages/dashboard/companies/Dashboard_Companies";
import DashboardFreelancers from "./pages/dashboard/freelancers/Dashboard_Freelancers";
import EmailAlerts from "./pages/dashboard/emails/EmailAlerts";
import AddCategory from "./pages/categories/add-category/AddCategory";
import JobApplicantsData from "./pages/job-posts/job-applicants-data/JobApplicantsData";
import UpdateCategory from "./pages/categories/update-category/UpdateCategory";
import AddTag from "./pages/tags/add-tag/AddTag";
import UpdateTag from "./pages/tags/update-tag/UpdateTag";
import CompaniesStats from "./pages/subscribers/companies/CompaniesStats";
import CategoriesStats from "./pages/subscribers/categories/CategoriesStats";
import TagsStats from "./pages/subscribers/tags/TagsStats";
import AddFAQ from "./pages/system-config/faq/add-faq/AddFAQ";
import UpdateFAQ from "./pages/system-config/faq/update-faq/UpdateFAQ";
import UpdateTestimonial from "./pages/system-config/testimonials/update-testimonial/UpdateTestimonial";
import UpdateFooter from "./pages/system-config/footer/update-footer/UpdateFooter";
import Feedbacks from "./pages/feedbacks/Feedbacks";
import EditProfile from "./pages/sidebar/EditProfile";
import UpdateAPGSPPTSCP from "./pages/system-config/apgspptscp/update-apgspptscp/UpdateAPGSPPTSCP";
import JobDetails from "./pages/job-posts/job-details/JobDetails";
import PageNotFound from "./components/page-not-found/PageNotFound";
import { AuthProvider, useAuth } from "./authentication/AuthContext";
import ReadAPGSPPTSCP from "./pages/system-config/apgspptscp/read-apgspptscp/ReadAPGSPPTSCP";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

function AppRoutes() {
  const { isAuthenticated, loginUser } = useAuth();

  return (
    <Routes>
      {/* Login Page */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <Login loginUser={loginUser} />
          )
        }
      />

      {/* Protected Home */}
      <Route
        path="/"
        element={
          isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
        }
      >
        {/* Nested Routes for Home */}
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="job-posts" replace />} />
          <Route path="job-posts" element={<DashboardJobPosts />} />
          <Route path="companies" element={<DashboardCompanies />} />
          <Route path="freelancers" element={<DashboardFreelancers />} />
          <Route path="email-alerts" element={<EmailAlerts />} />
        </Route>
        <Route path="job-posts" element={<JobPosts />}>
          <Route
            path="job-applicants-data/:id?"
            element={<JobApplicantsData />}
          />
          <Route path="job-details/:id?" element={<JobDetails />} />
        </Route>
        <Route path="companies" element={<Companies />} />
        <Route path="freelancers" element={<Freelancers />} />
        <Route path="categories" element={<Categories />}>
          <Route path="add-category" element={<AddCategory />} />
          <Route path="update-category/:catId?" element={<UpdateCategory />} />
        </Route>
        <Route path="tags" element={<Tags />}>
          <Route path="add-tag" element={<AddTag />} />
          <Route path="update-tag/:tagId?" element={<UpdateTag />} />
        </Route>
        <Route path="subscribers" element={<Subscribers />}>
          <Route index element={<Navigate to="companies" replace />} />
          <Route path="companies" element={<CompaniesStats />} />
          <Route path="categories" element={<CategoriesStats />} />
          <Route path="tags" element={<TagsStats />} />
        </Route>
        <Route path="feedbacks" element={<Feedbacks />} />
        <Route path="system-config" element={<SystemConfig />}>
          <Route index element={<Navigate to="faq" replace />} />
          <Route path="faq" element={<FAQ />}>
            <Route path="add-faq" element={<AddFAQ />} />
            <Route path="update-faq/:faqId?" element={<UpdateFAQ />} />
          </Route>
          <Route path="apgspptscp" element={<APGSPPTSCP />}>
            <Route
              path="read-apgspptscp/:pageId?"
              element={<ReadAPGSPPTSCP />}
            />
            <Route
              path="update-apgspptscp/:pageId?"
              element={<UpdateAPGSPPTSCP />}
            />
          </Route>
          <Route path="testimonials" element={<Testimonials />}>
            <Route
              path="update-testimonial/:testimonialId?"
              element={<UpdateTestimonial />}
            />
          </Route>
          <Route path="hero" element={<Hero />}>
            <Route path="update-hero/:sectionId?" element={<UpdateHero />} />
          </Route>
          <Route path="footer" element={<Footer />}>
            <Route
              path="update-footer/:sectionId?"
              element={<UpdateFooter />}
            />
          </Route>
        </Route>
        <Route path="users" element={<Users />}>
          <Route path="add-user" element={<AddUser />} />
          <Route path="update-user/:userId?" element={<UpdateUser />} />
        </Route>
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>

      {/* Forgot Password and Other Pages */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/activation-form" element={<ActivationForm />} />

      {/* Fallback 404 */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
