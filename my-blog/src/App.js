import "./App.css";

import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import SignUpPage from "./pages/SignUp";
import SignInPage from "./pages/SignIn";
import HomePages from "./pages/HomePages";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardLayout from "./components/module/dashboard/DashBoardLayout";
import DashboardPage from "./pages/DashboardPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import PostManage from "./components/module/home/post/PostManage";
import PostAddNew from "./components/module/home/post/PostAddNew";
import UserAddNew from "./components/users/UserAddNew";
import UserProfile from "./components/users/UserProfield";
import CategoryManage from "./components/module/category/CategoryManage";
import CategoryAddNew from "./components/module/category/CategoryAddNew";
import CategoryUpdate from "./components/module/category/CategoryUpdate";
import UserMange from "./components/users/UserMange";
import UserUpdate from "./components/users/UserUpdate";
import PostUpdate from "./components/module/home/post/PostUpdate";
import Category from "./components/module/home/CategoryHome/Category";
const OtherCategory = React.lazy(() =>
  import("./components/module/home/CategoryHome/Category")
);
const App = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<>Loanding</>}>
        <Routes>
          <Route path="/" element={<HomePages></HomePages>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
          <Route
            path="/:slug"
            element={<PostDetailsPage></PostDetailsPage>}
          ></Route>
          <Route path="/category/:slug" element={<Category></Category>}></Route>

          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="/manage/post"
              element={<PostManage></PostManage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<PostAddNew></PostAddNew>}
            ></Route>
            <Route
              path="/manage/update-post"
              element={<PostUpdate></PostUpdate>}
            ></Route>
            <Route
              path="/manage/category"
              element={<CategoryManage></CategoryManage>}
            ></Route>

            <Route
              path="/manage/add-category"
              element={<CategoryAddNew></CategoryAddNew>}
            ></Route>
            <Route
              path="/manage/category-update"
              element={<CategoryUpdate></CategoryUpdate>}
            ></Route>
            <Route
              path="/manage/user"
              element={<UserMange></UserMange>}
            ></Route>
            <Route
              path="/manage/profile"
              element={<UserProfile></UserProfile>}
            ></Route>
            <Route
              path="/manage/user-update"
              element={<UserUpdate></UserUpdate>}
            ></Route>
            <Route
              path="/manage/add-user"
              element={<UserAddNew></UserAddNew>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};
export default App;
