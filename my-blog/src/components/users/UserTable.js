import { async } from "@firebase/util";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-app/firebase-config";
import { userRole, userStatus } from "../../utils/contains";
import ActionDelete from "../action/ActionDelete";
import ActionEdit from "../action/ActionEdit";
import Swal from "sweetalert2";
import LabelStatus from "../label/LabelStatus";
import Table from "../table/Table";
import { useAuth } from "../../contexts/auth-context";
const UserTable = () => {
  const [userLists, setUserLists] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
        setUserLists(results);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigate = useNavigate();
  const renderStatus = (status) => {
    switch (status) {
      case userStatus.Active:
        return <LabelStatus type="success">Active</LabelStatus>;
      case userStatus.Pending:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case userStatus.Ban:
        return <LabelStatus type="danger">Ban</LabelStatus>;
      default:
        break;
    }
  };

  // optimaze role
  const renderRole = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return <LabelStatus type="success">Admin</LabelStatus>;
      case userRole.MOD:
        return <LabelStatus type="warning">MoD</LabelStatus>;
      case userRole.USER:
        return <LabelStatus type="danger">User</LabelStatus>;
      default:
        break;
    }
  };

  // delete user
  const handleDelete = async (userId) => {
    const colRef = doc(db, "users", userId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
    // deleteDoc();
  };
  const { userInfor } = useAuth();
  if (userInfor.role !== userRole.ADMIN) return;
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Username</th>
            <th>Email address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userLists &&
            userLists.length > 0 &&
            userLists.map((items) => (
              <tr key={items.id}>
                <td title={items.id}>{items?.id.slice(0, 6) + "..."}</td>
                <td className="whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        items?.avatar ||
                        "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                      }
                      alt="Avatar"
                      className="w-[50px] object-cover rounded-full "
                    />
                    <div className="gap-3">
                      <h3 title={items?.name}>
                        {items?.name?.slice(0, 4) + "..."}
                      </h3>
                      <time className="text-gray-300">
                        {new Date(
                          items.createdAt?.seconds * 1000
                        ).toLocaleDateString()}
                      </time>
                    </div>
                  </div>
                </td>
                <td>{items?.username}</td>
                <td title={items?.email}>{items?.email.slice(0, 8) + "..."}</td>
                <td>{renderStatus(items.status)}</td>
                <td>{renderRole(items.role)}</td>
                <td>
                  <div className="flex gap-3 text-gray-400">
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/user-update?id=${items.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDelete(items.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
