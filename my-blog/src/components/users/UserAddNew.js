import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import slugify from "slugify";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { userRole, userStatus } from "utils/contains";
import useFireBaseImage from "hook/useFireBaseImage";
import { auth, db } from "firebase-app/firebase-config";
import ImageUpload from "components/image/ImageUpload";
import { Field, FieldCheckboxes } from "components/field";
import { Label } from "components/label";
import { Input } from "components/label/input";
import { Radio } from "components/checkbox";
import { Button } from "components/button";

const UserAddNew = () => {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      username: "",
      avatar: "",
      status: userStatus.Active,
      role: userRole.USER,
      createdAt: new Date(),
    },
  });
  const navigate = useNavigate();
  const { image, onUpLoad, deleteImage, progress } = useFireBaseImage(
    setValue,
    getValues
  );
  const handleAddUser = async (values) => {
    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    const colRef = collection(db, "users");
    await addDoc(colRef, {
      name: values.name,
      email: values.email,
      password: values.password,
      username: slugify(values.username || values.name, {
        replacement: " ",
        lower: true,
        trim: true,
      }),
      avatar: image,
      status: Number(values.status),
      role: Number(values.role),
      createdAt: serverTimestamp(),
    });
    toast.success("Tạo tài khoản thành công");
    reset({
      name: "",
      email: "",
      password: "",
      username: "",
      avatar: "",
      status: userStatus.Active,
      role: userRole.USER,
      createdAt: new Date(),
    });
    // navigate("/");
  };
  const watchStatus = watch("status");
  const watchRole = watch("role");

  return (
    <div>
      <form onSubmit={handleSubmit(handleAddUser)}>
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
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
