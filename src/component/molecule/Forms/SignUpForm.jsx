import React, { useState, useEffect, useRef } from "react"
import { Box, Typography, DialogActions, DialogContent, Grid } from "@mui/material"
import TextInputComponent from "../../atom/Inputs/TextInput"
import TextButtonComponet from "../../atom/Buttons/TextButton"
import { MINIMUM_PASSWORD_CHARACTERS, USER_ROLE, EMAIL_REGEX, getText, getDeviceId, PASSWORD_REGEX, onGetCurrencySymble, COURSE_TYPE_LIST, setText } from "../../../core/Constant";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Actions } from "../../../core/modules/Actions";
import CardValidator from 'card-validator';
import _ from "lodash";
import SignUpFormOne from "./SignUpFormOne";
import SignUpFormTwo from "./SignUpFormTwo";
import SecondStep from "../../../assets/Images/activeSlider.png";
import SecondOne from "../../../assets/Images/Signupgroup.png";
import DropDownComponent from "../../atom/Inputs/DropDown";
import {
    PaymentElement,
    Elements,
    useStripe,
    useElements,
    CardElement
} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { stripeKey } from "../../../core/repository/Repository";

const stripePromise = loadStripe(stripeKey);

const SignUpForm = ({ onClose = () => { }, paymentsheet = true, item = {}, stepIndex = 0, isRegistered = false, currencyId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formOneData, setFormOneData] = useState({});
    const [payment, setPayment] = useState(false);
    const formOneRef = useRef();
    const formTwoRef = useRef();
    const [step, setStep] = useState(0);
    const [course, setCourse] = useState({});
    const [isFree, setIsFree] = useState(0);
    const [isLoading, setLoading] = useState(false);

    const [courseType, setCourseType] = useState(COURSE_TYPE_LIST[0]?.id);
    const [courseTypeList, setCourseTypeList] = useState(COURSE_TYPE_LIST);
    const [price, setPrice] = useState(0)

    const [type, setType] = useState(1);

    const loadingAction = useSelector(state => state.common.get('loadingAction'));
    const currency = localStorage.getItem('GlobalCurrency')
    const [symbol, setSymbol] = useState();
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const [isPromo, setIsPromo] = useState(false);

    const [isShow, setIsShow] = useState(0);
    const show = useSelector(state => state.common.get('show'));

    useEffect(() => {
        setIsShow(show == 1);
    }, [show]);


    useEffect(() => {
        const { action, loading } = loadingAction;
        const type = action.type;
        if (type == "SIGN_UP" || type == 'ENROLL_NEW_COURSE_BY_REGISTERED_USER') {
            setLoading(loading)
        }
    }, [loadingAction]);

    useEffect(() => {
        setStep(stepIndex);
    }, [stepIndex, isRegistered]);

    useEffect(()=>{},[item]);

    useEffect(() => {
        setCourse(item);
        const cType = item?.course_type;
        setType(cType);
        setIsFree(item?.is_free);

        if (item.course_currencies) {
            // console.log(currency,"item.course_currencies",item.course_currencies)
            const selectedCurrency = item.course_currencies.find(newcurrency => newcurrency?.currency_id == currency);

            if (selectedCurrency) {
                const currencySymbol = onGetCurrencySymble(_.get(selectedCurrency, "currency.currency"));
                const price = _.get(selectedCurrency, "price", "");
                setPrice(price)
                setSymbol(currencySymbol);
                setSelectedCurrency(selectedCurrency)
                // return `${currencySymbol}${price}`;
            } else {
                // selected type not available
                const selectedCurrency = item.course_currencies[0]
                const currencySymbol = onGetCurrencySymble(_.get(selectedCurrency, "currency.currency"));
                const price = _.get(selectedCurrency, "price", "");
                setPrice(price)
                setSymbol(currencySymbol);
                setSelectedCurrency(selectedCurrency)
            }
        }
    },[currency,item]);
    


    const onNext = () => {
        setPayment(true);
        formOneRef.current.onPress()
    }

    const onCloseForm = () => {
        setStep(0)
        onClose()
    }




    const onSignUp = () => {
        formTwoRef.current.onPress(price, courseType)
    }

    const onCourseTypeChange = (e) => {
        const value = getText(e);
        setCourseType(value);
        const data = _.find(_.get(course, 'course_currencies', []), i => {
            return i?.currency_id == currency
        })

        // course_currencies 
        // currency
        // price
        // other_price

        if (value == 1) {
            setPrice(_.get(data, 'price', '0.00'))
        } else {
            setPrice(_.get(data, 'other_price', '0.00'))
        }

    }

    const onUpdateValue = (value, type) => {
        if (type == 0) {
            onCourseTypeChange(setText(value));
            setIsPromo(false)
        }
        if (type == 1) {
            setIsPromo(true)
            // setPrice(value)
        }
    }

    const onFreeCource = async (data) => {
        const device_id = await getDeviceId();
        dispatch(Actions.auth.signUp({ ...data, device_id, currency_id: currency }));
    }

    return (
        <>
            <form >
                <DialogContent>
                    <Box>
                        <Grid className='signup-price-container' container>
                            <Grid xs={6} item>
                                <Box>
                                    <div className="signup-price-subtext">Selected course</div>
                                    <div className="signup-price-text">{_.get(course, 'name', '')}</div>
                                </Box>
                            </Grid>
                          {isShow?  <Grid xs={6} item>
                                {type == 2 ? <div >
                                    <DropDownComponent
                                        placeholder="Please add the quiz"
                                        onchange={onCourseTypeChange}
                                        list={courseTypeList}
                                        initialValue=""
                                        selectedValue={courseType}
                                        outerStyle={{ padding: 10, paddingRight: 0, paddingLeft: 0 }}
                                        dropdownLabel="Select Course type" />
                                </div> : null}
                                <Box sx={{
                                    display: 'flex', flexDirection: 'row',
                                    justifyContent: type == 2 ? 'flex-start' : 'flex-end'
                                }}>
                                    <p style={{ color: '#4a6375' }} className="signup-price-title">Price</p>
                                    <p style={{ color: '#8080f1', fontWeight: 800, textDecoration: isPromo ? "line-through" : 'none' }} className="signup-price-title"><span style={{ whiteSpace: 'pre' }}>  </span>{symbol + price}</p>
                                </Box>
                            </Grid>: null}
                        </Grid>

                        <Box>
                        {isShow?  <Box sx={{ width: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
                                <Box
                                    component="img"
                                    sx={{
                                        height: 0.6,
                                        width: 0.6,
                                        alignSelf: 'center',
                                        display: 'flex',
                                    }}
                                    alt="The house from the offer."
                                    src={step == 0 ? SecondOne : SecondStep}
                                />

                            </Box>:null}
                            <>
                                {step == 0 && !isRegistered ?
                                    <SignUpFormOne
                                        courseType={courseType}
                                        isFree={isFree || !isShow}
                                        selectedCurrency={selectedCurrency}
                                        course_id={_.get(course, 'id', '')}
                                        onPassValue={(data) => {
                                          
                                            if (isFree || !isShow) {
                                                onFreeCource(data)
                                            } else {
                                                setFormOneData({ ...data });
                                                setStep(1)
                                            }
                                        }}
                                        ref={formOneRef} /> :
                                        <Elements stripe={stripePromise}>
                                    <SignUpFormTwo
                                        onUpdateValue={onUpdateValue}
                                        item={formOneData}
                                        course_id={_.get(course, 'id', '')}
                                        onClose={onCloseForm}
                                        isRegistered={isRegistered}
                                        courseType={courseType}
                                        symbol={symbol}
                                        ref={formTwoRef} />
                                        </Elements>
                                }
                               
                            </>

                        </Box>

                    </Box>
                </DialogContent>
                <DialogActions sx={{ padding: 4 }}>
                    {step == 0 && !isRegistered ?
                        <Box sx={{ display: "flex", gap: 5, width: 1, justifyContent: 'center' }}>
                            <TextButtonComponet text={"Cancel"} classStyle="btn btn-secondary" width={120} onButtonClick={() => {
                                onCloseForm()
                            }} />
                            <TextButtonComponet text={isFree || !isShow ? "Sign up" : "Next"} onButtonClick={onNext} width={120} />
                        </Box> :
                        <Box sx={{ display: "flex", gap: 5, width: 1, justifyContent: 'center' }}>
                            <TextButtonComponet text={"Cancel"} classStyle="btn btn-secondary" width={120} onButtonClick={() => {
                                onCloseForm()
                            }} />
                            <TextButtonComponet isDisabled={isLoading} text={"Proceed"} width={120} onButtonClick={onSignUp} />
                        </Box>
                    }
                </DialogActions>
            </form>

        </>
    )
}

export default SignUpForm;