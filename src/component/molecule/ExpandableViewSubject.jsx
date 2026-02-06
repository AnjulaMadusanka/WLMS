import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Box,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
//   fontFamily: "Montserrat",
const ExpandableViewSubject = ({ data, onEdit, onDelete }) => {
  return (
    <Box sx={{ width: '100%', margin: 'auto', mt: 4 }}>
      {data.map((item, index) => (
        <Accordion key={index} sx={{ borderRadius: 2, mb: 1, boxShadow: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            sx={{
              bgcolor: '#f2f6f8',
              borderBottom: '1px solid #ddd',
              // padding: 2,
              borderRadius: '8px 8px 0 0',

            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Typography
                variant="p"
                sx={{ fontWeight: 700, color: '#333', textTransform: 'capitalize' ,  fontFamily: "Montserrat",}}
              >
                {item.name}
              </Typography>
              <Box>
                <IconButton
                  color="primary"
                  onClick={() => onEdit(item, 'main')}
                  aria-label={`Edit ${item.name}`}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => onDelete(item, 'main')}
                  aria-label={`Delete ${item.name}`}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              bgcolor: '#ffffff',
              padding: 2,
              borderRadius: '0 0 8px 8px',
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: 600, color: '#555' }}
            >
              Sub-subjects:
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              {item?.sub_subjects.map((sub, idx) => (
                <li key={idx} style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#666',
                      fontWeight: 500,
                      textTransform: 'capitalize',
                    }}
                  >
                    {sub.name}
                  </Typography>
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() =>
                        onEdit(sub)
                      }
                      aria-label={`Edit ${sub.name}`}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => onDelete(sub, 'main')}
                      aria-label={`Delete ${sub}`}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ExpandableViewSubject;
