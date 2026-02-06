import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import {
    Box,
    Card,
    Paper,
    MobileStepper,
    Grid,
    Button,
    Typography,
} from "@mui/material";
import TextButtonComponet from '../Buttons/TextButton';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function SwipeableTextMobileStepper({ list = [], background, WelcomSvgIcon, onSignup = () => { } }) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = list?.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <Box>
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 50,
                    pl: 2,
                    bgcolor: 'background.default',
                }}
            >
                <Typography>{list[activeStep]?.name}</Typography>
            </Paper>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {list.map((item, index) => {
                    return (
                        <Card key={`top-course-${index}-list-item`} sx={{ width: 800, maxWidth: 800, minWidth: 370, borderRadius: 6, backgroundImage: `url(${background})`, paddingBottom: '1%', paddingTop: '1%' }}>
                            <Grid sx={{ justifyContent: "center", alignItems: "center", display: 'flex' }} container>
                                <Grid style={{ justifyContent: "center", alignItems: "center", display: 'flex' }} xs={12} item>
                                    <WelcomSvgIcon />
                                </Grid>
                                <Grid item>
                                    <TextButtonComponet
                                        onButtonClick={() => {
                                            onSignup(item)
                                        }}
                                        classStyle={"btn btn-enroll"}
                                        text="Join Winspert community now"
                                    />
                                </Grid>


                            </Grid>
                        </Card>
                    )
                })}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
        </Box>
    );
}

export default SwipeableTextMobileStepper;
