import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import InputLabel from "@mui/material/InputLabel";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, ...userDetails }),
    });

    const result = await res.json();
    if (!result.error) {
      toast.success(`User updated successfully!`);
      // navigate("/employees");

      setUserDetails({
        first_name: "",
        last_name: "",
        email: "",
      });
      navigate("/users");
    } else {
      toast.error(result.error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://reqres.in/api/users/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        setUserDetails({
          first_name: result.data.first_name,
          last_name: result.data.last_name,
          email: result.data.email,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [id]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {loading ? (
        <Spinner splash="Loading..." />
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Edit User
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* <Grid container spacing={2}> */}
            <Grid item xs={12} padding={2}>
              <InputLabel id="firstname"> First Name:</InputLabel>
              <TextField
                id="first_name"
                fullWidth
                name="first_name"
                value={userDetails.first_name}
                onChange={handleInputChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} padding={2}>
              <InputLabel id="lastname"> Last Name:</InputLabel>
              <TextField
                id="last_name"
                fullWidth
                name="last_name"
                value={userDetails.last_name}
                onChange={handleInputChange}
                variant="outlined"
                required
              />
            </Grid>

            <Grid item xs={12} padding={2}>
              <InputLabel id="emaillabel">Email:</InputLabel>
              <TextField
                fullWidth
                id="email"
                name="email"
                type="email"
                value={userDetails.email}
                onChange={handleInputChange}
                variant="outlined"
                required
              />
            </Grid>

            <Box sx={{ mt: 3 }} padding={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Update
              </Button>
            </Box>
          </form>
        </>
      )}
    </Container>
  );
};

export default EditUser;
