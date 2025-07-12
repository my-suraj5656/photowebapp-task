import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";

const eventOptions = [
  "Maternity Shoot",
  "Newborn Shoot",
  "Birthday Party",
  "Wedding",
  "Pre-Wedding",
  "Couple Shoot",
  "Family Portrait",
  "Other",
];

const InquiryModal = ({ photographerName, open, onClose }) => {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    message: "",
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Inquiry sent to ${photographerName}!\nDetails: ${JSON.stringify(
        formData,
        null,
        2
      )}`
    );
    onClose();
    setFormData({
      name: "",
      email: "",
      phone: "",
      eventType: "",
      eventDate: "",
      message: "",
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 600,
          color: theme.palette.primary.main,
          fontSize: "1.25rem",
        }}
      >
        Send Inquiry to {photographerName}
      </DialogTitle>

      <Divider sx={{ mb: 2 }} />

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Full Name"
                value={formData.name}
                onChange={handleChange("name")}
                fullWidth
                required
              />
              <TextField
                label="Phone Number"
                value={formData.phone}
                onChange={handleChange("phone")}
                fullWidth
                required
              />
            </Stack>

            <TextField
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              fullWidth
              required
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Event Type"
                select
                value={formData.eventType}
                onChange={handleChange("eventType")}
                fullWidth
                required
              >
                {eventOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Event Date"
                type="date"
                value={formData.eventDate}
                onChange={handleChange("eventDate")}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Stack>

            <TextField
              label="Additional Message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange("message")}
              fullWidth
              placeholder="Mention location, budget, preferences..."
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} color="inherit" variant="outlined">
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{
              background: "linear-gradient(to right, #6366f1, #14b8a6)",
              color: "#fff",
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              ":hover": {
                background: "linear-gradient(to right, #4f46e5, #0d9488)",
              },
            }}
          >
            Send Inquiry
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default InquiryModal;
