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
import { QandACard } from './Cards';
import { is } from 'immutable';

const ExpandableViewQuestion = ({ data, onEdit = () => { }, onDelete, onView = () => { }, selectedQuestions = [], onCheckboxChange, isView = false, isEdit = false, isDelete = false, checked = false,subjectid }) => {


  const filteredData = subjectid
  ? data.filter(item => {
      if (item.id === subjectid) return true;
      return item.subSubjects && item.subSubjects.some(sub => sub.id === subjectid);
    })
  : data;



  return (
    <Box sx={{ width: '100%', margin: 'auto', mt: 4 }}>
      {filteredData.map((item, index) => (
        <Accordion key={index} sx={{ borderRadius: 2, mb: 2, boxShadow: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            sx={{
              bgcolor: '#f2f6f8',
              borderBottom: '1px solid #ddd',
              padding: 2,
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
                variant="h5"
                sx={{ fontWeight: 700, color: '#333', textTransform: 'capitalize' }}
              >
                {item.mainSubject}
              </Typography>
              {/* <Box>
                <IconButton
                  color="primary"
                  onClick={() => onEdit(item, 'main')}
                  aria-label={`Edit ${item.mainSubject}`}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => onDelete(item, 'main')}
                  aria-label={`Delete ${item.mainSubject}`}
                >
                  <DeleteIcon />
                </IconButton>
              </Box> */}
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              bgcolor: '#ffffff',
              padding: 2,
              borderRadius: '0 0 8px 8px',
            }}
          >
            {item.questions && (
              //   <>
              //     <Typography
              //       variant="h6"
              //       sx={{ mb: 2, fontWeight: 600, color: '#555' }}
              //     >
              //       Questions:
              //     </Typography>
              //     <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
              //       {item.questions.map((q, idx) => (
              //         <li key={idx} style={{ marginBottom: '8px' }}>
              //           <Typography variant="body1" sx={{ color: '#666' }}>
              //             {q}
              //           </Typography>
              //         </li>
              //       ))}
              //     </ul>
              //   </>

              item.questions.map((q, index) => (
                <QandACard
                  checked={checked}
                  isView={isView}
                  isDelete={isDelete}
                  isEdit={isEdit}
                  isChecked={selectedQuestions.includes(q.id)}
                  onCheckboxChange={onCheckboxChange}
                  onclick={() => onView(q)} index={index} item={q}
                  onPressEdit={() => onEdit(q)}
                />

              ))
            )}
            <Divider sx={{ mb: 2 }} />
            {item.subSubjects.map((sub, subIdx) => (
              <Accordion
                key={subIdx}
                sx={{
                  mb: 2,
                  bgcolor: '#f9f9f9',
                  boxShadow: 1,
                  borderRadius: 2,
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`sub-panel${subIdx}-content`}
                  id={`sub-panel${subIdx}-header`}
                  sx={{
                    padding: 1,
                    bgcolor: '#eef1f3',
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
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: '#444',
                        textTransform: 'capitalize',
                      }}
                    >
                      {sub.name}
                    </Typography>
                    {/* <Box>
                      <IconButton
                        color="primary"
                        onClick={() =>
                          onEdit(
                            { mainSubject: item.mainSubject, subSubject: sub.name },
                            'sub'
                          )
                        }
                        aria-label={`Edit ${sub.name}`}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() =>
                          onDelete(
                            { mainSubject: item.mainSubject, subSubject: sub.name },
                            'sub'
                          )
                        }
                        aria-label={`Delete ${sub.name}`}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box> */}
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 2 }}>
                  {sub.questions && (
                    // <>
                    //   <Typography
                    //     variant="h6"
                    //     sx={{ mb: 2, fontWeight: 600, color: '#555' }}
                    //   >
                    //     Questions:
                    //   </Typography>
                    //   <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    //     {sub.questions.map((q, qIdx) => (
                    //       <li key={qIdx} style={{ marginBottom: '8px' }}>
                    //         <Typography variant="body1" sx={{ color: '#666' }}>
                    //           {q}
                    //         </Typography>
                    //       </li>
                    //     ))}
                    //   </ul>
                    // </>

                    sub.questions.map((q, index) => (
                      <QandACard isView={isView} isDelete={isDelete} isEdit={isEdit} checked={checked}
                        isChecked={selectedQuestions.includes(q.id)}
                        onCheckboxChange={onCheckboxChange}
                        onPressEdit={()=>onEdit(q)}
                        onclick={() => onView(q)}
                        index={index} item={q} />
                    ))
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ExpandableViewQuestion;
