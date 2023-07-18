import React, { Fragment, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../Loader/Loader";
import { DataGrid } from "@mui/x-data-grid";
import {
  adminGetAllUsers,
  clearErrors,
  adminDeleteSingleUser,
  adminGetSingleUser,
} from "../../actions/userAction";
import { ADMIN_USER_DELETE_RESET } from "../../constants/userConstant";

const AllUsersList = ({ setShowUsers, setShowUpdateUser }) => {
  const { loading, error, users } = useSelector((state) => state.adminAllUsers);
  const {
    error: deleteError,
    message,
    isDeleted,
  } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const deleteUser = (id) => {
    dispatch(adminDeleteSingleUser(id));
  };

  const toggleEditUserScreen = (id) => {
    dispatch(adminGetSingleUser(id));
    setShowUpdateUser(true);
    setShowUsers(false);
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 150, flex: 1 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button onClick={() => toggleEditUserScreen(params.id)}>
              {/* <Link to={`/admin/product/${params.id}`} className="viewOrder"> */}
              <EditIcon></EditIcon>
              {/* </Link> */}
            </Button>
            <Button onClick={() => deleteUser(params.id)}>
              <DeleteIcon></DeleteIcon>
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.map((user) => {
      rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user?.role,
      });
    });

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    if (deleteError) {
      enqueueSnackbar(deleteError, { variant: "error" });
      dispatch(clearErrors());
    }

    if (isDeleted) {
      enqueueSnackbar(message, { variant: "success" });
      dispatch({ type: ADMIN_USER_DELETE_RESET });
    }
    dispatch(adminGetAllUsers());
  }, [dispatch, isDeleted, deleteError, enqueueSnackbar, error, message]);

  return (
    <Box sx={{ overflowX: "auto", width: "100%" }}>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Box>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            disableRowSelectionOnClick
            autoHeight
          ></DataGrid>
        </Box>
      )}
    </Box>
  );
};

export default AllUsersList;
