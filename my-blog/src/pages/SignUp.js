import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/button";
import { Field } from "../components/field";
import { Label } from "../components/label";
import IconClose from "../components/label/icon/IconClose";
import IconEye from "../components/label/icon/IconEye";
import * as yup from "yup";
import { Input } from "../components/label/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-app/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import AuthenticationPages from "./AuthenticationPages";
import slugify from "slugify";
import { userRole, userStatus } from "../utils/contains";
// const SignUpStyled = styled.div``;
const SignUpPage = () => {
  const [toggleShowIcon, setToggleShowIcon] = useState(false);
  const navigate = useNavigate();
  const schema = yup.object({
    fullname: yup.string().required("Please enter your fullname"),
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter your email address"),
    password: yup
      .string()
      .min(8, "Your password must be at least 8 characters or greater")
      .required(""),
  });
  const {
    control,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const arrError = Object.values(errors);
    if (arrError.length > 0) {
      toast.error(arrError[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  const onSubmit = async (values) => {
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    updateProfile(auth.currentUser, {
      displayName: values.fullname,
    });
    const colRef = collection(db, "users");
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      name: values.fullname,
      email: values.email,
      id: auth.currentUser.uid,
      password: values.password,
      username: slugify(values.fullname, { lower: true }),
      avatar:
        "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      status: userStatus.Active,
      role: userRole.USER,
      createdAt: serverTimestamp(),
    });
    // addDoc(colRef, {
    //   name: values.fullname,
    //   email: values.email,
    //   password: values.password,
    // });

    toast.success("Đăng kí tài khoản thành công");
    navigate("/");
  };

  useEffect(() => {
    document.title = "Register Page";
  });

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
        <h1 className="heading">SignUp</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <Label htmlFor="fullname" className="label">
              Fullname
            </Label>
            <Input
              type="text"
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="email" className="label">
              Email address
            </Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email address"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="password" className="label">
              Password
            </Label>
            <Input
              type={toggleShowIcon ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              control={control}
            >
              {!toggleShowIcon ? (
                <IconClose
                  className="icon-eye "
                  onClick={() => setToggleShowIcon(true)}
                ></IconClose>
              ) : (
                <IconEye
                  className="icon-eye"
                  onClick={() => setToggleShowIcon(false)}
                ></IconEye>
              )}
            </Input>
          </Field>
          <div className="flex items-end right-0 translate-x-0 mb-2 justify-end -translate-y-[100%]">
            <span>You already have an account?</span>
            <NavLink to={"/sign-in"} className="text-[#996633] pl-1">
              Login
            </NavLink>
          </div>
          <Button
            kind="secondary"
            type="submit"
            isLoading={isSubmitting}
            disable={isSubmitting}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </AuthenticationPages>
  );
};
export default SignUpPage;
