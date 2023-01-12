import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

export default function useFireBaseImage(
  setValue,
  getValues,
  imageName = null,
  cb = null
) {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");

  const handleupLoadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progresPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progresPercent);

        console.log("Upload is " + progress + "% done");
        // eslint-disable-next-line default-case
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };
  // vì onChange nên khi chúng ta chỉ cần chọn cái là nó up ảnh rồi, nên chúng ta tạo 1 function mới để, khi chúng ta submit thì nó mới đăng ảnh
  const onUpLoad = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file.name);
    handleupLoadImage(file);
  };
  const deleteImage = () => {
    const storage = getStorage();
    const desertRef = ref(
      storage,
      "images/" + (imageName || getValues("image_name"))
    );
    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        console.log("Xóa ảnh thành công");
        setImage("");
        setProgress(0);
        cb && cb();
      })
      .catch((error) => {
        console.log("Xóa thất bại");
      });
  };
  return {
    image,
    deleteImage,
    onUpLoad,
    progress,
    setImage,
  };
}
