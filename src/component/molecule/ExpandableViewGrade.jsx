import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Box,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit'; // Edit icon
import DeleteIcon from '@mui/icons-material/Delete';
import { TextIconButtonComponent, TextInputComponent } from '../atom';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../../core/modules/Actions';
import { useEffect, useState } from 'react';
import { GuestRepository, QuizeRepository } from '../../core/repository';

const ExpandableViewGrade = ({ data, quiz }) => {
  const [newData, setNewData] = useState([]);
  const dispatch = useDispatch();

  const gradesList = useSelector((state) => state.quizes.get('gradeList'));
  const addGrades = useSelector((state) => state.quizes.get('addGrades'));
  const updateGrades = useSelector((state) => state.quizes.get('updateGrades'));
  useEffect(() => {
    const fetchGradesForCategories = async () => {
      const updatedData = await Promise.all(
        data.map(async (category) => {
          const fetchedGrades = await QuizeRepository.fetchGrades({quiz_id: quiz.id, category_id: category.category.id});
          console.log(fetchedGrades, 'fetchedGrades')
          return { ...category, grades: fetchedGrades.data || [] };
        })
      );
      setNewData(updatedData); // Set new data with grades
      console.log(updatedData, 'updatedData')
    };

    fetchGradesForCategories();
  }, [data, quiz, dispatch,addGrades,updateGrades]);



  return (
    <Box sx={{ width: '100%', margin: 'auto', mt: 4 }}>
      {newData.map((category, index) => (
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
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
              {category.category.name}
            </Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ bgcolor: '#fff', padding: 2 }}>
            <GradeList quiz={quiz} categoryId={category.category.id} grades={category.grades} />
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ mt: 2 }}>
              <AddGradeForm quiz={quiz} gradedata={category.category} />
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

const GradeList = ({ quiz, categoryId, grades }) => {
  const [editGrade, setEditGrade] = useState(null); // Track the grade being edited
  const dispatch = useDispatch();

  const handleEditGrade = (grade) => {
    setEditGrade(grade); // Set grade data for editing
  };

  const handleDeleteGrade = async (gradeId) => {
    try {
      await dispatch(Actions.quizes.deleteGrade({ grade_id: gradeId }));
    } catch (err) {
      console.error('Error deleting grade:', err);
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#555' }}>
        Grades:
      </Typography>
      <ul style={{ paddingLeft: '20px', margin: 0 }}>
        {grades.map((grade) => (
          <li
            key={grade.id}
            style={{
              marginBottom: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: '#f9f9f9',
                padding: '8px 12px',
                borderRadius: 2,
                minWidth: 100,
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #ddd',
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#1976d2' }}>
                {grade.marks_from} - {grade.marks_to}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, color: '#555' }}>
                {grade.grade}
              </Typography>
            </Box>
            <IconButton color="primary" onClick={() => handleEditGrade(grade)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </li>
        ))}
      </ul>

      {editGrade && (
        <EditGradeModal
          grade={editGrade}
          open={!!editGrade}
          onClose={() => setEditGrade(null)} // Close modal on cancel
        />
      )}
    </>
  );
};

const EditGradeModal = ({ grade, open, onClose }) => {
  const [from, setFrom] = useState(grade.marks_from);
  const [to, setTo] = useState(grade.marks_to);
  const [newGrade, setNewGrade] = useState(grade.grade);
  const dispatch = useDispatch();

  const handleSave = async () => {
    if (from && to && newGrade) {
      const payload = {
        grade_id: grade.id,
        quiz_id: grade.quiz_id,
        category_id: grade.category_id,
        marks_from: parseInt(from),
        marks_to: parseInt(to),
        grade: newGrade,
      };

      try {
        await dispatch(Actions.quizes.updateGrade(payload));
        onClose(); // Close the modal after saving
      } catch (err) {
        console.error('Error updating grade:', err);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Grade</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'end' }}>
          <TextInputComponent
            label="From"
            placeholder="Enter Range"
            name="From"
            value={from}
            onchange={(e) => setFrom(e.target.value)}
          />
          <TextInputComponent
            label="To"
            placeholder="Enter Range"
            name="To"
            value={to}
            onchange={(e) => setTo(e.target.value)}
          />
          <TextInputComponent
            label="Grade"
            placeholder="Enter Grade (e.g., A)"
            name="grade"
            value={newGrade}
            onchange={(e) => setNewGrade(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <TextIconButtonComponent btnText="Save" onclick={handleSave} />
        <TextIconButtonComponent btnText="Cancel" onclick={onClose} />
      </DialogActions>
    </Dialog>
  );
};

const AddGradeForm = ({ gradedata, quiz }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [grade, setGrade] = useState('');
  const dispatch = useDispatch();

  const handleAdd = async () => {
    if (from && to && grade) {
      const payload = {
        quiz_id: quiz.id,
        category_id: gradedata.id,
        marks_from: from,
        marks_to: to,
        grade,
      };

      try {
        await dispatch(Actions.quizes.addGrades(payload));
        setFrom('');
        setTo('');
        setGrade('');
      } catch (err) {
        console.error('Error adding grade:', err);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'end' }}>
      <TextInputComponent
        label="From"
        placeholder="Enter Range "
        name="From"
        value={from}
        onchange={(e) => setFrom(e.target.value)}
      />
      <TextInputComponent
        label="To"
        placeholder="Enter Range "
        name="To"
        value={to}
        onchange={(e) => setTo(e.target.value)}
      />
      <TextInputComponent
        label="Grade"
        placeholder="Enter Grade (e.g., A)"
        name="grade"
        value={grade}
        onchange={(e) => setGrade(e.target.value)}
      />
      <Box padding="10px">
        <TextIconButtonComponent btnText="Add" onclick={handleAdd} />
      </Box>
    </Box>
  );
};

export default ExpandableViewGrade;
