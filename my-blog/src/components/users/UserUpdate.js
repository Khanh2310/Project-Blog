import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Label } from "components/label";
import { Input } from "components/label/input";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useFireBaseImage from "hook/useFireBaseImage";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { userRole, userStatus } from "utils/contains";

const UserUpdate = () => {
  const [param] = useSearchParams();
  const userId = param.get("id");

  const { handleSubmit, control, watch, reset, setValue, getValues } =
    useForm();

  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl); // lấy vị trí chính xác của ảnh
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const { deleteImage, onUpLoad, progress, image, setImage } = useFireBaseImage(
    setValue,
    getValues,
    imageName,
    deleteAvatar
  );
  const navigate = useNavigate();
  const handleUpdateUser = async (values) => {
    const colRef = doc(db, "users", userId);
    updateDoc(colRef, {
      name: values.name,
      username: slugify(values.username || values.name, {
        replacement: " ",
        lower: true,
      }),
      email: values.email,
      password: values.password,
      status: values.status,
      avatar: image,
      role: values.role,
    });
    toast.success("Cập nhật thông tin user thành công");
    navigate("/manage/user");
  };
  const watchStatus = watch("status");
  const watchRole = watch("role");

  useEffect(() => {
    async function fetchUpdate() {
      if (!userId) return;
      const colRef = doc(db, "users", userId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    }
    fetchUpdate();
  }, [userId, reset]);

  async function deleteAvatar() {
    const colRef = doc(db, "users", userId);
    await updateDoc(colRef, {
      avatar: "",
    });
  }
  useEffect(() => {
    setImage(imageUrl);
  }, [setImage, imageUrl]);

  return (
    <div>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="w-[200px] h-[200px] mx-auto mb-10 rounded-full ">
          <ImageUpload
            deleteImage={deleteImage}
            onChange={onUpLoad}
            progress={progress}
            image={image}
            className="!rounded-full border-dashed border"
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="name"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.Active}
                value={userStatus.Active}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.Pending}
                value={userStatus.Pending}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.Ban}
                value={userStatus.Ban}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={userRole.MOD}
              >
                Moderator
              </Radio>

              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button kind="secondary" className="mx-auto w-[200px]" type="submit">
          Update User
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
