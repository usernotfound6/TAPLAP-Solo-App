import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { blue } from '@mui/material/colors';

function EditTopicForm(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const edittopic = useSelector((store) => store.edittopic);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  function handleTopicNameChange(event) {
    dispatch({
      type: 'EDIT_ONCHANGE',
      payload: {
        property: 'topic_name',
        value: event.target.value,
      },
    });
  }

  function handleTopicDescriptionChange(event) {
    dispatch({
      type: 'EDIT_ONCHANGE',
      payload: {
        property: 'topic_description',
        value: event.target.value,
      },
    });
  }

  // Function to open the confirmation dialog
  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  // Function to close the confirmation dialog
  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  // Function to submit the form and update the topic
  const handleSubmit = (event) => {
    event.preventDefault();

    // Open the confirmation dialog before updating the topic
    handleOpenConfirmation();
  };

  // Function to handle topic update after confirmation
  const handleConfirmUpdate = () => {
    // PUT REQUEST to /api/topics/:id
    axios
      .put(`/api/topics/${edittopic.id}`, edittopic)
      .then((response) => {
        // Clean up reducer data
        dispatch({ type: 'EDIT_CLEAR' });

        // Refresh will happen with useEffect on Home
        history.push('/mytopics'); // back to list
      })
      .catch((error) => {
        console.log('error on topic PUT: ', error);
      });

    // Close the confirmation dialog
    handleCloseConfirmation();
  };

  return (
    <>
      <Container
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Card
          elevation={24}
          sx={{
            backgroundColor: 'beige',
            borderRadius: 5,
            p: 4,
            textAlign: 'center',
            marginBottom: 4,
            marginTop: -9,
          }}
        >
          <CardContent
            sx={{
              backgroundColor: 'beige',
              padding: -30,
              marginTop: -6.5,
              marginBottom: -7.5,
              maxWidth: 330,
            }}
          >
            <h1>What changes do you wanna make?</h1>
          </CardContent>
        </Card>

        <Card
          elevation={20}
          sx={{
            display: 'flex',
            backgroundColor: 'beige',
            marginRight: 10,
            marginLeft: 10,
            marginBottom: 4,
            minHeight: 500,
            minWidth: 400,
            marginTop: 1,
            borderRadius: 4,
            p: 3,
            textAlign: 'center',
          }}
        >
          <div>
            <TextField
              label="Topic Title"
              variant="outlined"
              fullWidth
              value={edittopic.topic_name}
              onChange={handleTopicNameChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Can You Elaborate?"
              variant="outlined"
              fullWidth
              multiline
              rows={17}
              value={edittopic.topic_description}
              onChange={handleTopicDescriptionChange}
              sx={{ marginBottom: 2 }}
            />
          </div>
        </Card>
        <form onSubmit={handleSubmit}>
          <Button
            onClick={handleSubmit}
            elevation={24}
            sx={{
              borderRadius: 3,
              marginTop: 1,
              fontSize: '20px',
              padding: '12px 24px',
            }}
            type="submit"
            variant="contained"
            color="secondary"
          >
            Update
          </Button>
        </form>
      </Container>

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmation}
        onClose={handleCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Update</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to update this topic?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="secondary" variant='contained'>
            Cancel
          </Button>
          <Button onClick={handleConfirmUpdate} color="secondary" autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditTopicForm;