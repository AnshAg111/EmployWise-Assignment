import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  CircularProgress,
} from "@mui/material";
import ToastContext from "../context/ToastContext";

const UserList = () => {
  const { toast } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://reqres.in/api/users?page=${page}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error && result.data) {
          setUsers(result.data);
          setTotalPages(result.total_pages);
          setTotalUsers(result.total);
        } else {
          console.error(result.error || "Unexpected API response");
          setUsers([]);
        }
      } catch (err) {
        console.error(err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [page]);

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to remove this user?")) {
      try {
        const res = await fetch(`https://reqres.in/api/users/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // setShowModal(false);
        // const result = await res.json();
        if (res.ok) {
          setUsers(users.filter((user) => user.id !== id));
          toast.success("Removed User");
        } else {
          toast.error("Failed to remove user. Please try again.");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const filtered = users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setUsers(filtered);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h4" gutterBottom>
          User List
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={() => window.location.reload()}
          sx={{ mb: 2 }}
        >
          Reload
        </Button>
        <hr />
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {totalUsers === 0 ? (
            <Typography variant="h6" align="center">
              No users yet.
            </Typography>
          ) : (
            <Box>
              <Box
                component="form"
                onSubmit={handleSearchSubmit}
                sx={{ display: "flex", mb: 3 }}
              >
                <TextField
                  id="searchInput"
                  name="searchInput"
                  label="Search Users"
                  variant="outlined"
                  fullWidth
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  sx={{ mr: 2 }}
                />
                <Button variant="contained" color="primary" type="submit">
                  Search
                </Button>
              </Box>

              <Typography variant="body1" gutterBottom>
                Total users: <strong>{totalUsers}</strong>
              </Typography>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Avatar</TableCell>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow
                        key={user._id}
                        // hover
                        // onClick={() => {
                        //   setModalData(user);
                        //   setShowModal(true);
                        // }}
                        // sx={{ cursor: "pointer" }}
                      >
                        <TableCell>
                          <img
                            src={user.avatar}
                            alt={`${user.first_name}'s avatar`}
                          />
                        </TableCell>
                        <TableCell>{user.first_name}</TableCell>
                        <TableCell>{user.last_name}</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              mt: 2,
                              display: "flex",
                              // justifyContent:
                              justifyContent: "space-around",
                            }}
                          >
                            <Button
                              component={Link}
                              to={`/users/edit/${user?._id}`}
                              variant="contained"
                              color="info"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => deleteUser(user?._id)}
                            >
                              Delete
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div
                className="pagination"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "20px",
                  padding: "10px",
                }}
              >
                <Button variant="contained" color="primary" disabled={page === 1} onClick={() => setPage(page - 1)} sx={{padding:"8px 16px"}}>
                  Previous
                </Button>
                <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Page {page} of {totalPages}
                </span>

                <Button
                  variant="contained" color="primary"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  sx={{padding:"8px 16px"}}
                >
                  Next
                </Button>
              </div>
            </Box>
          )}
        </>
      )}

      {/* {showModal && (
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          aria-labelledby="user-modal-title"
          aria-describedby="user-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              id="user-modal-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              {modalData?.first_name} {modalData?.last_name}
            </Typography>
            <Typography>
              <strong>Email:</strong> {modalData?.email}
            </Typography>
            <Typography>
              <strong>Mobile No.:</strong> {modalData?.phone}
            </Typography>
            <Typography>
              <strong>Designation:</strong> {modalData?.designation}
            </Typography>
            <Typography>
              <strong>Gender:</strong> {modalData?.gender}
            </Typography>
            <Typography>
              <strong>Course:</strong>{" "}
              {Array.isArray(modalData?.course)
                ? modalData?.course.join(", ")
                : modalData?.course}
            </Typography>
            <Typography>
              <strong>Date Created:</strong>{" "}
              {format(new Date(modalData?.createDate), "PPP")}
            </Typography>
            <Box
              sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
            >
              <Button
                variant="outlined"
                color="warning"
                onClick={() => setShowModal(false)}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
      )} */}
    </Container>
  );
};

export default UserList;
