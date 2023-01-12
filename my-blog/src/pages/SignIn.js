import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Field } from "../components/field";
import { Label } from "../components/label";
import { Input } from "../components/label/input";
import { useAuth } from "../contexts/auth-context";
import AuthenticationPages from "./AuthenticationPages";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-app/firebase-config";
const SignInPage = () => {
  const { userInfor, setUserInfor } = useAuth();
  const schema = yup.object({
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter your email address"),
    password: yup
      .string()
      .min(8, "Your password must be at least 8 characters or greater")
      .required(""),
  });

  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSignIn = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
    toast.success("Đăng nhập thành công");
  };

  useEffect(() => {
    const newError = Object.values(errors);
    if (newError.length > 0) {
      toast.error(newError[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  useEffect(() => {
    document.title = "Login Page";
    if (userInfor?.email) navigate("/"); // Nếu có đăng nhập thì nó sẽ chuyển đến trang home
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AuthenticationPages>
      <div className="container">
        <NavLink to={"/"}>
          <img
            srcSet="/logo.jpg 2x
        "
            alt="Cow"
            className="logo"
          />
        </NavLink>
        <h1 className="heading">Sign In</h1>
        <form className="form" onSubmit={handleSubmit(handleSignIn)}>
          <Field>
            <Label htmlFor="emailaddress" className="label">
              Email address
            </Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email address"
              control={control}
            ></Input>
          </Field>
          <Field className="signin">
            <Label htmlFor="password" className="label">
              Password
            </Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              control={control}
            ></Input>
          </Field>
          <div className="forgot-password">
            <NavLink>Forgot your password?</NavLink>
          </div>
          <Button type="submit" isLoading={isSubmitting} disable={isSubmitting}>
            Sign In
          </Button>
        </form>
      </div>
    </AuthenticationPages>
  );
};

export default SignInPage;
